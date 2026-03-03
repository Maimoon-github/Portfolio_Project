// specialist-portfolio/src/data/schemas/blog.schema.ts

import { z } from 'zod';
import type { BlogPost, BlogPostMeta } from '@/types/blog.types';

const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const readTimeRegex = /^\d+\smin$/;

export const BlogPostMetaSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
  readTime: z.string().regex(readTimeRegex, 'Read time must be like "5 min"'),
  category: z.enum(['ai-strategy', 'engineering', 'automation', 'digital-growth']),
}) satisfies z.ZodType<BlogPostMeta>;

export const BlogPostSchema = z.object({
  slug: z.string().regex(slugRegex, 'Slug must be kebab‑case (e.g., "my-blog-post")'),
  title: z.string().min(1, 'Title is required'),
  excerpt: z.string().min(1, 'Excerpt is required'),
  content: z.string().min(1, 'Content is required'),
  meta: BlogPostMetaSchema,
  featured: z.boolean().optional(),
  image: z.string().url('Must be a valid URL').optional(),
  imageAlt: z.string().optional(),
}) satisfies z.ZodType<BlogPost>;

export function validateBlogPost(data: unknown): BlogPost {
  return BlogPostSchema.parse(data);
}

export function validateBlogPostSafe(data: unknown) {
  return BlogPostSchema.safeParse(data);
}