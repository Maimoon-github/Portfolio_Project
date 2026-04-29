import { apiFetch } from "./client";
import type { ToolListResponse, Tool, ToolCategory } from "@/types/api";

export const fetchTool = {
  list: (params?: Record<string, unknown>) =>
    apiFetch<ToolListResponse>(
      `/api/v1/tools/?${new URLSearchParams(params as any)}`,
      { tags: ["tools"], revalidate: 3600 }
    ),
  detail: (slug: string) =>
    apiFetch<Tool>(`/api/v1/tools/${slug}/`, {
      tags: [`tool-${slug}`],
      revalidate: 3600,
    }),
};

export const fetchToolCategories = () =>
  apiFetch<ToolCategory[]>("/api/v1/tools/categories/", {
    tags: ["tool-categories"],
    revalidate: 3600,
  });