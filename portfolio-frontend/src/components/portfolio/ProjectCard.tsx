import type { Project } from "@/types/api";

export function ProjectCard({ project }: { project: Project }) {
  return <div>Project: {project.title}</div>;
}