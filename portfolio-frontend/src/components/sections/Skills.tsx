// src/components/sections/Skills.tsx
'use client';

import { StaggerList } from '@/components/animations/StaggerList';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { SkillCard } from '@/components/ui/SkillCard';
import type { Skill } from '@/lib/data';

interface SkillsProps {
  heading: string;
  items: Skill[];
}

export default function Skills({ heading, items }: SkillsProps) {
  return (
    <section id="skills" className="py-section-gap px-gutter max-w-7xl mx-auto">
      <ScrollReveal>
        <h2 className="text-center text-h2 font-semibold mb-16">{heading}</h2>
      </ScrollReveal>
      <StaggerList stagger={0.12} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {items.map((skill) => (
          <SkillCard key={skill.title} icon={skill.icon} title={skill.title} description={skill.description} />
        ))}
      </StaggerList>
    </section>
  );
}