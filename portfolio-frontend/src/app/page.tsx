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
    <main className="relative overflow-hidden bg-[var(--color-surface)]">
      {/* ── HERO ────────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center pt-32 pb-20">
        {/* Background Ethereal Glows */}
        <div className="absolute top-0 left-[-10%] w-[800px] h-[600px] bg-[var(--color-primary)] opacity-[0.08] blur-3xl rounded-full pointer-events-none" />
        <div className="absolute bottom-[10%] right-[-5%] w-[600px] h-[600px] bg-[var(--color-secondary)] opacity-[0.06] blur-3xl rounded-full pointer-events-none" />

        <div className="container relative z-10">
          <div className="max-w-3xl">
            {/* Overline */}
            <div className="mb-8 inline-block animate-reveal" style={{ animationDelay: '0ms' }}>
              <span className="px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase text-[var(--color-primary)] bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20">
                Senior AI Engineer
              </span>
            </div>

            {/* Headline with gradient */}
            <h1 className="text-[64px] md:text-[88px] font-bold leading-[1.1] tracking-[-0.02em] mb-12 animate-reveal" style={{ animationDelay: '100ms' }}>
              <span className="block mb-3 bg-gradient-to-b from-white via-[var(--color-primary)] to-[var(--color-primary)] bg-clip-text text-transparent">
                Engineering
              </span>
              <span className="block bg-gradient-to-b from-white via-[var(--color-primary)] to-[var(--color-primary)] bg-clip-text text-transparent">
                Agentic Systems
              </span>
            </h1>

            {/* Bio */}
            <p className="text-lg text-[var(--color-on-surface-variant)] leading-relaxed max-w-2xl mb-12 opacity-90 animate-reveal" style={{ animationDelay: '200ms' }}>
              Architecting high-dimensional intelligence at the intersection of precision mathematics and neural design. I specialize in crafting scalable AI solutions that transform complex data into autonomous, actionable agents.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 animate-reveal" style={{ animationDelay: '300ms' }}>
              <a href="/portfolio" className="inline-flex items-center justify-center px-8 py-3 bg-[var(--color-neo-mint)] text-black text-xs font-bold tracking-widest uppercase rounded-lg hover:bg-[var(--color-neo-mint)]/90 transition-colors">
                See My Work
              </a>
              <a href="/contact" className="inline-flex items-center justify-center px-8 py-3 border border-[var(--color-outline-variant)] text-[var(--color-on-surface)] text-xs font-bold tracking-widest uppercase rounded-lg hover:bg-[var(--color-surface-container)] transition-colors">
                Contact Me
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURED WORK ───────────────────────────────────────────────────── */}
      <section className="py-32 bg-[var(--color-surface)]" id="work">
        <div className="container">
          <div className="mb-20">
            <h2 className="text-4xl font-medium text-[var(--color-primary)] opacity-90">
              Featured Work
            </h2>
          </div>

          <Suspense fallback={<div className="grid grid-cols-1 md:grid-cols-2 gap-12 h-96 bg-[var(--color-surface-container)] rounded-xl animate-pulse" />}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
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
          <div className="max-w-3xl mx-auto bg-[var(--color-surface-container-low)] border border-[var(--color-outline-variant)]/30 rounded-2xl p-16 md:p-24 text-center">
            <span className="text-xs font-bold tracking-widest uppercase text-[var(--color-neo-mint)] block mb-6">Ready</span>
            <h2 className="text-4xl font-semibold text-[var(--color-on-surface)] mb-8">
              Let's build something extraordinary.
            </h2>
            <p className="text-base text-[var(--color-on-surface-variant)] mb-12 max-w-xl mx-auto opacity-80">
              Whether it's architecting AI systems, optimizing data pipelines, or pushing the boundaries of what's possible—I'm ready to collaborate.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="/contact" className="inline-flex items-center justify-center px-8 py-3 bg-[var(--color-neo-mint)] text-black text-xs font-bold tracking-widest uppercase rounded-lg hover:bg-[var(--color-neo-mint)]/90 transition-colors">
                Start a Conversation
              </a>
              <a href="/portfolio" className="inline-flex items-center justify-center px-8 py-3 border border-[var(--color-outline-variant)] text-[var(--color-on-surface)] text-xs font-bold tracking-widest uppercase rounded-lg hover:bg-[var(--color-surface-container)] transition-colors">
                Explore My Work
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
