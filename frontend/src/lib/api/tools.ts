import { wagtailFetch, apiFetch } from "./client";
import type { Tool, PaginatedResponse, CalculatorResponse } from "./types";

const TOOLS_REVALIDATE = false; // Tools pages change rarely — cache indefinitely

export async function getTools(params?: {
  category?: string;
  featured?: boolean;
  page_size?: number;
}): Promise<PaginatedResponse<Tool>> {
  const query = new URLSearchParams();
  query.set("type", "tools.ToolDetailPage");
  query.set("fields", "category,calculator_slug,icon,is_featured,hero_image_thumbnail");
  query.set("order", "title");

  if (params?.category) query.set("category", params.category);
  if (params?.featured) query.set("is_featured", "true");
  if (params?.page_size) query.set("page_size", String(params.page_size));

  return wagtailFetch<PaginatedResponse<Tool>>(
    `/api/v2/pages/?${query.toString()}`,
    { revalidate: 3600, tags: ["tools"] }
  );
}

export async function getTool(slug: string): Promise<Tool | null> {
  try {
    const data = await wagtailFetch<PaginatedResponse<Tool>>(
      `/api/v2/pages/?type=tools.ToolDetailPage&slug=${slug}&fields=*`,
      {
        revalidate: TOOLS_REVALIDATE,
        tags: [`tool-${slug}`],
      }
    );
    return data.results[0] ?? null;
  } catch {
    return null;
  }
}

// ✅ Fixed return type syntax
export async function getAllToolSlugs(): Promise<
  { category: string; slug: string }[]
> {
  const data = await wagtailFetch<PaginatedResponse<Tool>>(
    "/api/v2/pages/?type=tools.ToolDetailPage&fields=category,slug&page_size=1000",
    { revalidate: false }
  );
  return data.results.map((t) => ({
    category: t.category,
    slug: t.meta.slug,
  }));
}

/**
 * Call the Django compute endpoint.
 */
export async function computeCalculator<T = Record<string, number>>(
  calculatorSlug: string,
  inputs: Record<string, number | string>
): Promise<CalculatorResponse<T>> {
  return apiFetch<CalculatorResponse<T>>(`/tools/compute/${calculatorSlug}/`, {
    method: "POST",
    body: JSON.stringify({ inputs }),
  });
}