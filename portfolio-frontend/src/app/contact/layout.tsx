// src/app/contact/layout.tsx
import { ReactNode } from 'react';
import { Metadata } from 'next';

interface ContactLayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: 'Contact | Alex Kern | AI Agent Architect',
  description: 'Get in touch with Alex Kern – AI agent architect, data scientist, and MLOps engineer. Let’s collaborate on your next AI initiative.',
};

export default function ContactLayout({ children }: ContactLayoutProps) {
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