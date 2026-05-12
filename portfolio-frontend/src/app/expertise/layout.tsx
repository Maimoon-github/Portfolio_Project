// src/app/expertise/layout.tsx
import { ReactNode } from 'react';
import { Metadata } from 'next';

interface ExpertiseLayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: 'Technical Expertise | Alex Kern | AI Agent Architect',
  description:
    'Explore Alex Kern\'s technical expertise across AI agent architecture, production LLMOps, MLOps foundations, advanced data science, and multi‑agent frameworks.',
};

export default function ExpertiseLayout({ children }: ExpertiseLayoutProps) {
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