import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import preload from 'vite-preload/plugin';

// https://vitejs.dev/config/
export default defineConfig({
  // Base URL for deployment - adjust for GitHub Pages or custom domain
  base: process.env.NODE_ENV === 'production' ? '/' : '/',

  plugins: [
    preload(), // Add before react()
    react()
  ],

  // Path resolution configuration
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Enables @/component imports
    },
  },

  // Development server configuration
  server: {
    port: 3000,
    open: true, // Auto-open browser
    cors: true, // Enable CORS
    proxy: {
      // API proxy example
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },

  // Production build configuration
  build: {
    // Output directory
    outDir: 'dist',
    // Assets directory inside outDir
    assetsDir: 'assets',
    // Generate source maps for production (optional, disable for smaller builds)
    sourcemap: true,
    // Chunk size warning limit
    chunkSizeWarningLimit: 1000,

    // Rollup-specific options
    rollupOptions: {
      output: {
        // Customize JS output: all JS goes to js/ folder with hash
        entryFileNames: 'js/[name].[hash].js',
        chunkFileNames: 'js/[name].[hash].js',

        // Customize asset output based on file type
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name?.split('.') ?? [];
          const ext = info[info.length - 1];

          // Images
          if (/png|jpe?g|svg|gif|tiff|bmp|ico|webp/i.test(ext)) {
            return `images/[name].[hash].[ext]`;
          }

          // CSS files
          if (ext === 'css') {
            return `css/[name].[hash].[ext]`;
          }

          // Fonts
          if (/woff|woff2|eot|ttf|otf/i.test(ext)) {
            return `fonts/[name].[hash].[ext]`;
          }

          // Default for other assets
          return `assets/[name].[hash].[ext]`;
        },

        // Code splitting strategy
        manualChunks: (id) => {
          // Vendor chunk for node_modules
          if (id.includes('node_modules')) {
            // Split larger dependencies into separate chunks
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor-react';
            }
            return 'vendor';
          }

          // Create separate chunk for components folder if needed
          // if (id.includes('/src/components/')) {
          //   return 'components';
          // }
        },
      },
    },

    // Enable/disable minification
    minify: 'esbuild', // or 'terser' for better compression but slower

    // Target browsers
    target: 'es2020',
  },

  // Preview server configuration
  preview: {
    port: 4173,
    open: true,
  },

  // Dependency optimization
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
});



