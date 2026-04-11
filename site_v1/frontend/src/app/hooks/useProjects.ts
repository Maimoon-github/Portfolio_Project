import useSWR from "swr";
import { getProjects, getProject } from "../services/api";
import { Paginated, Project } from "../types/api";

export function useProjects(category?: string) {
  const key = category ? ["projects", category] : "projects";
  const { data, error } = useSWR<Paginated<Project>>(key, () => getProjects(category));
  return {
    projects: data?.results || [],
    loading: !error && !data,
    error,
  };
}

export function useProject(id: string) {
  const { data, error } = useSWR<Project>(
    id ? ["project", id] : null,
    () => getProject(id)
  );
  return { project: data, loading: !!id && !error && !data, error };
}