import { wagtailFetch } from "./client";
import type { BlogPost, PaginatedResponse } from "./types";

const BLOG_REVALIDATE = 60; // seconds — ISR

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

  return wagtailFetch<PaginatedResponse<BlogPost>>(
    `/api/v2/pages/?${query.toString()}`,
    {
      revalidate: BLOG_REVALIDATE,
      tags: ["blog-posts"],
    }
  );
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
    return null;
  }
}

/** Used by generateStaticParams to pre-build all blog post pages at build time */
export async function getAllBlogSlugs(): Promise<string[]> {
  const data = await wagtailFetch<PaginatedResponse<BlogPost>>(
    "/api/v2/pages/?type=blog.BlogDetailPage&fields=slug&page_size=1000",
    { revalidate: false } // Cache forever at build time; revalidated on publish
  );
  return data.results.map((p) => p.meta.slug);
}
