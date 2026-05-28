import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import yaml from '@modyfi/vite-plugin-yaml'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), yaml()],
  server: {
    port: 5173,
    strictPort: true,
    watch: {
      usePolling: true,
      interval: 300,
    },
  },
  test: {
    environment: 'node',
  },
})
