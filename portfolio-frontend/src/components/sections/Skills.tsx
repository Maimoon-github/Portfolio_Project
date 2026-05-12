// src/components/sections/Skills.tsx
import { StaggerList } from '@/components/animations/StaggerList';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { SkillCard } from '@/components/ui/SkillCard';
import { Brain, Server, Network, Workflow } from 'lucide-react';

const domains = [
  {
    icon: Brain,
    title: 'Data Science',
    description: 'Predictive modeling, causal inference, NLP pipelines, and experimental design.',
  },
  {
    icon: Server,
    title: 'MLOps',
    description: 'End-to-end model lifecycle: training, versioning, deployment, and monitoring at scale.',
  },
  {
    icon: Network,
    title: 'AI Agents',
    description: 'Multi-agent orchestration, tool-use, memory systems, and autonomous planning.',
  },
  {
    icon: Workflow,
    title: 'Agentic Workflows',
    description: 'Probabilistic planning, human-in-the-loop automation, and self-correcting pipelines.',
  },
];

export function Skills() {
  return (
    <section id="skills" className="py-section-gap px-gutter max-w-7xl mx-auto">
      <ScrollReveal>
        <h2 className="text-center text-h2 font-semibold mb-16">Core Expertise</h2>
      </ScrollReveal>
      <StaggerList stagger={0.12} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {domains.map((domain) => (
          <SkillCard key={domain.title} {...domain} />
        ))}
      </StaggerList>
    </section>
  );
}