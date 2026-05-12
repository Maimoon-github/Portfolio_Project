// src/components/animations/ScrollProgress.tsx
'use client';

import { motion, useScroll, useSpring } from 'framer-motion';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const prefersReduced = useReducedMotion();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  if (prefersReduced) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[60] h-1 origin-left bg-primary"
      style={{ scaleX }}
    />
  );
}