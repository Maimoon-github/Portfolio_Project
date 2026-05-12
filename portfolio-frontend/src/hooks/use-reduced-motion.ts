// src/hooks/use-reduced-motion.ts
'use client';

import { useReducedMotion } from 'framer-motion';

export function useRespectMotion() {
  const prefersReduced = useReducedMotion() ?? false;
  return prefersReduced;
}