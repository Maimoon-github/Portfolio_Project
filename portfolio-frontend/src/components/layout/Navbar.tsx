// src/components/layout/Navbar.tsx
'use client';

import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { useRef, useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { NAVIGATION_ITEMS } from '@/constants';

export function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const isScrolledRef = useRef(false);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const newScrolled = latest > 50;
    if (newScrolled !== isScrolledRef.current) {
      isScrolledRef.current = newScrolled;
      setScrolled(newScrolled);
    }
  });

  return (
    <motion.header
      className={cn(
        'fixed top-0 z-50 w-full transition-colors duration-300',
        scrolled ? 'glass-header' : 'bg-transparent'
      )}
    >
      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4"
      >
        <Link
          href="/"
          className="font-mono text-xl font-bold tracking-tight text-primary hover:text-accent transition-colors"
        >
          &lt;AK /&gt;
        </Link>
        <ul className="hidden md:flex gap-8" role="list">
          {NAVIGATION_ITEMS.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-sm uppercase tracking-widest text-on-background/70 hover:text-primary transition-colors"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </motion.header>
  );
}