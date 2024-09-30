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
        theme: "var(--fo-font-family)",
        default: "Onest Variable, sans-serif;",
      },
      colors: {
        border: "hsl(var(--border) / <alpha-value>)",
        background: "hsl(var(--background) / <alpha-value>)",
        foreground: "hsl(var(--foreground) / <alpha-value>)",

        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted) / <alpha-value>)",
          foreground: "hsl(var(--muted-foreground) / <alpha-value>)",
        },
        accent: "hsl(var(--fo-a) / <alpha-value>)",

        popover: {
          DEFAULT: "hsl(var(--popover) / <alpha-value>)",
          foreground: "hsl(var(--popover-foreground) / <alpha-value>)",
        },
        card: {
          DEFAULT: "hsl(var(--card) / <alpha-value>)",
          foreground: "hsl(var(--card-foreground) / <alpha-value>)",
        },
        native: {
          DEFAULT: "hsl(var(--fo-native) / <alpha-value>)",
          active: "hsl(var(--fo-native-active) / <alpha-value>)",
        },

        theme: {
          // https://uicolors.app/create
          accent: {
            DEFAULT: "hsl(var(--fo-a) / <alpha-value>)",
            50: "#fef4ee",
            100: "#fce7d8",
            200: "#f8ccb0",
            300: "#f4a77d",
            400: "#ee7949",
            500: "#ea5725",
            600: "#db3e1b",
            700: "#b62d18",
            800: "#91261b",
            900: "#752219",
            950: "#3f0e0b",
          },

          vibrancyFg: "hsl(var(--fo-vibrancy-foreground) / <alpha-value>)",
          vibrancyBg: "var(--fo-vibrancy-background)",

          item: {
            active: "var(--fo-item-active)",
            hover: "var(--fo-item-hover)",
          },

          inactive: "hsl(var(--fo-inactive) / <alpha-value>)",
          disabled: "hsl(var(--fo-disabled) / <alpha-value>)",

          foreground: "hsl(var(--fo-text-primary) / <alpha-value>)",
          background: "var(--fo-background)",

          "foreground-hover": "hsl(var(--fo-text-primary-hover) / <alpha-value>)",

          modal: {
            background: "var(--fo-modal-background)",
            "background-opaque": "var(--fo-modal-background-opaque)",
          },
          button: {
            hover: "var(--fo-button-hover)",
          },
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },

      typography: (theme) => ({
        zinc: {
          css: {
            "--tw-prose-body": theme("colors.zinc.500"),
            "--tw-prose-quotes": theme("colors.zinc.500"),
          },
        },
      }),
    },
  },
  plugins: [],
}

