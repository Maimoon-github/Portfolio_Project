// src/lib/api/tools.ts
import { apiFetch } from "./client"
import type { ToolListResponse, Tool, ToolCategory } from "@/types/api"

export const fetchTool = {
  list: (params: Record<string, string | number | boolean> = {}) =>
    apiFetch<ToolListResponse>(
      `/api/v1/tools/?${new URLSearchParams(params as Record<string, string>)}`,
      { tags: ["tools"], revalidate: 3600 }
    ),

  detail: (slug: string) =>
    apiFetch<Tool>(`/api/v1/tools/${slug}/`, {
      tags: [`tool-${slug}`],
      revalidate: 3600,
    }),
}

export const fetchToolCategories = () =>
  apiFetch<ToolCategory[]>("/api/v1/tools/categories/", {
    tags: ["tool-categories"],
    revalidate: 3600,
  })