// src/lib/api/portfolio.ts
import { apiFetch } from "./client"
import type { ProjectListResponse, Project } from "@/types/api"

export const fetchProject = {
  list: (params: Record<string, string | number | boolean> = {}) =>
    apiFetch<ProjectListResponse>(
      `/api/v1/portfolio/projects/?${new URLSearchParams(params as Record<string, string>)}`,
      { tags: ["projects"], revalidate: 3600 }
    ),

  detail: (slug: string) =>
    apiFetch<Project>(`/api/v1/portfolio/projects/${slug}/`, {
      tags: [`project-${slug}`],
      revalidate: 3600,
    }),
    
  featured: () =>
    apiFetch<ProjectListResponse>("/api/v1/portfolio/projects/?featured=true", {
      tags: ["projects-featured"],
      revalidate: 3600,
    }),
}

export const fetchSkills = () =>
  apiFetch<Array<{ name: string; proficiency: number }>>("/api/v1/portfolio/skills/", {
    tags: ["skills"],
    revalidate: 86400,
  })