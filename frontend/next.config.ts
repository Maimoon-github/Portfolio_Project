import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Allow image optimization from the Django backend host
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // tighten to your backend domain in production
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
  },

  // In production Next.js will call the Django API directly via NEXT_PUBLIC_API_BASE.
  // In development, optionally proxy /api through Next.js to avoid CORS:
  async rewrites() {
    const apiBase = process.env.NEXT_PUBLIC_API_BASE;
    if (!apiBase) return [];
    return [
      {
        source: '/api/:path*',
        destination: `${apiBase}/:path*`,
      },
    ];
  },
};

export default nextConfig;
