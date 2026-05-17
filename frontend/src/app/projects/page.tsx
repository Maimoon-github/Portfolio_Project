'use client';

import { getProjects } from '@/services/api';
import { ProjectsGrid } from '@/components/sections/ProjectsGrid';
import { Project } from '@/app/types/api';

export const metadata = {
  title: 'Projects',
  description:
    'A selection of work in agentic AI systems, MLOps infrastructure, data engineering, and full-stack AI applications.',
};

interface PageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function ProjectsPage({ searchParams }: PageProps) {
  const { category } = await searchParams;
  const activeCategory = category && category !== 'All' ? category : 'All';

  let projects: Project[] = [];
  let error = false;

  try {
    const data = await getProjects(activeCategory === 'All' ? undefined : activeCategory);
    projects = data.results || data;
  } catch (err) {
    error = true;
  }

  return (
    <div className="min-h-screen pt-24 pb-20 bg-[#0A110C]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <span className="text-xs uppercase tracking-widest text-[#A4FBCC] font-mono">
            Portfolio
          </span>
          <h1 className="mt-2 mb-3 text-[clamp(1.8rem,4vw,3rem)] font-bold text-white leading-tight">
            Projects
          </h1>
          <p className="max-w-xl text-sm leading-relaxed text-[#B0C4B0]">
            A selection of my work in agentic AI systems, MLOps infrastructure,
            data engineering, and full‑stack AI applications.
          </p>
        </div>

        {error ? (
          <div className="text-center py-20">
            <p className="text-red-400">Failed to load projects. Please try again later.</p>
          </div>
        ) : (
          <ProjectsGrid projects={projects} activeCategory={activeCategory} />
        )}
      </div>
    </div>
  );
}