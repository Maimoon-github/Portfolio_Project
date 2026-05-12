// src/app/lab/layout.tsx
import { ReactNode } from 'react';
import { Metadata } from 'next';

interface LabLayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: 'Experimental Lab | Alex Kern | AI Agent Architect',
  description:
    'Explore experimental 3D visualisations, AI agent workflows, and cutting‑edge interactive prototypes in Alex Kern’s digital laboratory.',
};

export default function LabLayout({ children }: LabLayoutProps) {
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