/**
 * project.schema.ts
 * Zod validation schema for Project data.
 * Provides runtime validation for API responses and data integrity.
 */

import { z } from 'zod';
import type { Project, ProjectMetric, ProjectBadge, ProjectLinks } from '@/types/project.types';

// Helper for slug validation (kebab‑case, lowercase, letters/numbers/hyphens)
const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const ProjectMetricSchema = z.object({
  icon: z.string().min(1, 'Icon is required'),
  value: z.union([z.string(), z.number()]),
  label: z.string().min(1, 'Label is required'),
  highlight: z.boolean().optional(),
}) satisfies z.ZodType<ProjectMetric>;

export const ProjectBadgeSchema = z.object({
  label: z.string().min(1, 'Badge label is required'),
  variant: z.enum(['primary', 'secondary', 'accent']),
  type: z.enum(['category', 'status', 'tech']).optional(),
}) satisfies z.ZodType<ProjectBadge>;

export const ProjectLinksSchema = z.object({
  demo: z.string().url('Must be a valid URL').optional(),
  repo: z.string().url('Must be a valid URL').optional(),
  caseStudy: z.string().url('Must be a valid URL').optional(),
  documentation: z.string().url('Must be a valid URL').optional(),
}) satisfies z.ZodType<ProjectLinks>;

export const ProjectSchema = z.object({
  id: z.string().min(1, 'ID is required'),
  slug: z.string().regex(slugRegex, 'Slug must be kebab‑case (e.g., "my-project")'),
  title: z.string().min(1, 'Title is required'),
  summary: z.string().min(1, 'Summary is required'),
  description: z.string().optional(),
  category: z.enum(['ai-engineering', 'web-apps', 'automation', 'strategy']),
  status: z.enum(['active', 'archived', 'experimental']),
  year: z.string().optional(),
  metrics: z.array(ProjectMetricSchema).max(5, 'Maximum 5 metrics').optional(),
  badges: z.array(ProjectBadgeSchema).optional(),
  tags: z.array(z.string()).optional(),
  links: ProjectLinksSchema.optional(),
  image: z.string().url('Must be a valid URL').optional(),
  imageAlt: z.string().optional(),
  featured: z.boolean().optional(),
  problem: z.string().optional(),
  architecture: z.string().optional(),
  implementation: z.string().optional(),
  results: z.string().optional(),
  learnings: z.string().optional(),
}) satisfies z.ZodType<Project>;

// Helper functions for runtime validation
export function validateProject(data: unknown): Project {
  return ProjectSchema.parse(data);
}

export function validateProjectSafe(data: unknown) {
  return ProjectSchema.safeParse(data);
}