import path, { resolve } from 'node:path'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '~': resolve(__dirname, 'src'),
      "@": path.resolve(__dirname, "./src"),
    }
  },
  plugins: [react()],
})
