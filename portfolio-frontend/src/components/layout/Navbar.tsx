'use client';

import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const links = ['About', 'Skills', 'Workflow', 'Projects', 'Contact'];

export function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, 'change', (latest) => setScrolled(latest > 50));

  return (
    <motion.header
      className={cn(
        'fixed top-0 z-50 w-full transition-colors',
        scrolled ? 'glass' : 'bg-transparent'
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-mono text-xl font-bold tracking-tight text-primary">
          &lt;AK /&gt;
        </Link>
        <ul className="hidden md:flex gap-8">
          {links.map((text) => (
            <li key={text}>
              <Link
                href={`#${text.toLowerCase()}`}
                className="text-sm uppercase tracking-widest text-white/70 hover:text-primary transition-colors"
              >
                {text}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </motion.header>
  );
}
