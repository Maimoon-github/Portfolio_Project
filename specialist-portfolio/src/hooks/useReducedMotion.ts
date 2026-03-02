/**
 * useReducedMotion.ts
 * Custom hook to detect OS‑level "reduce motion" preference.
 * Reacts to preference changes and updates automatically.
 */

import { useState, useEffect } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

/**
 * useReducedMotion hook
 * @returns boolean – true if user prefers reduced motion, false otherwise
 *
 * - Uses window.matchMedia with proper cleanup
 * - Updates state if preference changes at runtime
 * - SSR‑safe (returns false on server)
 */
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // SSR guard
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia(QUERY);
    // Initial value
    setPrefersReducedMotion(mediaQuery.matches);

    // Handler for changes
    const onChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    // Use the appropriate listener method (modern + fallback for older browsers)
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', onChange);
    } else {
      // Deprecated but needed for older browsers
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