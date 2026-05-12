// src/hooks/use-scroll-progress.ts
'use client';

import { useState, useEffect } from 'react';

/**
 * Tracks vertical scroll progress as a value between 0 and 1.
 * @returns number representing scroll progress (0 = top, 1 = bottom)
 */
export function useScrollProgress(): number {
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      const totalScroll = scrollHeight - clientHeight;
      const scrollProgress = totalScroll > 0 ? scrollTop / totalScroll : 0;
      setProgress(scrollProgress);
    };

    handleScroll(); // initial call
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return progress;
}