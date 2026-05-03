// src/app/page.tsx
import type { Metadata } from 'next';
import { Suspense } from 'react';

import { ProjectCard }   from '@/components/portfolio/ProjectCard';
import { SkillHighlights } from '@/components/portfolio/SkillHighlights';
import { BlogTeaser } from '@/components/blog/BlogTeaser';
import { TypingEffect } from '@/components/ui/TypingEffect';
import { cn } from '@/lib/utils';

import { fetchProject } from '@/lib/api/portfolio';
import type { Project } from '@/types/api';

// ── Static project fallbacks (Updated to match screen.png) ───────────────────
const STATIC_PROJECTS: Project[] = [
  {
    slug:        'cogito-framework',
    title:       'Cogito: Agentic Framework',
    description: 'An autonomous multi-agent system for real-time market analysis and automated hedging strategies.',
    thumbnail:   '/images/project-agent.jpg',
    tech_tags:   ['Python', 'LangChain'],
  },
  {
    slug:        'molecular-discovery',
    title:       'Molecular Discovery Engine',
    description: 'Deep generative models for accelerating small-molecule synthesis in neuro-pharmacology.',
    thumbnail:   '/images/project-bio.jpg',
    tech_tags:   ['Torch', 'RDKit'],
  },
  {
    slug:        'global-data-fabric',
    title:       'Global Data Fabric',
    description: 'Architecting petabyte-scale data lakes with integrated zero-trust security layers for fintech.',
    thumbnail:   '/images/project-viz.jpg',
    tech_tags:   ['AWS', 'Kubernetes'],
  },
  {
    slug:        'quantum-neural-hybrid',
    title:       'Quantum Neural Hybrid',
    description: 'Research into hybrid algorithms combining classical deep learning with quantum gate circuits.',
    thumbnail:   '/images/project-art.jpg',
    tech_tags:   ['Cirq', 'TensorFlow'],
  },
];

// ── Metadata ──────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: 'Aether.AI • Engineering Agentic Systems',
  description:
    'Sovereign architect of production-grade intelligence systems. Where code becomes sanctuary.',
  openGraph: {
    title:       'Aether.AI • Engineering Agentic Systems',
    description: 'Precision Mathematics and Neural Design.',
    images:      [{ url: '/images/og-default.png', width: 1200, height: 630 }],
  },
};

// ── Page ──────────────────────────────────────────────────────────────────────
export default async function HomePage() {
  let featuredProjects: Project[] = [];

  try {
    const response = await fetchProject.featured();
    featuredProjects = response.results;
  } catch {
    // API unavailable
  }

  const projects = featuredProjects.length > 0 ? (featuredProjects.length > 4 ? featuredProjects.slice(0, 4) : featuredProjects) : STATIC_PROJECTS;

  return (
    <main className="relative overflow-hidden">
      {/* ── HERO ────────────────────────────────────────────────────────────── */}
      <section
        className="relative min-h-screen flex items-center pt-[64px]"
      >
        {/* Background Ethereal Glows */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[var(--color-primary)] opacity-[0.08] blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[20%] right-[-5%] w-[40%] h-[40%] bg-[var(--color-secondary)] opacity-[0.05] blur-[100px] rounded-full pointer-events-none" />
        
        {/* Atmospheric noise */}
        <div className="bg-noise absolute inset-0 opacity-[0.04] pointer-events-none" aria-hidden="true" />

        <div className="container relative z-10 py-20">
          <div className="max-w-3xl text-left">
            {/* Overline */}
            <span className="type-label-caps text-[var(--color-primary)] opacity-80 block mb-6 animate-reveal">
              Senior AI Engineer
            </span>

            {/* Headline */}
            <h1 className="text-[var(--type-display-size)] font-bold text-[var(--color-on-surface)] leading-[1.05] tracking-[-0.03em] mb-10">
              <span className="block mb-2 text-glow-primary animate-reveal" style={{ animationDelay: '100ms' }}>Engineering</span>
              <span className="block text-glow-primary animate-reveal" style={{ animationDelay: '300ms' }}>Agentic Systems</span>
            </h1>

            {/* Bio */}
            <p className="text-[var(--type-body-lg-size)] text-[var(--color-on-surface-variant)] leading-relaxed max-w-[60ch] mb-12 opacity-90 animate-reveal" style={{ animationDelay: '500ms' }}>
              Architecting high-dimensional intelligence at the intersection of precision 
              mathematics and neural design. I specialize in crafting scalable AI solutions 
              that transform complex data into autonomous, actionable agents.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-5 animate-reveal" style={{ animationDelay: '700ms' }}>
              <a href="/portfolio" className="btn btn-primary px-8 py-4 text-[12px] tracking-[0.15em]">
                SEE MY WORK
              </a>
              <a href="/contact" className="btn btn-ghost px-8 py-4 text-[12px] tracking-[0.15em]">
                CONTACT ME
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURED WORK ───────────────────────────────────────────────────── */}
      <section className="py-24 bg-[var(--color-surface)]" id="work">
        <div className="container">
          <div className="mb-20">
            <h2 className="text-[var(--type-h2-size)] font-medium text-[var(--color-primary)] opacity-90">
              Featured Work
            </h2>
          </div>

          <Suspense fallback={<div className="grid grid-cols-1 md:grid-cols-2 gap-10 h-96 bg-[var(--color-surface-container)] rounded-xl animate-pulse" />}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
              {projects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          </Suspense>
        </div>
      </section>

      {/* ── SKILLS ───────────────────────────────────────────────────────────── */}
      <div id="skills">
        <SkillHighlights />
      </div>

      {/* ── BLOG/TOOL TEASER ─────────────────────────────────────────────────── */}
      <BlogTeaser />

      {/* ── FINAL CTA ────────────────────────────────────────────────────────── */}
      <section className="py-40 bg-[var(--color-surface)]">
        <div className="container">
          <div className="max-w-4xl mx-auto card p-12 md:p-20 text-center">
             <span className="type-label-caps text-[var(--color-neo-mint)] block mb-6">Inquiry</span>
             <h2 className="text-[var(--type-h2-size)] font-medium text-[var(--color-on-surface)] mb-8">
               Ready to architect the future?
             </h2>
             <p className="text-[var(--type-body-md-size)] text-[var(--color-on-surface-variant)] mb-12 max-w-md mx-auto">
               Whether it's a bioinformatics pipeline or an agentic system, let's build something that lasts.
             </p>
             <div className="flex justify-center gap-4">
               <a href="/contact" className="btn btn-primary">Start a Project</a>
               <a href="/about" className="btn btn-ghost">Learn More</a>
             </div>
          </div>
        </div>
      </section>
    </main>
  );
}