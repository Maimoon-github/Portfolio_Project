// src/app/projects/layout.tsx
import { ReactNode } from 'react';
import { Metadata } from 'next';

interface ProjectsLayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: 'Projects | Alex Kern | AI Agent Architect',
  description:
    'Explore Alex Kern’s portfolio of AI‑driven projects — autonomous agents, production MLOps pipelines, data science experiments, and research prototypes.',
};

export default function ProjectsLayout({ children }: ProjectsLayoutProps) {
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