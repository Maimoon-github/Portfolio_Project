// eslint.config.js – ESLint flat configuration for React + TypeScript + Vite
// This configuration uses the new ESLint 9+ flat config format.
// It extends recommended rule sets and adds React Hooks and React Refresh support.
// No custom rules are added to preserve existing behavior.

import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  // Ignore the entire dist folder (build output)
  globalIgnores(['dist']),

  // Main configuration for TypeScript and TSX files
  {
    files: ['**/*.{ts,tsx}'],

    // Extend recommended configurations
    extends: [
      js.configs.recommended,                     // ESLint core recommended rules
      tseslint.configs.recommended,                // TypeScript recommended rules (basic)
      reactHooks.configs.flat.recommended,         // React Hooks rules
      reactRefresh.configs.vite,                    // React Refresh rules for Vite
    ],

    languageOptions: {
      ecmaVersion: 2020,                            // Support modern ECMAScript features
      globals: globals.browser,                      // Browser global variables
    },
  },
]);