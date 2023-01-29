import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    deps: {
      fallbackCJS: true,
    },
    globals: true,
    environment: 'jsdom',
    setupFiles: ['vitest-localstorage-mock', 'vitest-setup.js'],
    mockReset: false,
    exclude: ['**/node_modules/**', './src/main/test/cypress/**', './src/data/test/**'],
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@pages': path.resolve(__dirname, './src/presentation/pages'),
    },
  },
})
