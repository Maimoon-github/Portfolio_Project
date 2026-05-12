// src/hooks/use-reduced-motion.ts
'use client';

import { useReducedMotion as useFramerReducedMotion } from 'framer-motion';

/**
 * Hook that returns true if the user prefers reduced motion.
 * Uses framer-motion's built-in detection.
 */
export function useReducedMotion(): boolean {
  const prefersReduced = useFramerReducedMotion();
  return prefersReduced ?? false;
}