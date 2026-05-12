// src/components/animations/TextReveal.tsx
'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

interface TextRevealProps {
  text: string;
  className?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  once?: boolean;
  delay?: number;
  duration?: number;
  splitBy?: 'characters' | 'words';
  stagger?: number;
}

export function TextReveal({
  text,
  className,
  tag: Tag = 'p',
  once = true,
  delay = 0,
  duration = 0.5,
  splitBy = 'characters',
  stagger = 0.03,
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: '-50px' });
  const prefersReduced = useReducedMotion();

  // Split text into array
  const splitArray = splitBy === 'characters' ? text.split('') : text.split(' ');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delayChildren: delay, staggerChildren: stagger },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration, ease: 'easeOut' },
    },
  };

  if (prefersReduced) {
    return (
      <Tag className={className} ref={ref}>
        {text}
      </Tag>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={containerVariants}
      className={className}
    >
      <Tag className="inline-block">
        {splitArray.map((item, index) => (
          <motion.span
            key={index}
            variants={childVariants}
            className={splitBy === 'words' ? 'inline-block mr-1' : 'inline-block'}
          >
            {item}
            {splitBy === 'words' && index !== splitArray.length - 1 ? ' ' : ''}
          </motion.span>
        ))}
      </Tag>
    </motion.div>
  );
}