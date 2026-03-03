// src/hooks/useRelatedProjects.ts
export const useRelatedProjects = (id: string | undefined, limit: number) => {
  return { relatedProjects: [], isLoading: false };
};