import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import preload from 'vite-preload/plugin';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';

  return {
    // Base public path – can be overridden by environment variable
    base: process.env.VITE_BASE_URL || (isProduction ? '/' : '/'),

    // Plugins
    plugins: [
      preload(), // Must come before react()
      react(),
    ],

    // Path resolution
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'), // Enables @/ imports
      },
    },

    // Development server
    server: {
      port: 3000,
      open: true,            // Automatically open browser
      cors: true,            // Enable CORS for all requests
      proxy: {
        // Example API proxy – adjust as needed
        '/api': {
          target: 'http://localhost:5000',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },

    // Preview server (for testing production build locally)
    preview: {
      port: 4173,
      open: true,
    },

    // Production build configuration
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: true,                         // Generate source maps (disable for smaller builds)
      chunkSizeWarningLimit: 1000,              // Warn if chunk exceeds 1000 kB
      minify: 'esbuild',                         // or 'terser' for better compression
      target: 'es2020',                          // Modern browsers

      rollupOptions: {
        output: {
          // JS output: all JS files go to js/ folder with hash
          entryFileNames: 'js/[name].[hash].js',
          chunkFileNames: 'js/[name].[hash].js',

          // Asset output: categorize by file extension
          assetFileNames: (assetInfo) => {
            const fileName = assetInfo.name || '';
            const ext = fileName.split('.').pop()?.toLowerCase() || '';

            const assetTypeMap: Record<string, string> = {
              // Images
              png: 'images',
              jpg: 'images',
              jpeg: 'images',
              svg: 'images',
              gif: 'images',
              tiff: 'images',
              bmp: 'images',
              ico: 'images',
              webp: 'images',
              // Styles
              css: 'css',
              // Fonts
              woff: 'fonts',
              woff2: 'fonts',
              eot: 'fonts',
              ttf: 'fonts',
              otf: 'fonts',
            };

            const folder = assetTypeMap[ext] || 'assets';
            return `${folder}/[name].[hash].[ext]`;
          },

          // Code splitting
          manualChunks: (id) => {
            // Split vendor chunks from node_modules
            if (id.includes('node_modules')) {
              // Further split React into its own chunk for better caching
              if (id.includes('react') || id.includes('react-dom')) {
                return 'vendor-react';
              }
              return 'vendor';
            }
            // Optionally split components folder (uncomment if needed)
            // if (id.includes('/src/components/')) {
            //   return 'components';
            // }
          },
        },
      },
    },

    // Dependency optimization
    optimizeDeps: {
      include: ['react', 'react-dom'],
    },
  };
});