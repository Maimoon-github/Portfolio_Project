import { apiFetch } from "./client";
import type { PostListResponse, Post } from "@/types/api";

export const fetchPost = {
  list: (params?: Record<string, unknown>) =>
    apiFetch<PostListResponse>(
      `/api/v1/blog/posts/?${new URLSearchParams(params as any)}`,
      { tags: ["blog-posts"], revalidate: 300 }
    ),
  detail: (slug: string) =>
    apiFetch<Post>(`/api/v1/blog/posts/${slug}/`, {
      tags: [`blog-post-${slug}`],
      revalidate: 600,
    }),
};

export const fetchCategories = () =>
  apiFetch<{ slug: string; name: string }[]>("/api/v1/blog/categories/", {
    tags: ["blog-categories"],
    revalidate: 300,
  });

export const fetchTags = () =>
  apiFetch<{ slug: string; name: string }[]>("/api/v1/blog/tags/", {
    tags: ["blog-tags"],
    revalidate: 300,
  });