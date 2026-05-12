// src/components/layout/Cursor.tsx
'use client';

import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

export function Cursor() {
  const [isHovering, setIsHovering] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const prefersReduced = useReducedMotion();

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    if (isMobile || prefersReduced) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 4);
      cursorY.set(e.clientY - 4);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.closest('a, button, [role="button"], input, textarea, .interactive');
      setIsHovering(!!isInteractive);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY, isMobile, prefersReduced]);

  if (isMobile || prefersReduced) return null;

  return (
    <>
      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none w-2 h-2 rounded-full bg-primary"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      />
      {/* Ring */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none w-8 h-8 rounded-full border border-primary/50"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          scale: isHovering ? 1.5 : 1,
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          borderColor: isHovering ? 'var(--color-accent)' : 'rgba(95, 45, 166, 0.5)',
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      />
    </>
  );
}