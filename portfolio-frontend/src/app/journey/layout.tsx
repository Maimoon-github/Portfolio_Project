// src/app/journey/layout.tsx
import { ReactNode } from 'react';
import { Metadata } from 'next';

interface JourneyLayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: 'My Career Journey | Alex Kern | AI Architect',
  description:
    'Follow my journey from data science to AI architecture across the 2026 AI landscape — skills, milestones, and resources to help you navigate your own AI career path.',
};

export default function JourneyLayout({ children }: JourneyLayoutProps) {
  return (
    <div
      className="mx-auto w-full max-w-7xl
      px-6 md:px-8 lg:px-12 xl:px-16
      pt-20 md:pt-24
      pb-12 md:pb-16"
    >
      {children}
    </div>
  );
}