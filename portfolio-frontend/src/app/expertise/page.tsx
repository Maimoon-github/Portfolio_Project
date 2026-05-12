// src/app/expertise/page.tsx
'use client';

import { motion, useInView, type Variants } from 'framer-motion';
import { useRef } from 'react';
import { CanvasWrapper } from '@/components/3d/core/CanvasWrapper';
import { Scene } from '@/components/3d/core/Scene';
import { CameraRig } from '@/components/3d/core/CameraRig';
import { NeuralNetwork } from '@/components/3d/elements/NeuralNetwork';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { StaggerList } from '@/components/animations/StaggerList';
import { expertiseData } from '@/lib/data';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function ExpertisePage() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-section-gap"
    >
      {/* Hero Section with Neural Network 3D Scene */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden rounded-2xl glass">
        <div className="absolute inset-0 z-0 opacity-30">
          <CanvasWrapper>
            <Scene ambientIntensity={0.3}>
              <CameraRig
                enableOrbit={false}
                autoRotate
                autoRotateSpeed={0.4}
                cameraPosition={[0, 0, 6]}
                enableZoom={false}
                enablePan={false}
              />
              <NeuralNetwork nodeCount={60} radius={3.5} connectionDistance={2.0} nodeSize={0.1} />
            </Scene>
          </CanvasWrapper>
        </div>

        <div className="relative z-10 max-w-4xl px-6 text-center">
          <motion.h1
            variants={itemVariants}
            className="text-h1 md:text-display font-bold bg-gradient-to-r from-primary-light via-primary to-accent bg-clip-text text-transparent mb-4"
          >
            {expertiseData.introTitle}
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-body-lg text-on-background/70 max-w-2xl mx-auto"
          >
            {expertiseData.introDescription}
          </motion.p>
        </div>
      </section>

      {/* Pillars Grid */}
      <div className="space-y-20">
        {expertiseData.pillars.map((pillar, pillarIdx) => (
          <ScrollReveal key={pillar.title}>
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-h2 font-semibold mb-4">{pillar.title}</h2>
                <p className="text-body-md text-on-background/60 max-w-2xl mx-auto">
                  {pillar.description}
                </p>
              </div>

              <StaggerList stagger={0.08} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pillar.subcategories.map((sub) => (
                  <motion.div
                    key={sub.name}
                    variants={itemVariants}
                    className="glass-card p-6 hover:shadow-[0_0_16px_var(--color-primary)] transition-all duration-300"
                  >
                    <h3 className="text-h3 font-semibold text-primary-light mb-3">{sub.name}</h3>
                    <p className="text-sm text-on-background/70 leading-relaxed">
                      {sub.description}
                    </p>
                  </motion.div>
                ))}
              </StaggerList>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Expertise Callout — CTA */}
      <ScrollReveal>
        <section className="relative overflow-hidden rounded-2xl glass p-10 text-center">
          <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-primary to-accent" />
          <div className="relative z-10">
            <h2 className="text-h2 font-semibold mb-4">Ready to build?</h2>
            <p className="text-body-lg text-on-background/70 max-w-2xl mx-auto mb-8">
              Let’s discuss how this expertise can accelerate your AI initiatives — from agentic prototypes to enterprise production systems.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center rounded-lg bg-accent px-8 py-3 font-semibold text-background transition-all hover:scale-105 hover:shadow-lg hover:shadow-accent/30"
            >
              Start a conversation
            </a>
          </div>
        </section>
      </ScrollReveal>
    </motion.div>
  );
}