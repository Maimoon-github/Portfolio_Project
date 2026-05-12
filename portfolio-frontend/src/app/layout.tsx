// src/app/layout.tsx
import type { Metadata } from 'next';
import { SmoothScroll } from '@/components/layout/SmoothScroll';
import { Navbar } from '@/components/layout/Navbar';
import { StructuredData } from '@/components/seo/StructuredData';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://alexkern.dev'),
  title: 'Alex Kern | Data Scientist & AI Agent Architect',
  description:
    'Portfolio of Alex Kern – designing intelligent agentic workflows and production ML systems.',
  openGraph: {
    images: ['/og-image.jpg'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <StructuredData />
      </head>
      <body>
        <SmoothScroll>
          <Navbar />
          <main>{children}</main>
        </SmoothScroll>
      </body>
    </html>
  );
}