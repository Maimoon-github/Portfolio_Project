// src/components/sections/Projects.tsx
'use client';

import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { StaggerList } from '@/components/animations/StaggerList';
import { ProjectCard } from '@/components/ui/ProjectCard';

const projects = [
  {
    title: 'AutoMLOps',
    description:
      'End‑to‑end MLOps platform on Kubernetes with automated model training, versioning, and serving.',
    tags: ['Kubeflow', 'MLflow', 'Kubernetes'],
    href: '#',
  },
  {
    title: 'AgentVault',
    description:
      'Secure multi‑agent task delegation system using LangChain and gRPC for enterprise AI workflows.',
    tags: ['LangChain', 'gRPC', 'Redis'],
    href: '#',
  },
  {
    title: 'DataMosaic',
    description:
      'Real‑time anomaly detection engine processing millions of events per second with Apache Flink.',
    tags: ['Spark', 'Flink', 'Kafka'],
    href: '#',
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-section-gap px-gutter max-w-7xl mx-auto">
      <ScrollReveal>
        <h2 className="text-center text-h2 font-semibold mb-16">Selected Work</h2>
      </ScrollReveal>

      <StaggerList stagger={0.12} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </StaggerList>
    </section>
  );
}