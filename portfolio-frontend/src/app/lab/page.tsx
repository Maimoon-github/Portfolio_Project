// src/app/lab/page.tsx
'use client';

import { motion, useInView, type Variants } from 'framer-motion';
import { useRef, useState, lazy, Suspense } from 'react';
import { CanvasWrapper } from '@/components/3d/core/CanvasWrapper';
import { Scene } from '@/components/3d/core/Scene';
import { CameraRig } from '@/components/3d/core/CameraRig';
import { ParticleField } from '@/components/3d/elements/ParticleField';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { StaggerList } from '@/components/animations/StaggerList';
import { labData } from '@/lib/data';
import { cn } from '@/lib/utils';

const AgenticGraph = lazy(() =>
  import('@/components/3d/elements/AgenticGraph').then((mod) => ({
    default: mod.AgenticGraph,
  }))
);

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

interface ExperimentCardProps {
  experiment: typeof labData.experiments[0];
  index: number;
}

function ExperimentCard({ experiment, index }: ExperimentCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const statusColors: Record<string, string> = {
    active: 'bg-accent/20 text-accent',
    'coming-soon': 'bg-primary/20 text-primary-light',
    experimental: 'bg-secondary/20 text-secondary-light',
  };

  const statusLabels: Record<string, string> = {
    active: 'Live Demo',
    'coming-soon': 'Coming Soon',
    experimental: 'Experimental',
  };

  return (
    <motion.div
      variants={itemVariants}
      custom={index}
      className="glass-card overflow-hidden group hover:shadow-[0_0_20px_var(--color-primary)] transition-all duration-500"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-48 overflow-hidden bg-surface-container">
        <div className="w-full h-full flex items-center justify-center text-6xl transition-transform duration-700 group-hover:scale-110">
          {experiment.icon}
        </div>
        <div
          className={cn(
            'absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 transition-opacity duration-300',
            isHovered && 'opacity-100'
          )}
        />
        <div className="absolute top-3 right-3">
          <span
            className={cn(
              'px-2 py-1 rounded-full text-[10px] font-mono font-medium',
              statusColors[experiment.status]
            )}
          >
            {statusLabels[experiment.status]}
          </span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-h3 font-semibold text-primary-light mb-2 group-hover:text-accent transition-colors">
          {experiment.title}
        </h3>
        <p className="text-sm text-on-background/70 leading-relaxed mb-4">
          {experiment.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {experiment.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-[10px] font-mono border border-outline-variant/40 rounded-sm text-on-background/50"
            >
              {tag}
            </span>
          ))}
          {experiment.tags.length > 3 && (
            <span className="px-2 py-1 text-[10px] font-mono text-outline">
              +{experiment.tags.length - 3}
            </span>
          )}
        </div>
        <a
          href={experiment.demoUrl || `#`}
          className={cn(
            'inline-flex items-center gap-2 text-sm font-medium transition-all',
            experiment.status === 'active'
              ? 'text-accent hover:text-primary-light hover:gap-3'
              : 'text-outline-variant cursor-not-allowed'
          )}
          onClick={(e) => experiment.status !== 'active' && e.preventDefault()}
        >
          {experiment.status === 'active' ? 'Launch Experiment →' : 'Preview Unavailable'}
        </a>
      </div>
    </motion.div>
  );
}

export default function LabPage() {
  const heroSectionRef = useRef<HTMLElement>(null);
  const isHeroInView = useInView(heroSectionRef, { once: true, margin: '-100px' });

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-section-gap"
    >
      {/* Hero Section with 3D Particle Field */}
      <section ref={heroSectionRef} className="relative min-h-[60vh] flex items-center justify-center overflow-hidden rounded-2xl glass">
        <div className="absolute inset-0 z-0">
          <CanvasWrapper>
            <Scene ambientIntensity={0.3}>
              <CameraRig
                enableOrbit={false}
                autoRotate
                autoRotateSpeed={0.4}
                cameraPosition={[0, 2, 10]}
                enableZoom={false}
                enablePan={false}
              />
              <ParticleField />
            </Scene>
          </CanvasWrapper>
        </div>

        <div className="relative z-10 max-w-4xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <span className="inline-block px-4 py-2 glass-card text-xs font-mono tracking-wider text-primary-light mb-6">
              EXPERIMENTAL ZONE
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-h1 md:text-display font-bold bg-gradient-to-r from-primary-light via-primary to-accent bg-clip-text text-transparent mb-4"
          >
            {labData.introTitle}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-body-lg text-on-background/70 max-w-2xl mx-auto"
          >
            {labData.introDescription}
          </motion.p>
        </div>
      </section>

      {/* Experiments Grid */}
      <ScrollReveal>
        <section>
          <h2 className="text-center text-h2 font-semibold mb-12">Active Experiments</h2>
          <StaggerList stagger={0.08} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {labData.experiments.map((experiment, idx) => (
              <ExperimentCard key={experiment.id} experiment={experiment} index={idx} />
            ))}
          </StaggerList>
        </section>
      </ScrollReveal>

      {/* Featured Experiment — Agentic Workflow Visualizer */}
      <ScrollReveal>
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="text-h2 font-semibold mb-4">Featured: Agentic Workflow Visualizer</h2>
            <p className="text-body-md text-on-background/60 max-w-2xl mx-auto">
              A 3D visualisation of how multi‑agent systems reason and collaborate. Nodes represent intentions and decisions — edges show the flow between workflow components in real time.
            </p>
          </div>
          <div className="relative h-[500px] w-full rounded-2xl overflow-hidden glass">
            <Suspense
              fallback={
                <div className="w-full h-full flex items-center justify-center bg-surface-container">
                  <div className="animate-pulse text-primary-light">Loading 3D Scene...</div>
                </div>
              }
            >
              <CanvasWrapper>
                <Scene ambientIntensity={0.4}>
                  <CameraRig
                    enableOrbit
                    autoRotate
                    autoRotateSpeed={0.6}
                    cameraPosition={[0, 2, 12]}
                    enableZoom
                    enablePan
                  />
                  <AgenticGraph nodeCount={18} linkCount={28} />
                </Scene>
              </CanvasWrapper>
            </Suspense>
          </div>
        </section>
      </ScrollReveal>

      {/* Technology Stack Highlights */}
      <ScrollReveal>
        <section className="relative overflow-hidden rounded-2xl glass p-10 text-center">
          <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-primary to-accent" />
          <div className="relative z-10">
            <h2 className="text-h2 font-semibold mb-6">Powered By</h2>
            <div className="flex flex-wrap justify-center gap-6">
              {labData.techHighlights.map((tech) => (
                <div key={tech.label} className="text-center">
                  <div className="text-3xl font-bold text-primary-light">{tech.count}</div>
                  <div className="text-xs font-mono text-on-background/50 mt-1">{tech.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Call to Action */}
      <ScrollReveal>
        <section className="relative overflow-hidden rounded-2xl glass p-10 text-center">
          <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-primary to-accent" />
          <div className="relative z-10">
            <h2 className="text-h2 font-semibold mb-4">Contribute or Collaborate</h2>
            <p className="text-body-lg text-on-background/70 max-w-2xl mx-auto mb-8">
              Have an idea for an experiment? I’m always open to collaboration — let’s build something extraordinary together.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center rounded-lg bg-accent px-8 py-3 font-semibold text-background transition-all hover:scale-105 hover:shadow-lg hover:shadow-accent/30"
            >
              Get in Touch
            </a>
          </div>
        </section>
      </ScrollReveal>
    </motion.div>
  );
}