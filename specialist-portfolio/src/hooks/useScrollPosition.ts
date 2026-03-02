/**
 * useScrollPosition.ts
 * Custom hook for tracking scroll position, direction, and threshold.
 * Performance‑optimized with requestAnimationFrame throttling.
 */

import { useState, useEffect, useRef, useCallback } from 'react';

export interface ScrollPosition {
  /** Current vertical scroll position (px) */
  scrollY: number;
  /** Whether user has scrolled past threshold (10px) */
  isScrolled: boolean;
  /** Last scroll direction */
  direction: 'up' | 'down';
}

const SCROLL_THRESHOLD = 10;

/**
 * useScrollPosition hook
 * @returns { scrollY: number; isScrolled: boolean; direction: 'up' | 'down' }
 *
 * - Throttles updates via requestAnimationFrame
 * - Uses passive event listener for performance
 * - Tracks scroll direction and threshold
 */
export function useScrollPosition(): ScrollPosition {
  const [scrollY, setScrollY] = useState(0);
  const [direction, setDirection] = useState<'up' | 'down'>('down');
  const [isScrolled, setIsScrolled] = useState(false);

  // Use refs to avoid stale values in animation frame callback
  const lastScrollYRef = useRef(0);
  const tickingRef = useRef(false);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;

    // Update direction
    if (currentScrollY > lastScrollYRef.current) {
      setDirection('down');
    } else if (currentScrollY < lastScrollYRef.current) {
      setDirection('up');
    }

    // Update threshold flag
    setIsScrolled(currentScrollY > SCROLL_THRESHOLD);

    // Update position state
    setScrollY(currentScrollY);
    lastScrollYRef.current = currentScrollY;
    tickingRef.current = false;
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (!tickingRef.current) {
        requestAnimationFrame(handleScroll);
        tickingRef.current = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    // Initial call to set initial values
    handleScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [handleScroll]);

  return { scrollY, isScrolled, direction };
}