'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ProjectCard } from '@/app/components/shared/ProjectCard';
import type { Project } from '@/app/types/api';

interface FeaturedProjectsProps {
  projects: Project[];
}

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  return (
    <section className="py-24 bg-black">
      <div className="section-container">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
          <div>
            <div className="eyebrow-label mb-2">Work</div>
            <h2 className="text-[clamp(1.5rem,3vw,1.85rem)] font-bold text-on-background">Featured Work</h2>
          </div>
          <Link href="/projects" className="hidden sm:flex items-center gap-1 text-sm text-outline hover:text-accent transition-colors">
            All Projects <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} featured />
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link href="/projects" className="text-sm text-accent">View all projects →</Link>
        </div>
      </div>
    </section>
  );
}