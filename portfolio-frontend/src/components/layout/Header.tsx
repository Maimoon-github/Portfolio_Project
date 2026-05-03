// src/components/layout/Header.tsx
// Sticky site header — glassmorphic bar, logo, nav links, CTA.
// Client component for scroll-aware opacity.

'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ThemeToggle } from './ThemeToggle';

const NAV_LINKS = [
  { href: '/portfolio', label: 'Work'   },
  { href: '/#skills',   label: 'Skills' },
  { href: '/blog',      label: 'Blog'   },
  { href: '/tools',     label: 'Tools'  },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 inset-x-0 z-[var(--z-float)]',
        'transition-all duration-[400ms] ease-[var(--ease-out-expo)]',
        scrolled
          ? [
              'bg-[var(--glass-bg)]',
              'backdrop-blur-[var(--glass-blur)]',
              'border-b border-[var(--color-outline-variant)]',
              'shadow-[var(--shadow-glow-sm)]',
            ]
          : 'bg-transparent border-b border-transparent'
      )}
    >
      <div className="w-full max-w-[1280px] mx-auto px-8 h-[64px] flex items-center justify-between">

        {/* ── Logo ── */}
        <Link
          href="/"
          className="type-label-caps text-[var(--color-on-surface)] hover:text-[var(--color-primary)] transition-colors duration-[120ms]"
          aria-label="Alex Reeves – home"
        >
          Alex Reeves
        </Link>

        {/* ── Nav ── */}
        <nav
          className="hidden md:flex items-center gap-2"
          aria-label="Primary navigation"
        >
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'px-4 py-2 rounded-[var(--radius-sm)]',
                'type-label-caps text-[var(--color-on-surface-variant)] text-[11px]',
                'transition-colors duration-[120ms] ease-[var(--ease-out-expo)]',
                'hover:text-[var(--color-primary)]'
              )}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* ── Actions ── */}
        <div className="flex items-center gap-4">
          <ThemeToggle />
          
          <button
            className={cn(
              'md:hidden p-2 rounded-[var(--radius-sm)]',
              'text-[var(--color-on-surface-variant)]',
              'hover:bg-[var(--color-surface-container)]',
              'transition-colors duration-[120ms]'
            )}
            aria-label="Open navigation menu"
          >
            <svg
              width="20" height="20" viewBox="0 0 20 20" fill="none"
              stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
              aria-hidden="true"
            >
              <line x1="3" y1="6"  x2="17" y2="6"  />
              <line x1="3" y1="10" x2="17" y2="10" />
              <line x1="3" y1="14" x2="17" y2="14" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}