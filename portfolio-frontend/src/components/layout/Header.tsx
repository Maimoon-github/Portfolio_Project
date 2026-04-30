// src/components/layout/Header.tsx
// Sticky site header — glassmorphic bar, logo, nav links, CTA.
// Client component for scroll-aware opacity.

'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/about',     label: 'About'     },
  { href: '/tools',     label: 'Tools'     },
  { href: '/blog',      label: 'Blog'      },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 inset-x-0 z-[var(--z-overlay)]',
        'transition-all duration-[400ms] ease-[var(--ease-out-expo)]',
        scrolled
          ? [
              'bg-[var(--color-surface-container-lowest)]/80',
              'backdrop-blur-[40px]',
              'border-b border-[var(--color-outline-variant)]',
              'shadow-[var(--shadow-glow-sm)]',
            ]
          : 'bg-transparent border-b border-transparent'
      )}
    >
      <div className="w-full max-w-[1280px] mx-auto px-8 h-16 flex items-center justify-between">

        {/* ── Logo ── */}
        <Link
          href="/"
          className="flex items-center gap-2 group"
          aria-label="Alex Reeves – home"
        >
          {/* Lotus sigil */}
          <span
            className={cn(
              'inline-block w-7 h-7 rounded-[var(--radius-sm)]',
              'bg-[var(--color-primary-container)]',
              'shadow-[var(--shadow-glow-md)]',
              'transition-transform duration-[220ms] ease-[var(--ease-spring)]',
              'group-hover:scale-110'
            )}
            aria-hidden="true"
          />
          <span
            className={cn(
              'text-[var(--color-on-surface)] font-semibold tracking-[-0.01em] text-[15px]',
              'transition-colors duration-[120ms]',
              'group-hover:text-[var(--color-primary)]'
            )}
          >
            Alex Reeves
          </span>
        </Link>

        {/* ── Nav ── */}
        <nav
          className="hidden md:flex items-center gap-1"
          aria-label="Primary navigation"
        >
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'px-4 py-2 rounded-[var(--radius-sm)]',
                'type-label-caps text-[var(--color-on-surface-variant)]',
                'transition-colors duration-[120ms] ease-[var(--ease-out-expo)]',
                'hover:text-[var(--color-on-surface)] hover:bg-[var(--color-surface-container)]'
              )}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* ── CTA ── */}
        <Link
          href="/contact"
          className={cn(
            'hidden sm:inline-flex btn-primary',
            'px-5 py-2.5 text-[11px] tracking-[0.15em]'
          )}
        >
          Contact
        </Link>

        {/* ── Mobile menu trigger (placeholder) ── */}
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
    </header>
  );
}