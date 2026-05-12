// src/hooks/use-card-tilt.ts
'use client';

import { useMotionValue, useSpring, useTransform, type MotionStyle } from 'framer-motion';
import { useCallback } from 'react';

interface UseCardTiltOptions {
  maxTilt?: number;
  perspective?: number;
}

/**
 * Creates a 3D tilt effect on a card element with dynamic glare.
 * @param options.maxTilt - Maximum rotation in degrees (default 8)
 * @param options.perspective - CSS perspective value in pixels (default 600)
 * @returns style object, onMouseMove, onMouseLeave handlers for the target element
 */
export function useCardTilt<T extends HTMLElement>({
  maxTilt = 8,
  perspective = 600,
}: UseCardTiltOptions = {}) {
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(y, [0, 1], [maxTilt, -maxTilt]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(x, [0, 1], [-maxTilt, maxTilt]), {
    stiffness: 300,
    damping: 30,
  });

  const glareX = useTransform(x, [0, 1], ['0%', '100%']);
  const glareY = useTransform(y, [0, 1], ['0%', '100%']);

  const onMouseMove = useCallback(
    (e: React.MouseEvent<T>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const xVal = (e.clientX - rect.left) / rect.width;
      const yVal = (e.clientY - rect.top) / rect.height;
      x.set(xVal);
      y.set(yVal);
    },
    [x, y]
  );

  const onMouseLeave = useCallback(() => {
    x.set(0.5);
    y.set(0.5);
  }, [x, y]);

  return {
    style: {
      rotateX,
      rotateY,
      '--glare-x': glareX,
      '--glare-y': glareY,
      perspective,
    } as MotionStyle,
    onMouseMove,
    onMouseLeave,
  };
}