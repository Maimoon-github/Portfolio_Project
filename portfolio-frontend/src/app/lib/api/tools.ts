// src/lib/api/calculators.ts
// fetchCalculator.list(), .detail(), fetchCalculatorCategories()
import { apiFetch } from "./client"
import type { CalculatorListResponse, Calculator, CalculatorCategory } from "@/types/api"

export const fetchCalculator = {
  list: (params?: Record<string, unknown>) =>
    apiFetch<CalculatorListResponse>(
      `/api/v1/calculators/?${new URLSearchParams(params as any)}`,
      { tags: ["calculators"], revalidate: 3600 }
    ),
  detail: (slug: string) =>
    apiFetch<Calculator>(`/api/v1/calculators/${slug}/`, {
      tags: [`calculator-${slug}`],
      revalidate: 3600,
    }),
}

export const fetchCalculatorCategories = () =>
  apiFetch<CalculatorCategory[]>("/api/v1/calculators/categories/", {
    tags: ["calculator-categories"],
    revalidate: 3600,
  })