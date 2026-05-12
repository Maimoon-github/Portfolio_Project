// src/components/animations/StaggerList.tsx
'use client';

import { motion, useInView, type Variants } from 'framer-motion';
import { useRef } from 'react';

interface StaggerListProps {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
}

const listVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export function StaggerList({
  children,
  className,
  stagger = 0.1,
  delay = 0,
}: StaggerListProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={listVariants}
      transition={{
        staggerChildren: stagger,
        delayChildren: delay,
      }}
      className={className}
    >
      {Array.isArray(children)
        ? children.map((child, i) => (
            <motion.div key={i} variants={itemVariants}>
              {child}
            </motion.div>
          ))
        : children}
    </motion.div>
  );
}