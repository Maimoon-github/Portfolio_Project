// src/app/about/page.tsx
'use client';

import { motion, useInView, type Variants } from 'framer-motion';
import { useRef } from 'react';
import { CanvasWrapper } from '@/components/3d/core/CanvasWrapper';
import { Scene } from '@/components/3d/core/Scene';
import { CameraRig } from '@/components/3d/core/CameraRig';
import { HolographicOrb } from '@/components/3d/elements/HolographicOrb';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { StaggerList } from '@/components/animations/StaggerList';
import { aboutData } from '@/lib/data';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function AboutPage() {
  const timelineSectionRef = useRef<HTMLElement>(null);
  const techSectionRef = useRef<HTMLElement>(null);

  // Intersection observation for timeline
  const isTimelineInView = useInView(timelineSectionRef, { once: true, margin: '-100px' });
  const isTechInView = useInView(techSectionRef, { once: true, margin: '-100px' });

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-section-gap"
    >
      {/* ----- HERO SECTION with 3D Scene ----- */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden rounded-2xl glass">
        <div className="absolute inset-0 z-0">
          <CanvasWrapper>
            <Scene ambientIntensity={0.3}>
              <CameraRig
                enableOrbit={false}
                autoRotate
                autoRotateSpeed={0.6}
                cameraPosition={[0, 0.5, 6]}
                enableZoom={false}
                enablePan={false}
              />
              <HolographicOrb radius={1.0} ringRadius={1.25} />
            </Scene>
          </CanvasWrapper>
        </div>

        <div className="relative z-10 max-w-4xl px-6 text-center">
          <motion.h1
            variants={itemVariants}
            className="text-h1 md:text-display font-bold bg-gradient-to-r from-primary-light via-primary to-accent bg-clip-text text-transparent mb-4"
          >
            {aboutData.introTitle}
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-body-lg text-on-background/70 max-w-2xl mx-auto"
          >
            {aboutData.introDescription}
          </motion.p>
        </div>
      </section>

      {/* ----- JOURNEY TIMELINE ----- */}
      <ScrollReveal>
        <section ref={timelineSectionRef} className="grid grid-cols-1 lg:grid-cols-12 gap-12 px-gutter">
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-h2 font-semibold">Evolution of an AI Architect</h2>
            <p className="text-on-background/70">
              From foundational data science to orchestrating multi-agent systems — each phase
              sharpened my perspective on building resilient, autonomous intelligence.
            </p>
          </div>
          <div className="lg:col-span-7">
            <div className="space-y-8 border-l-2 border-primary/30 pl-8">
              {aboutData.journeyTimeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isTimelineInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="relative"
                >
                  <div className="absolute -left-[41px] top-1 w-3 h-3 rounded-full bg-primary shadow-[0_0_8px_var(--color-primary)]" />
                  <h3 className="text-h3 font-mono text-primary-light mb-1">{item.year}</h3>
                  <h4 className="text-body-lg font-semibold text-on-background">{item.title}</h4>
                  <p className="text-on-background/60">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ----- TECHNOLOGY STACK / SKILLS MATRIX ----- */}
      <ScrollReveal>
        <section ref={techSectionRef} className="px-gutter">
          <h2 className="text-center text-h2 font-semibold mb-12">Technology Stack & Competencies</h2>
          <StaggerList stagger={0.08} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {aboutData.technologies.map((tech) => (
              <motion.div
                key={tech.name}
                variants={itemVariants}
                className="glass-card p-5 text-center hover:shadow-[0_0_16px_var(--color-primary)] transition-shadow duration-300"
              >
                <h3 className="text-h3 font-semibold text-primary-light">{tech.name}</h3>
                <div className="mt-2 flex justify-center gap-2 text-sm font-mono">
                  <span className="capitalize text-on-background/80">{tech.level}</span>
                  <span className="text-outline">•</span>
                  <span className="text-on-background/80">{tech.years}+ yrs</span>
                </div>
              </motion.div>
            ))}
          </StaggerList>
        </section>
      </ScrollReveal>

      {/* ----- HONOURS & RECOGNITION ----- */}
      <ScrollReveal>
        <section className="px-gutter">
          <div className="glass-card p-8 text-center max-w-3xl mx-auto">
            <h2 className="text-h3 font-semibold mb-6">Honours & Recognition</h2>
            <ul className="space-y-4">
              {aboutData.recognitions.map((recog) => (
                <li key={recog.title} className="flex flex-wrap justify-between items-center border-b border-outline-variant/30 pb-3 last:border-0">
                  <span className="font-medium text-on-background">{recog.title}</span>
                  <span className="text-sm font-mono text-on-background/50">{recog.issuer}</span>
                  <span className="text-sm text-primary-light font-mono">{recog.year}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </ScrollReveal>

      {/* ----- PHILOSOPHY CALLOUT ----- */}
      <ScrollReveal>
        <section className="px-gutter">
          <div className="relative overflow-hidden rounded-2xl glass p-10 text-center">
            <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-primary to-accent" />
            <div className="relative z-10">
              <h2 className="text-h2 font-semibold mb-6">My Core Philosophy</h2>
              <p className="text-body-lg italic text-on-background/80 max-w-2xl mx-auto mb-8">
                “{aboutData.headlineQuote}”
              </p>
              <cite className="text-primary-light not-italic tracking-wide">{aboutData.headlineAuthor}</cite>
              <div className="mt-10 flex flex-wrap justify-center gap-3">
                {aboutData.corePhilosophy.map((tenet) => (
                  <span
                    key={tenet}
                    className="px-4 py-2 glass rounded-full text-sm font-mono text-on-background/70"
                  >
                    {tenet}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </motion.div>
  );
}