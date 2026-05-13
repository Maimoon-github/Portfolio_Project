// src/components/sections/Projects.tsx
import { ProjectCard } from '@/components/ui/ProjectCard';
import type { Project } from '@/types/project';

interface ProjectsProps {
  heading?: string;
  items?: Project[];
}

export default function Projects({ heading, items = [] }: ProjectsProps) {
  const getLinkUrl = (links: Project['links'], type: 'demo' | 'github') => {
    return links?.find(link => link.type === type)?.url;
  };

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {heading && <h2 className="col-span-full text-2xl font-bold">{heading}</h2>}
      {items.map((item, index) => (
        <ProjectCard
          key={item.id ?? item.slug ?? index}
          id={item.id}
          slug={item.slug}
          title={item.title}
          shortDescription={item.shortDescription}
          technologies={item.technologies}
          demoUrl={getLinkUrl(item.links, 'demo')}
          githubUrl={getLinkUrl(item.links, 'github')}
        />
      ))}
    </section>
  );
}