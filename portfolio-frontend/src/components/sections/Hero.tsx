// src/components/sections/Hero.tsx
'use client';

import { motion, type Variants } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { ParticleField } from '@/components/3d/elements/ParticleField';

interface HeroProps {
  subtitle: string;
  titlePrefix?: string;
  titleHighlight: string;
  titleSuffix?: string;
  description: string;
  ctaPrimary: string;
  ctaSecondary: string;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.7, 
      ease: [0.42, 0, 0.58, 1] 
    } 
  },
};

export function Hero({
  subtitle,
  titlePrefix = 'Building',
  titleHighlight,
  titleSuffix = 'intelligence',
  description,
  ctaPrimary = 'View Work',
  ctaSecondary = 'Get in Touch',
}: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Full‑screen Canvas for particle background */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          style={{ background: 'transparent' }}
        >
          <ParticleField />
        </Canvas>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-5xl px-6 text-center"
      >
        <motion.p
          variants={itemVariants}
          className="mb-4 font-mono text-sm uppercase tracking-[0.3em] text-primary-light"
        >
          {subtitle}
        </motion.p>

        <motion.h1
          variants={itemVariants}
          className="text-5xl font-bold leading-tight tracking-tight sm:text-7xl lg:text-8xl"
        >
          {titlePrefix}{' '}
          <span className="text-accent">
            {titleHighlight}
          </span>{' '}
          {titleSuffix}
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="mx-auto mt-6 max-w-2xl text-lg text-on-background/60"
        >
          {description}
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="mt-10 flex flex-wrap justify-center gap-4"
        >
          <a
            href="#workflow"
            className="inline-flex items-center rounded-lg bg-accent px-8 py-3 font-semibold text-background transition-all hover:scale-105 hover:shadow-lg hover:shadow-accent/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            {ctaPrimary}
          </a>
          <a
            href="#contact"
            className="inline-flex items-center rounded-lg border border-outline-variant px-8 py-3 font-medium text-on-background transition-all hover:border-primary hover:text-primary-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            {ctaSecondary}
          </a>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-24 animate-bounce"
          aria-hidden="true"
        >
          <ArrowDown className="mx-auto text-on-background/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}