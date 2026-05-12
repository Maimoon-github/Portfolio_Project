// src/hooks/use-media-query.ts
'use client';

import { useSyncExternalStore } from 'react';

/**
 * Reactive media query hook.
 * @param query - CSS media query string, e.g., '(min-width: 768px)'
 * @returns boolean indicating if the query matches
 */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (callback) => {
      const media = window.matchMedia(query);
      media.addEventListener('change', callback);
      return () => media.removeEventListener('change', callback);
    },
    () => window.matchMedia(query).matches,
    () => false // SSR fallback
  );
}