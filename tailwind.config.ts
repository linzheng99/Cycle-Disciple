import path from "node:path"

import { getIconCollections, iconsPlugin } from '@egoist/tailwindcss-icons';
import { cleanupSVG, importDirectorySync, isEmptyColor, parseColors, runSVGO } from "@iconify/tools"
import { compareColors, stringToColor } from "@iconify/utils/lib/colors"

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class", '[data-theme="dark"]'],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  	extend: {
  		fontFamily: {
  			theme: 'var(--fo-font-family)',
  			default: 'Onest Variable, sans-serif;'
  		},
  		colors: {
  			border: 'hsl(var(--border))',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			native: {
  				DEFAULT: 'hsl(var(--fo-native) / <alpha-value>)',
  				active: 'hsl(var(--fo-native-active) / <alpha-value>)'
  			},
  			theme: {
  				accent: {
  					'50': '#fef4ee',
  					'100': '#fce7d8',
  					'200': '#f8ccb0',
  					'300': '#f4a77d',
  					'400': '#ee7949',
  					'500': '#ea5725',
  					'600': '#db3e1b',
  					'700': '#b62d18',
  					'800': '#91261b',
  					'900': '#752219',
  					'950': '#3f0e0b',
  					DEFAULT: 'hsl(var(--fo-a) / <alpha-value>)'
  				},
  				vibrancyFg: 'hsl(var(--fo-vibrancy-foreground) / <alpha-value>)',
  				vibrancyBg: 'var(--fo-vibrancy-background)',
  				item: {
  					active: 'var(--fo-item-active)',
  					hover: 'var(--fo-item-hover)'
  				},
  				inactive: 'hsl(var(--fo-inactive) / <alpha-value>)',
  				disabled: 'hsl(var(--fo-disabled) / <alpha-value>)',
  				foreground: 'hsl(var(--fo-text-primary) / <alpha-value>)',
  				background: 'var(--fo-background)',
  				'foreground-hover': 'hsl(var(--fo-text-primary-hover) / <alpha-value>)',
  				modal: {
  					background: 'var(--fo-modal-background)',
  					'background-opaque': 'var(--fo-modal-background-opaque)'
  				},
  				button: {
  					hover: 'var(--fo-button-hover)'
  				}
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		typography: '(theme) => ({\n        zinc: {\n          css: {\n            "--tw-prose-body": theme("colors.zinc.500"),\n            "--tw-prose-quotes": theme("colors.zinc.500"),\n          },\n        },\n      })'
  	}
  },
  plugins: [
    iconsPlugin({

      collections: {
        ...getIconCollections(["mingcute", "simple-icons", "logos"]),
        local: getCollections(path.resolve(__dirname, "./src/assets/icons/local")),
      }
    }),
      require("tailwindcss-animate")
],
}

function getCollections(dir: string) {
  // Import icons
  const iconSet = importDirectorySync(dir, {
    includeSubDirs: false,
  })

  // Validate, clean up, fix palette and optimism
  iconSet.forEachSync((name, type) => {
    if (type !== "icon") {
      return
    }

    const svg = iconSet.toSVG(name)
    if (!svg) {
      // Invalid icon
      iconSet.remove(name)
      return
    }

    // Clean up and optimize icons
    try {
      // Clean up icon code
      cleanupSVG(svg)

      // Change color to `currentColor`
      // Skip this step if icon has hardcoded palette
      const blackColor = stringToColor("black")!
      const whiteColor = stringToColor("white")!
      parseColors(svg, {
        defaultColor: "currentColor",
        callback: (attr, colorStr, color) => {
          if (!color) {
            // Color cannot be parsed!
            throw new Error(`Invalid color: "${colorStr}" in attribute ${attr}`)
          }

          if (isEmptyColor(color)) {
            // Color is empty: 'none' or 'transparent'. Return as is
            return color
          }

          // Change black to 'currentColor'
          if (compareColors(color, blackColor)) {
            return "currentColor"
          }

          // Remove shapes with white color
          if (compareColors(color, whiteColor)) {
            return "remove"
          }

          // NOTE: MGC icons has default color of #10161F
          if (compareColors(color, stringToColor("#10161F")!)) {
            return "currentColor"
          }

          // Icon is not monotone
          return color
        },
      })

      runSVGO(svg)
    } catch (err) {
      // Invalid icon
      console.error(`Error parsing ${name}:`, err)
      iconSet.remove(name)
      return
    }

    // Update icon
    iconSet.fromSVG(name, svg)
  })

  // Export
  return iconSet.export()
}

