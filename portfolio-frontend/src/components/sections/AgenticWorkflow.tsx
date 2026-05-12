// src/components/sections/AgenticWorkflow.tsx
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { AgenticGraph } from '@/components/3d/AgenticGraph';

export default function AgenticWorkflow() {
  return (
    <section id="workflow" className="py-section-gap px-gutter max-w-7xl mx-auto">
      <ScrollReveal>
        <h2 className="text-center text-h2 font-semibold mb-4">Agentic Architecture</h2>
        <p className="text-center text-body-md text-[var(--color-on-background)]/60 max-w-2xl mx-auto mb-12">
          Every agent is a composable unit: planner, memory, tool‑executor. This graph shows a live
          orchestration topology.
        </p>
      </ScrollReveal>
      <ScrollReveal delay={0.2}>
        <div className="glass-card overflow-hidden h-[500px] w-full">
          <AgenticGraph />
        </div>
      </ScrollReveal>
    </section>
  );
}