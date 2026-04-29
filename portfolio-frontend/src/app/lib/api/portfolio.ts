import { apiFetch } from "./client";
import type { ProjectListResponse, Project, Skill, Experience, Testimonial } from "@/types/api";

export const fetchProject = {
  list: (params?: Record<string, unknown>) =>
    apiFetch<ProjectListResponse>(
      `/api/v1/portfolio/projects/?${new URLSearchParams(params as any)}`,
      { tags: ["projects"], revalidate: 3600 }
    ),
  detail: (slug: string) =>
    apiFetch<Project>(`/api/v1/portfolio/projects/${slug}/`, {
      tags: [`project-${slug}`],
      revalidate: 3600,
    }),
};

export const fetchSkills = () =>
  apiFetch<Skill[]>("/api/v1/portfolio/skills/", {
    tags: ["skills"],
    revalidate: 3600,
  });

export const fetchExperience = () =>
  apiFetch<Experience[]>("/api/v1/portfolio/experience/", {
    tags: ["experience"],
    revalidate: 3600,
  });

export const fetchTestimonials = () =>
  apiFetch<Testimonial[]>("/api/v1/portfolio/testimonials/", {
    tags: ["testimonials"],
    revalidate: 3600,
  });