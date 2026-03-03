// .eslintrc.cjs
// ESLint configuration for React + TypeScript + Vite project.
// This file uses CommonJS syntax; for flat config (ES modules), see the ESLint docs.

module.exports = {
  // Stop ESLint from looking for configuration files in parent folders
  root: true,

  // Define the environments our code runs in
  env: {
    browser: true,   // Browser globals (window, document, etc.)
    es2020: true,    // ES2020 globals and syntax
  },

  // Extend recommended configurations from various plugins
  extends: [
    'eslint:recommended',                     // ESLint's core recommended rules
    'plugin:@typescript-eslint/recommended',  // TypeScript rules (basic)
    'plugin:@typescript-eslint/recommended-requiring-type-checking', // Advanced type-aware rules
    'plugin:react/recommended',                // React specific linting
    'plugin:react-hooks/recommended',          // React Hooks rules
    'plugin:jsx-a11y/recommended',             // Accessibility rules
    'prettier', // Must be last to turn off formatting rules that conflict with Prettier
  ],

  // Files and folders to ignore
  ignorePatterns: ['dist', '.eslintrc.cjs'],

  // Parser configuration for TypeScript
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',                     // Use the latest ECMAScript syntax
    sourceType: 'module',                       // Code is in ECMAScript modules
    project: ['./tsconfig.json', './tsconfig.node.json'], // Use TypeScript's project service
    tsconfigRootDir: __dirname,                  // Required for project references
  },

  // Plugins provide additional rules and configurations
  plugins: [
    'react',
    'react-refresh',      // Enforce best practices for React Refresh (Vite)
    '@typescript-eslint',
    'jsx-a11y',
    'simple-import-sort', // Enforce consistent import ordering
  ],

  // Shared settings for plugins
  settings: {
    react: {
      version: 'detect', // Automatically detect the React version
    },
  },

  // Custom rules – override or extend the recommended ones
  rules: {
    // === React rules ===
    'react/react-in-jsx-scope': 'off',          // Not needed with React 17+ JSX transform
    'react/prop-types': 'off',                  // TypeScript handles prop validation
    'react/jsx-uses-react': 'off',               // Not needed with new JSX transform

    // === React Refresh (Vite) ===
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },             // Allow constant exports alongside components
    ],

    // === TypeScript rules ===
    '@typescript-eslint/no-unused-vars': [
      'error',
      { argsIgnorePattern: '^_' },               // Allow unused vars prefixed with '_'
    ],
    '@typescript-eslint/explicit-function-return-type': 'off', // TypeScript infers return types
    '@typescript-eslint/explicit-module-boundary-types': 'off', // Not needed with TypeScript
    '@typescript-eslint/no-explicit-any': 'warn', // Discourage 'any', but allow with warning

    // === Import sorting ===
    'simple-import-sort/imports': 'error',       // Sort import statements
    'simple-import-sort/exports': 'error',       // Sort export statements
    'import/first': 'error',                      // Ensure all imports are at the top
    'import/newline-after-import': 'error',       // Enforce newline after import block
    'import/no-duplicates': 'error',              // Disallow duplicate imports

    // === Accessibility (jsx-a11y) additional rules ===
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],                     // Support custom Link components
        specialLink: ['hrefLeft', 'hrefRight'],
        aspects: ['invalidHref', 'preferButton'],
      },
    ],
    'jsx-a11y/control-has-associated-label': 'warn', // Encourage labels for interactive controls

    // === General best practices ===
    'no-console': ['warn', { allow: ['warn', 'error'] }], // Allow console.warn/error, warn on others
    'no-debugger': 'warn',                         // Warn on debugger statements
    eqeqeq: ['error', 'always'],                    // Enforce strict equality (===, !==)
  },

  // Override rules for specific files
  overrides: [
    {
      files: ['*.ts', '*.tsx'],                     // Apply to TypeScript files
      rules: {
        // Place any TypeScript‑specific overrides here if needed
      },
    },
  ],
};