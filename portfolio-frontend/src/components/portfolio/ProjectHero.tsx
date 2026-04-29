import type { Project } from "@/types/api";

export function ProjectHero({ project }: { project: Project }) {
  return <div>Project Hero: {project.title}</div>;
}