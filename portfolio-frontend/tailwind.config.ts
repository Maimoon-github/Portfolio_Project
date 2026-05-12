// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/constants/**/*.ts',
  ],
  theme: {
    extend: {
      // Only extend what cannot be expressed in @theme
      screens: {
        '3xl': '1920px', // extra wide desktop support
      },
      keyframes: {
        // Already defined in globals.css; keep for completeness
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out',
      },
    },
  },
  plugins: [],
  future: {
    hoverOnlyWhenSupported: true,
  },
}

export default config