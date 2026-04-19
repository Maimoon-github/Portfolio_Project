import { wagtailFetch } from "./client";
import type { BlogPost, PaginatedResponse } from "./types";
import { posts } from "../data";

const BLOG_REVALIDATE = 60; // seconds — ISR

function getMockPosts(): PaginatedResponse<BlogPost> {
  const results = posts.map((p) => ({
    id: p.id,
    meta: { type: "blog.BlogDetailPage", detail_url: "", html_url: "", slug: p.slug, first_published_at: "2024-01-01" },
    title: p.title,
    subtitle: p.excerpt,
    category: p.category,
    reading_time: parseInt(p.readTime),
    hero_image_thumbnail: null,
    tags: [],
    body: [{ type: "paragraph", value: p.excerpt }],
  })) as unknown as BlogPost[];
  return { meta: { total_count: results.length }, items: results, results };
}

export async function getBlogPosts(params?: {
  page?: number;
  page_size?: number;
  category?: string;
  search?: string;
}): Promise<PaginatedResponse<BlogPost>> {
  const query = new URLSearchParams();
  query.set("type", "blog.BlogDetailPage");
  query.set("fields", "subtitle,reading_time,category,hero_image_thumbnail,tags");
  query.set("order", "-first_published_at");

  if (params?.page) query.set("p", String(params.page));
  if (params?.page_size) query.set("page_size", String(params.page_size));
  if (params?.category) query.set("category", params.category);
  if (params?.search) query.set("search", params.search);

  try {
    return await wagtailFetch<PaginatedResponse<BlogPost>>(
      `/api/v2/pages/?${query.toString()}`,
      {
        revalidate: BLOG_REVALIDATE,
        tags: ["blog-posts"],
      }
    );
  } catch (error) {
    console.warn("Wagtail fetch failed. Returning mock blog posts.", error);
    let results = getMockPosts().results;
    if (params?.category) results = results.filter(p => p.category === params.category);
    return { meta: { total_count: results.length }, items: results, results } as PaginatedResponse<BlogPost>;
  }
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const data = await wagtailFetch<PaginatedResponse<BlogPost>>(
      `/api/v2/pages/?type=blog.BlogDetailPage&slug=${slug}&fields=*`,
      {
        revalidate: BLOG_REVALIDATE,
        tags: [`blog-post-${slug}`],
      }
    );
    return data.results[0] ?? null;
  } catch {
    console.warn("Wagtail fetch failed. Returning mock blog post.");
    return getMockPosts().results.find((p) => p.meta.slug === slug) ?? null;
  }
}

/** Used by generateStaticParams to pre-build all blog post pages at build time */
export async function getAllBlogSlugs(): Promise<string[]> {
  try {
    const data = await wagtailFetch<PaginatedResponse<BlogPost>>(
      "/api/v2/pages/?type=blog.BlogDetailPage&fields=slug&page_size=1000",
      { revalidate: false } // Cache forever at build time; revalidated on publish
    );
    return data.results.map((p) => p.meta.slug);
  } catch {
    return posts.map(p => p.slug);
  }
}
