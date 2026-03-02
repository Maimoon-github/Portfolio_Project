// specialist-portfolio/src/hooks/useReducedMotion.ts

import { useState, useEffect } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

/**
 * Custom hook to detect OS‑level "reduce motion" preference.
 * Reacts to preference changes and updates automatically.
 *
 * @returns boolean – true if user prefers reduced motion, false otherwise
 *
 * - Uses window.matchMedia with proper cleanup
 * - Updates state if preference changes at runtime
 * - SSR‑safe (returns false on server)
 */
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia(QUERY);
    setPrefersReducedMotion(mediaQuery.matches);

    const onChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    // Use appropriate listener method
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', onChange);
    } else {
      (mediaQuery as any).addListener?.(onChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', onChange);
      } else {
        (mediaQuery as any).removeListener?.(onChange);
      }
    };
  }, []);

  return prefersReducedMotion;
}