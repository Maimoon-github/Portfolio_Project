// src/components/animations/StaggerList.tsx
'use client';

import { motion, useInView, type Variants } from 'framer-motion';
import { useRef } from 'react';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

interface StaggerListProps {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  yOffset?: number;
}

const itemVariants = (yOffset: number): Variants => ({
  hidden: { opacity: 0, y: yOffset },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
});

export function StaggerList({
  children,
  className,
  stagger = 0.1,
  delay = 0,
  yOffset = 40,
}: StaggerListProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  const variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={variants}
      className={className}
    >
      {Array.isArray(children)
        ? children.map((child, i) => (
            <motion.div key={i} variants={itemVariants(yOffset)}>
              {child}
            </motion.div>
          ))
        : children}
    </motion.div>
  );
}