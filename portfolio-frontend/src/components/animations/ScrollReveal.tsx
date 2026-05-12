// src/components/animations/ScrollReveal.tsx
'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  yOffset?: number;
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
  duration = 0.6,
  yOffset = 20,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: yOffset }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}