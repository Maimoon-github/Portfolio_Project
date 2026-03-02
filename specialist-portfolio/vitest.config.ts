import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    // Enable global test APIs (describe, it, expect) without importing
    globals: true,
    
    // Simulate browser environment for React components
    environment: 'jsdom',
    
    // Global setup file runs before each test suite
    setupFiles: ['./src/test/setup.ts'],
    
    // Coverage configuration with v8 provider
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      reportsDirectory: './coverage',
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/**/*.test.{ts,tsx}',
        'src/**/*.d.ts',
        'src/test/**/*',
        'src/main.tsx',
        'src/vite-env.d.ts',
      ],
      // Optional: Set coverage thresholds
      thresholds: {
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80,
        },
      },
    },
    
    // Automatically clear mocks between tests
    clearMocks: true,
    
    // Include test files pattern
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    
    // Exclude files from testing
    exclude: ['node_modules', 'dist', '.idea', '.git', '.cache'],
    
    // Path aliases from tsconfig
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  resolve: {
    // Ensure aliases work in both Vite and Vitest
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});