// src/hooks/useProjectBySlug.ts
import { projects } from '@/data/projects';

export const useProjectBySlug = (slug: string) => {
  const project = projects.find(p => p.slug === slug);
  return { project, isLoading: false, error: null };
};