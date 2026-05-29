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
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      include: [
        'src/data/**/*.ts',
        'src/utils/**/*.ts',
        'src/submitSchemas.ts',
        'src/components/SubmitDialog.tsx',
        'src/components/ImageField.tsx',
        'src/components/cards/**/*.tsx',
      ],
      exclude: ['**/*.test.*', '**/*.d.ts'],
      // Thresholds intentionally omitted here — they're enabled in the
      // final task after all new tests land. This lets each test-adding
      // commit pass CI on its own.
    },
  },
})
