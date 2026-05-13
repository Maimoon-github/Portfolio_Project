// src/lib/motion.ts
import { Variants, MotionProps, Transition } from 'framer-motion';

/**
 * Standard viewport presets for scroll-triggered animations.
 * Follows TLS `--animate-fade-up` behavior (once, minimal margin).
 */
export const viewportPresets = {
  once: {
    once: true,
    amount: 0.2, // Trigger when 20% visible
  },
  repeat: {
    once: false,
    amount: 0.1,
  },
} as const;

/**
 * Default fade-up animation variants.
 * Matches `--animate-fade-up` from globals.css.
 */
export const fadeUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

/**
 * Staggered children variants for lists.
 */
export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};

/**
 * Hover scale + glow transition for interactive cards/buttons.
 */
export const hoverScaleTransition: Transition = {
  type: 'spring',
  stiffness: 400,
  damping: 17,
};

export const hoverScaleVariants: Variants = {
  initial: { scale: 1 },
  hover: { scale: 1.02, transition: hoverScaleTransition },
  tap: { scale: 0.98 },
};

/**
 * Glass panel entrance (opacity + subtle scale).
 */
export const glassEntranceVariants: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

/**
 * Predefined motion props for common use cases.
 */
export const motionPresets = {
  fadeUp: {
    initial: 'hidden',
    whileInView: 'visible',
    viewport: viewportPresets.once,
    variants: fadeUpVariants,
  } as MotionProps,
  staggerContainer: {
    initial: 'hidden',
    whileInView: 'visible',
    viewport: viewportPresets.once,
    variants: staggerContainerVariants,
  } as MotionProps,
  staggerItem: {
    variants: staggerItemVariants,
  } as MotionProps,
  hoverScale: {
    initial: 'initial',
    whileHover: 'hover',
    whileTap: 'tap',
    variants: hoverScaleVariants,
  } as MotionProps,
};