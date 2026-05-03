// src/app/page.tsx
import type { Metadata } from 'next';
import { Suspense } from 'react';

import { ProjectCard }   from '@/components/portfolio/ProjectCard';
import { SkillHighlights } from '@/components/portfolio/SkillHighlights';
import { BlogTeaser } from '@/components/blog/BlogTeaser';
import { TypingEffect } from '@/components/ui/TypingEffect';
import { cn } from '@/lib/utils';

import { fetchFeaturedProjects, type Project } from '@/lib/api/portfolio';

// ── Static project fallbacks ──────────────────────────────────────────────────
const STATIC_PROJECTS: Project[] = [
  {
    slug:        'agentic-search',
    title:       'Agentic Search Engine',
    description: 'A sovereign search architect that reason through complex queries via multi-step reasoning chains.',
    thumbnail:   '/images/project-agent.jpg',
    tech_tags:   ['LangChain', 'LlamaIndex', 'Next.js'],
  },
  {
    slug:        'bio-latent-explorer',
    title:       'Bio-Latent Explorer',
    description: 'Visualizing high-dimensional protein embedding spaces for drug discovery pipelines.',
    thumbnail:   '/images/project-bio.jpg',
    tech_tags:   ['PyTorch', 'RDKit', 'Three.js'],
  },
  {
    slug:        'data-viz-monolith',
    title:       'Data Viz Monolith',
    description: 'Immersive real-time telemetry dashboard for high-frequency trading clusters.',
    thumbnail:   '/images/project-viz.jpg',
    tech_tags:   ['D3.js', 'WebSockets', 'Rust'],
  },
  {
    slug:        'gen-art-engine',
    title:       'Generative Art Engine',
    description: 'Neural style transfer system producing mystical aesthetics for digital sanctuaries.',
    thumbnail:   '/images/project-art.jpg',
    tech_tags:   ['TensorFlow', 'Python', 'React'],
  },
];

// ── Metadata ──────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: 'Alex Reeves • AI Engineer & Data Scientist',
  description:
    'Sovereign architect of production-grade intelligence systems. Where code becomes sanctuary.',
  openGraph: {
    title:       'Alex Reeves • AI Engineer & Data Scientist',
    description: 'Mystical Black Lotus design system. Where code becomes sanctuary.',
    images:      [{ url: '/images/og-default.png', width: 1200, height: 630 }],
  },
};

// ── Page ──────────────────────────────────────────────────────────────────────
export default async function HomePage() {
  let featuredProjects: Project[] = [];

  try {
    featuredProjects = await fetchFeaturedProjects();
  } catch {
    // API unavailable
  }

  const projects = featuredProjects.length > 0 ? (featuredProjects.length > 4 ? featuredProjects.slice(0, 4) : featuredProjects) : STATIC_PROJECTS;

  return (
    <main className="relative overflow-hidden">
      {/* ── HERO ────────────────────────────────────────────────────────────── */}
      <section
        className="relative min-h-[90vh] flex items-center pt-[64px]"
      >
        {/* Atmospheric noise */}
        <div className="bg-noise absolute inset-0 opacity-[0.04] pointer-events-none" aria-hidden="true" />

        <div className="container relative z-10 py-32 md:py-48">
          <div className="max-w-4xl">
            {/* Overline */}
            <span className="type-label-caps text-[var(--color-mid-purple)] block mb-6 animate-reveal">
              AI Engineer / Data Scientist
            </span>

            {/* Headline */}
            <h1 className="text-[var(--type-h1-size)] font-semibold text-[var(--color-on-surface)] leading-[1.1] tracking-[-0.02em] mb-8">
              <span className="block mb-2">Architecting</span>
              <TypingEffect 
                phrases={["Agentic Systems", "Bioinformatics Pipelines", "Data Visualizations"]}
                className="text-[var(--color-primary)] text-glow-primary h-[1.1em]"
              />
            </h1>

            {/* Bio */}
            <p className="text-[var(--type-body-lg-size)] text-[var(--color-on-surface-variant)] leading-relaxed max-w-[65ch] mb-12">
              Building sovereign intelligence systems where precision meets ethereal aesthetics. 
              Specializing in LLM orchestration, molecular latent spaces, and production-grade 
              AI infrastructure for the next era of discovery.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <a href="/portfolio" className="btn btn-primary">
                See My Work
              </a>
              <a href="/contact" className="btn btn-ghost">
                Contact Me
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURED PROJECTS ────────────────────────────────────────────────── */}
      <section className="py-20 md:py-40 bg-[var(--color-surface-container-low)]" id="work">
        <div className="container">
          <div className="mb-16">
            <h2 className="text-[var(--type-h2-size)] font-medium text-gradient-violet inline-block">
              Featured Work
            </h2>
          </div>

          <Suspense fallback={<div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-96 bg-[var(--color-surface-container)] rounded-xl animate-pulse" />}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          </Suspense>

          <div className="mt-16 flex justify-center">
            <a href="/portfolio" className="text-[var(--color-primary)] hover:underline type-label-caps text-[11px] flex items-center gap-2">
              View all projects <span>→</span>
            </a>
          </div>
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