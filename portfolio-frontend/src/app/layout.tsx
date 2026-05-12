// src/app/layout.tsx
import type { Metadata, Viewport } from 'next';
import { ReactNode } from 'react';
import { SmoothScroll } from '@/components/layout/SmoothScroll';
import { Navbar } from '@/components/layout/Navbar';
import { StructuredData } from '@/components/seo/StructuredData';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://alexkern.dev'),
  title: 'Alex Kern | Data Scientist & AI Agent Architect',
  description:
    'Portfolio of Alex Kern – designing intelligent agentic workflows and production ML systems.',
  keywords: ['AI Agent', 'Data Scientist', 'MLOps', 'Agentic Workflows', 'Machine Learning'],
  authors: [{ name: 'Alex Kern' }],
  creator: 'Alex Kern',
  openGraph: {
    title: 'Alex Kern | AI Agent Architect',
    description: 'Explore agentic AI systems, data science, and MLOps through immersive 3D experiences.',
    url: 'https://alexkern.dev',
    siteName: 'Alex Kern Portfolio',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Alex Kern Portfolio - AI Agent Architect',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alex Kern | AI Agent Architect',
    description: 'Designing intelligent agentic workflows and production ML systems.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code', // Replace with actual code
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#5f2da6', // --color-primary
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        <StructuredData />
      </head>
      {/* 
        body classes are defensive; globals.css already sets background, color, font-family.
        These classes guarantee TLS tokens even if base layer is overridden.
      */}
      <body className="bg-background text-on-background font-sans antialiased">
        <SmoothScroll>
          <Navbar />
          <main>{children}</main>
        </SmoothScroll>
      </body>
    </html>
  );
}