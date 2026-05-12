// src/components/sections/Projects.tsx
'use client';

import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { StaggerList } from '@/components/animations/StaggerList';
import { ProjectCard } from '@/components/ui/ProjectCard';
import type { Project } from '@/lib/data';

interface ProjectsProps {
  heading: string;
  items: Project[];
}

export default function Projects({ heading, items }: ProjectsProps) {
  return (
    <section id="projects" className="py-section-gap px-gutter max-w-7xl mx-auto">
      <ScrollReveal>
        <h2 className="text-center text-h2 font-semibold mb-16">{heading}</h2>
      </ScrollReveal>

      <StaggerList stagger={0.12} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </StaggerList>
    </section>
  );
}