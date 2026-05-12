// src/components/sections/Projects.tsx
import { ProjectCard } from '@/components/ui/ProjectCard';

export default function Projects() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <ProjectCard
        id="agentic-workflow-engine"
        slug="agentic-workflow-engine"
        title="Agentic Workflow Engine"
        shortDescription="Production‑ready multi‑agent orchestration system with durable execution and human‑in‑the‑loop capabilities."
        technologies={[{ name: "LangGraph" }, { name: "TypeScript" }, { name: "PostgreSQL" }]}
        featured
        demoUrl="https://demo.example.com"
        githubUrl="https://github.com/example/workflow-engine"
      />
    </section>
  );
}