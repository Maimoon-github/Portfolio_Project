// src/app/about/layout.tsx
import { ReactNode } from 'react';
import { Metadata } from 'next';

interface AboutLayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: 'About | Alex Kern | AI Agent Architect',
  description:
    'Learn about Alex Kern — a Data Scientist and AI Architect specializing in autonomous agent systems and production MLOps.',
};

export default function AboutLayout({ children }: AboutLayoutProps) {
  return (
    <div
      className={`
        mx-auto w-full
        max-w-7xl
        px-6 md:px-8 lg:px-12 xl:px-16
        pt-20 md:pt-24
        pb-12 md:pb-16
      `}
    >
      {children}
    </div>
  );
}