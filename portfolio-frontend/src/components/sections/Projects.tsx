// src/components/sections/Projects.tsx
import { ProjectCard } from '@/components/ui/ProjectCard';

interface ProjectsProps {
  heading?: string;
  items?: any[]; // Replace with correct typing if available
}

export default function Projects({ heading, items = [] }: ProjectsProps) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {heading && <h2 className="col-span-full text-2xl font-bold">{heading}</h2>}
      {items.map((item) => (
        <ProjectCard
          key={item.id}
          id={item.id}
          slug={item.slug || item.id}
          title={item.title}
          shortDescription={item.shortDescription || item.description}
          technologies={item.technologies || item.tags?.map((t: string) => ({ name: t })) || []}
          demoUrl={item.demoUrl}
          githubUrl={item.githubUrl}
        />
      ))}
    </section>
  );
}