import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitest.dev/config/
export default defineConfig({
  // Plugins – needed for React component testing
  plugins: [react()],

  // Path resolution (aliases) for both Vite and Vitest
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  test: {
    // Enable global test APIs (describe, it, expect) without importing
    globals: true,

    // Simulate browser environment for React components
    environment: 'jsdom',

    // Global setup file runs before each test suite
    setupFiles: ['./src/test/setup.ts'],

    // Automatically clear mocks between tests
    clearMocks: true,

    // Test file patterns
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    exclude: ['node_modules', 'dist', '.idea', '.git', '.cache'],

    // Path aliases for tests (redundant if defined in resolve, but kept for clarity)
    alias: {
      '@': path.resolve(__dirname, './src'),
    },

    // Coverage configuration
    coverage: {
      provider: 'v8',                      // Use v8 for coverage collection
      reporter: ['text', 'json', 'html', 'lcov'], // Output formats
      reportsDirectory: './coverage',        // Output directory
      include: ['src/**/*.{ts,tsx}'],       // Files to include in coverage
      exclude: [
        'src/**/*.test.{ts,tsx}',            // Exclude test files themselves
        'src/**/*.d.ts',                      // TypeScript declaration files
        'src/test/**/*',                      // Test helpers and setup
        'src/main.tsx',                       // Entry point
        'src/vite-env.d.ts',                   // Vite environment types
      ],
      // Optional coverage thresholds
      thresholds: {
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80,
        },
      },
    },
  },
});