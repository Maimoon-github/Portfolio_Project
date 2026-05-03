// src/app/portfolio/page.tsx
import { Suspense } from 'react';
import { Metadata } from 'next';
import { ProjectCard } from '@/components/portfolio/ProjectCard';
import { fetchProject } from '@/lib/api/portfolio';
import { Project } from '@/types/api';

export const metadata: Metadata = {
  title: 'Portfolio • Selected Works',
  description: 'Architecture meets aesthetic utility. A collection of production-grade intelligence systems.',
};

export default async function PortfolioPage() {
  let projects: Project[] = [];
  try {
    const response = await fetchProject.list();
    projects = response.results;
  } catch (error) {
    console.error('Failed to fetch projects:', error);
  }

  return (
    <main className="min-h-screen pt-[120px] pb-24">
      <div className="container">
        <header className="max-w-4xl mb-20 animate-reveal">
          <div className="inline-block px-4 py-1 mb-6 bg-white/5 backdrop-blur-md border border-primary/20 rounded-full text-primary text-[10px] font-bold tracking-[0.2em] uppercase">
            Sovereign Collection
          </div>
          <h1 className="text-[var(--type-display-size)] font-bold text-on-surface leading-[1.1] tracking-[-0.02em] mb-8">
            Portfolio
          </h1>
          <p className="text-[var(--type-body-lg-size)] text-on-surface-variant max-w-[65ch] leading-relaxed">
            A curated selection of autonomous systems, neural architectures, and high-performance 
            digital environments. Each project represents a synthesis of precision engineering 
            and atmospheric design.
          </p>
        </header>

        <Suspense fallback={<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse bg-surface-container-low h-[600px] rounded-xl" />}>
          {projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {projects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          ) : (
            <div className="text-center py-32 border border-dashed border-outline-variant rounded-xl bg-surface-container-lowest">
              <p className="text-on-surface-variant">The archive is being updated. Check back soon for new case studies.</p>
            </div>
          )}
        </Suspense>
      </div>
    </main>
  );
}