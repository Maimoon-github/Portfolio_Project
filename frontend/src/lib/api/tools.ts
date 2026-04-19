import { wagtailFetch, apiFetch } from "./client";
import type { Tool, PaginatedResponse, CalculatorResponse } from "./types";
import { tools } from "../data";

const TOOLS_REVALIDATE = false; // Tools pages change rarely — cache indefinitely

function getMockTools(): PaginatedResponse<Tool> {
  const results = tools.map((t, idx) => ({
    id: idx + 1,
    meta: { type: "tools.ToolDetailPage", detail_url: "", html_url: "", slug: t.name.toLowerCase().replace(/\s+/g, '-') },
    title: t.name,
    category: t.category,
    calculator_slug: t.name.toLowerCase(),
    icon: t.icon,
    is_featured: true,
    hero_image_thumbnail: null,
    body: [{ type: "paragraph", value: "This is an interactive mock tool deployed for offline architectural routing." }],
  })) as unknown as Tool[];
  return { meta: { total_count: results.length }, items: results, results };
}

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

  try {
    return await wagtailFetch<PaginatedResponse<Tool>>(
      `/api/v2/pages/?${query.toString()}`,
      { revalidate: 3600, tags: ["tools"] }
    );
  } catch (error) {
    console.warn("Wagtail fetch failed. Returning mock tools.", error);
    let results = getMockTools().results;
    if (params?.category) results = results.filter(t => t.category === params.category);
    return { meta: { total_count: results.length }, items: results, results } as PaginatedResponse<Tool>;
  }
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
    return getMockTools().results.find((t) => t.meta.slug === slug) ?? null;
  }
}

// ✅ Fixed return type syntax
export async function getAllToolSlugs(): Promise<
  { category: string; slug: string }[]
> {
  try {
    const data = await wagtailFetch<PaginatedResponse<Tool>>(
      "/api/v2/pages/?type=tools.ToolDetailPage&fields=category,slug&page_size=1000",
      { revalidate: false }
    );
    return data.results.map((t) => ({
      category: t.category,
      slug: t.meta.slug,
    }));
  } catch {
    return getMockTools().results.map((t) => ({ category: t.category, slug: t.meta.slug }));
  }
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