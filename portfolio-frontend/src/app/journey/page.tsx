// src/app/journey/page.tsx
'use client';

import { motion, useInView, type Variants } from 'framer-motion';
import { useRef } from 'react';
import { CanvasWrapper } from '@/components/3d/core/CanvasWrapper';
import { Scene } from '@/components/3d/core/Scene';
import { CameraRig } from '@/components/3d/core/CameraRig';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { StaggerList } from '@/components/animations/StaggerList';
import { NeuralNetwork } from '@/components/3d/elements/NeuralNetwork';
import { journeyData } from '@/lib/data';

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

export default function JourneyPage() {
  const timelineSectionRef = useRef<HTMLElement>(null);
  const isTimelineInView = useInView(timelineSectionRef, { once: true, margin: '-100px' });

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-section-gap"
    >
      {/* Hero Section with 3D Neural Network */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden rounded-2xl glass">
        <div className="absolute inset-0 z-0 opacity-30">
          <CanvasWrapper>
            <Scene ambientIntensity={0.3}>
              <CameraRig
                enableOrbit={false}
                autoRotate
                autoRotateSpeed={0.5}
                cameraPosition={[0, 1, 7]}
                enableZoom={false}
                enablePan={false}
              />
              <NeuralNetwork nodeCount={60} radius={3.5} connectionDistance={2.0} nodeSize={0.09} />
            </Scene>
          </CanvasWrapper>
        </div>

        <div className="relative z-10 max-w-4xl px-6 text-center">
          <motion.h1
            variants={itemVariants}
            className="text-h1 md:text-display font-bold bg-gradient-to-r from-primary-light via-primary to-accent bg-clip-text text-transparent mb-4"
          >
            {journeyData.introTitle}
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-body-lg text-on-background/70 max-w-2xl mx-auto"
          >
            {journeyData.introDescription}
          </motion.p>
        </div>
      </section>

      {/* Role Matrix — Comparing Key AI Roles */}
      <ScrollReveal>
        <section className="space-y-8">
          <h2 className="text-center text-h2 font-semibold">AI Roles Compared</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {journeyData.roleMatrix.map((role) => (
              <div
                key={role.title}
                className="glass-card p-6 hover:shadow-[0_0_16px_var(--color-primary)] transition-all duration-300"
              >
                <div className="text-4xl mb-4">{role.icon}</div>
                <h3 className="text-h3 font-bold text-primary-light mb-1">{role.title}</h3>
                <p className="text-xs font-mono text-accent mb-3">{role.role}</p>
                <p className="text-sm text-on-background/70 leading-relaxed mb-4">{role.focus}</p>
                <div className="flex flex-wrap gap-2">
                  {role.keySkills.slice(0, 3).map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-1 text-[10px] font-mono border border-outline-variant/50 rounded-sm text-on-background/60"
                    >
                      {skill}
                    </span>
                  ))}
                  {role.keySkills.length > 3 && (
                    <span className="px-2 py-1 text-[10px] font-mono text-outline">
                      +{role.keySkills.length - 3}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Seniority Progression — Career Levels Grid */}
      <ScrollReveal>
        <section className="space-y-8">
          <h2 className="text-center text-h2 font-semibold">Seniority Progression</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {journeyData.seniorityLevels.map((level) => (
              <div
                key={level.level}
                className="glass-card p-5 text-center hover:shadow-[0_0_12px_var(--color-primary)] transition-all duration-300"
              >
                <div className="text-3xl mb-3">{level.icon}</div>
                <h3 className="text-h3 font-semibold text-primary-light">{level.level}</h3>
                <p className="text-sm font-mono text-accent mb-2">{level.title}</p>
                <p className="text-xs text-on-background/50 mb-3">
                  {level.yearsMin}–{level.yearsMax} years
                </p>
                <p className="text-xs text-on-background/70 leading-relaxed mb-3">{level.coreFocus}</p>
                <div className="flex flex-wrap justify-center gap-1">
                  {level.technologies.slice(0, 2).map((tech) => (
                    <span
                      key={tech}
                      className="px-1.5 py-0.5 text-[10px] font-mono border border-outline-variant/40 rounded-sm text-on-background/60"
                    >
                      {tech}
                    </span>
                  ))}
                  {level.technologies.length > 2 && (
                    <span className="px-1.5 py-0.5 text-[10px] text-outline">
                      +{level.technologies.length - 2}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Career Timeline — Personal Milestones */}
      <ScrollReveal>
        <section ref={timelineSectionRef}>
          <h2 className="text-center text-h2 font-semibold mb-12">My Career Milestones</h2>
          <div className="space-y-12 relative before:absolute before:left-3 md:before:left-1/2 before:w-0.5 before:h-full before:bg-primary/30">
            {journeyData.careerMilestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                animate={isTimelineInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className={`relative flex flex-col md:flex-row items-start gap-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                <div className="w-full md:w-5/12">
                  {index % 2 === 0 ? <div className="hidden md:block" /> : <div className="w-full" />}
                </div>
                <div
                  className={`absolute left-0 md:left-1/2 w-6 h-6 rounded-full bg-primary shadow-[0_0_12px_var(--color-primary)] transform -translate-x-1/2 flex items-center justify-center text-xs`}
                >
                  {milestone.icon}
                </div>
                <div className="w-full md:w-5/12 glass-card p-5">
                  <div className="text-primary-light font-mono text-sm mb-1">{milestone.year}</div>
                  <h3 className="text-h3 font-semibold text-on-background mb-1">{milestone.title}</h3>
                  <p className="text-sm text-accent mb-2">{milestone.organization}</p>
                  <p className="text-sm text-on-background/70 leading-relaxed mb-3">{milestone.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {milestone.skillsGained.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-1 text-[11px] font-mono border border-outline-variant/50 rounded-full text-on-background/60"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Essential Skills Reference — Multi‑column Layout */}
      <ScrollReveal>
        <section className="space-y-8">
          <h2 className="text-center text-h2 font-semibold">Essential Skills for the Journey</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {journeyData.essentialSkills.map((category) => (
              <div key={category.category} className="glass-card p-5 hover:shadow-[0_0_12px_var(--color-primary)] transition-all duration-300">
                <h3 className="text-lg font-semibold text-primary-light mb-3">{category.category}</h3>
                <ul className="space-y-1.5">
                  {category.skills.map((skill) => (
                    <li key={skill} className="text-sm text-on-background/70 flex items-start gap-2">
                      <span className="text-accent select-none">▹</span>
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Learning Resources — Recommended Materials */}
      <ScrollReveal>
        <section className="space-y-6">
          <h2 className="text-center text-h2 font-semibold">Curated Learning Resources</h2>
          <p className="text-center text-on-background/60 max-w-2xl mx-auto">
            A carefully selected set of resources that have guided my journey — from foundational to advanced.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {journeyData.learningResources.map((resource) => {
              let badgeColor = 'bg-primary/20 text-primary-light';
              if (resource.type === 'book') {
                badgeColor = 'bg-tertiary/20 text-tertiary-light';
              } else if (resource.type === 'certification') {
                badgeColor = 'bg-accent/20 text-accent';
              } else if (resource.type === 'platform') {
                badgeColor = 'bg-secondary/20 text-secondary-light';
              }
              return (
                <div
                  key={resource.name}
                  className="glass-card p-5 hover:shadow-[0_0_12px_var(--color-primary)] transition-all duration-300"
                >
                  <div className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono ${badgeColor} mb-2`}>
                    {resource.type.toUpperCase()}
                  </div>
                  <h3 className="text-md font-semibold text-on-background mb-1 leading-tight">{resource.name}</h3>
                  {resource.description && (
                    <p className="text-xs text-on-background/60 mt-2 line-clamp-2">{resource.description}</p>
                  )}
                  <div className="flex flex-wrap gap-1 mt-3">
                    {resource.skillsTargeted.slice(0, 2).map((skill) => (
                      <span
                        key={skill}
                        className="px-1.5 py-0.5 text-[9px] font-mono border border-outline-variant/40 rounded-sm text-on-background/50"
                      >
                        {skill}
                      </span>
                    ))}
                    {resource.skillsTargeted.length > 2 && (
                      <span className="px-1.5 py-0.5 text-[9px] text-outline">+{resource.skillsTargeted.length - 2}</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </ScrollReveal>

      {/* Call to Action */}
      <ScrollReveal>
        <section className="relative overflow-hidden rounded-2xl glass p-10 text-center">
          <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-primary to-accent" />
          <div className="relative z-10">
            <h2 className="text-h2 font-semibold mb-4">Start Your Journey</h2>
            <p className="text-body-lg text-on-background/70 max-w-2xl mx-auto mb-8">
              Whether you’re just starting or aiming for an architect role, the path is built through curiosity, consistent learning, and real-world projects.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center rounded-lg bg-accent px-8 py-3 font-semibold text-background transition-all hover:scale-105 hover:shadow-lg hover:shadow-accent/30"
            >
              Let’s Connect
            </a>
          </div>
        </section>
      </ScrollReveal>
    </motion.div>
  );
}