// src/app/page.tsx
import type { Metadata } from 'next';
import { Suspense } from 'react';

import { ProjectCard }   from '@/components/portfolio/ProjectCard';
import { SkillSection }  from '@/components/portfolio/SkillSection';
import { Button }        from '@/components/ui/button';
import { cn }            from '@/lib/utils';

import { fetchFeaturedProjects, type Project } from '@/lib/api/portfolio';

// ── Static project fallbacks ──────────────────────────────────────────────────
const STATIC_PROJECTS: Project[] = [
  {
    slug:        'lotus-studio',
    title:       'Lotus Studio',
    description: 'Immersive 3D design system for digital sanctuaries.',
    thumbnail:   '/images/project-lotus.jpg',
    tech_tags:   ['Next.js', 'Three.js', 'Glassmorphism'],
  },
  {
    slug:        'ethereal-ai',
    title:       'Ethereal AI',
    description: 'Generative visual engine powered by mystical gradients.',
    thumbnail:   '/images/project-ai.jpg',
    tech_tags:   ['React', 'Tailwind', 'Motion'],
  },
  {
    slug:        'void-portfolio',
    title:       'Void Portfolio',
    description: 'Dark ethereal showcase platform for creative technologists.',
    thumbnail:   '/images/project-void.jpg',
    tech_tags:   ['TypeScript', 'Framer Motion'],
  },
];

// ── Metadata ──────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: 'Alex Reeves • Senior AI/ML Engineer',
  description:
    'Dark ethereal portfolio — sovereign architect of production-grade intelligence systems at scale.',
  openGraph: {
    title:       'Alex Reeves • Senior AI/ML Engineer',
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
    // API unavailable — page renders with static fallbacks, no user-facing error
  }

  const projects = featuredProjects.length > 0 ? featuredProjects : STATIC_PROJECTS;

  return (
    <>
      {/* ── HERO ────────────────────────────────────────────────────────────── */}
      <section
        className="relative min-h-screen flex items-center overflow-hidden bg-[var(--color-background)]"
        style={{ paddingBlock: 'var(--space-section)' }}
      >
        {/* Atmospheric noise */}
        <div className="bg-noise absolute inset-0 opacity-[0.03] pointer-events-none" aria-hidden="true" />

        {/* Radial glow — top left */}
        <div
          className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(95,45,166,0.15) 0%, transparent 65%)',
          }}
          aria-hidden="true"
        />

        <div className="w-full max-w-[1280px] mx-auto px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">

            {/* Pre-heading label */}
            <span className="type-label-caps text-[var(--color-neo-mint)] inline-block mb-6">
              Senior AI/ML Engineer
            </span>

            {/* Display headline */}
            <h1
              className={cn(
                'text-gradient-violet text-glow-primary mb-6',
                'font-bold leading-[1.1] tracking-[-0.02em]'
              )}
              style={{ fontSize: 'clamp(2.5rem, 7vw, var(--type-display-size))' }}
            >
              Mystical Black Lotus
            </h1>

            <p
              className={cn(
                'text-[var(--color-on-surface-variant)] mb-12 mx-auto',
                'text-xl md:text-2xl font-light leading-snug max-w-lg'
              )}
            >
              Emerging from the depths.
              <br />
              Where code becomes sanctuary.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button asChild className="btn-primary px-10 py-[1.125rem] text-[13px]">
                <a href="/portfolio">Explore the Portfolio</a>
              </Button>

              <Button asChild variant="ghost" className="btn-ghost px-10 py-[1.125rem] text-[13px]">
                <a href="/about">Enter the Sanctuary</a>
              </Button>
            </div>

            {/* Scroll indicator */}
            <div className="mt-24 flex justify-center" aria-hidden="true">
              <div className="flex flex-col items-center gap-2 text-[var(--color-on-surface-variant)]">
                <span className="type-label-caps">Scroll to descend</span>
                <div className="w-px h-12 bg-gradient-to-b from-transparent via-[var(--color-outline-variant)] to-transparent" />
              </div>
            </div>
          </div>
        </div>

        {/* Floating accent orb */}
        <div
          className="absolute bottom-12 right-12 hidden xl:block w-36 h-36 rounded-full"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(0,229,160,0.18) 0%, transparent 70%)',
            filter: 'blur(16px)',
            boxShadow: 'var(--shadow-glow-neo)',
          }}
          aria-hidden="true"
        />
      </section>

      {/* ── FEATURED PROJECTS ────────────────────────────────────────────────── */}
      <section
        className="bg-[var(--color-surface-container-low)]"
        style={{ paddingBlock: 'var(--space-section)' }}
      >
        <div className="w-full max-w-[1280px] mx-auto px-8">

          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="type-label-caps text-[var(--color-neo-mint)] block mb-2">
                Selected Work
              </span>
              <h2
                className="text-[var(--color-on-surface)] font-medium"
                style={{
                  fontSize:      'var(--type-h2-size)',
                  lineHeight:    'var(--type-h2-lh)',
                  letterSpacing: 'var(--type-h2-ls)',
                }}
              >
                Featured Works
              </h2>
            </div>

            <a
              href="/portfolio"
              className="btn-ghost inline-flex items-center gap-2 text-[11px] px-4 py-2 hover:scale-[1.02] transition-transform duration-[220ms]"
            >
              View all projects
              <span className="text-base leading-none">→</span>
            </a>
          </div>

          <Suspense
            fallback={
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-80 rounded-[var(--radius-xl)] animate-pulse bg-[var(--color-surface-container)]"
                  />
                ))}
              </div>
            }
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          </Suspense>
        </div>
      </section>

      {/* ── SKILLS ───────────────────────────────────────────────────────────── */}
      <section style={{ paddingBlock: 'var(--space-section)' }}>
        <div className="w-full max-w-[1280px] mx-auto px-8">
          <SkillSection />
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────────────────── */}
      <section
        className="bg-[var(--color-surface-container)]"
        style={{ paddingBlock: 'var(--space-section)' }}
      >
        <div className="w-full max-w-[1280px] mx-auto px-8">
          <div className="max-w-2xl mx-auto">
            <div className="card-glass p-12 text-center">
              <span className="type-label-caps text-[var(--color-neo-mint)] block mb-4">
                Let's Collaborate
              </span>
              <h3
                className={cn(
                  'text-gradient-violet font-semibold mb-6',
                )}
                style={{
                  fontSize:      'var(--type-h2-size)',
                  lineHeight:    'var(--type-h2-lh)',
                  letterSpacing: 'var(--type-h2-ls)',
                }}
              >
                Ready to build your own sanctuary?
              </h3>
              <p className="text-[var(--color-on-surface-variant)] mb-10 max-w-sm mx-auto leading-relaxed">
                Let's collaborate on something timeless.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild className="btn-primary px-12 py-[1.125rem] text-[13px]">
                  <a href="/contact">Begin the Journey</a>
                </Button>

                <Button asChild variant="ghost" className="btn-ghost px-12 py-[1.125rem] text-[13px]">
                  <a href="/tools">Discover the Tools</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}