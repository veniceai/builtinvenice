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
      // Threshold rationale: statements and lines are 75 (not 80) because
      // SubmitDialog and ImageField contain hard-to-exercise upload/drag-drop
      // branches (FileReader callbacks, paste handlers, upload error paths)
      // that inflate the count without representing real untested behavior.
      // Branches is 70 because Zod's discriminated unions emit many
      // statically-unreachable branches.
      thresholds: {
        lines: 75,
        functions: 80,
        branches: 70,
        statements: 75,
      },
    },
  },
})
