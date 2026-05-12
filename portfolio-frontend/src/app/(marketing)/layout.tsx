// src/app/(marketing)/layout.tsx
import { ReactNode } from 'react';

interface MarketingLayoutProps {
  children: ReactNode;
}

/**
 * Layout for all marketing pages (home, expertise, projects, etc.).
 * - Centers content with max-width container.
 * - Uses TLS spacing tokens: --spacing-page-margin (64px desktop) and --spacing-gutter (32px mobile).
 * - Adds top padding to avoid overlapping with fixed navbar.
 * - Bottom padding ensures spacing before footer.
 */
export default function MarketingLayout({ children }: MarketingLayoutProps) {
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