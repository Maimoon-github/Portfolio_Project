/**
 * tool.schema.ts
 * Zod validation schema for Tool data.
 * Provides runtime validation for API responses and data integrity.
 */

import { z } from 'zod';
import type { Tool } from '@/types/tool.types';

// Helper for slug validation (kebab‑case, lowercase, letters/numbers/hyphens)
const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const ToolSchema = z.object({
  slug: z.string().regex(slugRegex, 'Slug must be kebab‑case (e.g., "my-tool")'),
  name: z.string().min(1, 'Tool name is required'),
  description: z.string().min(1, 'Description is required'),
  category: z.enum(['ai-prompts', 'automation', 'dev-utils', 'strategy']),
  tags: z.array(z.string()).min(1, 'At least one tag is required'),
  ctaType: z.enum(['use', 'github']),
  githubUrl: z.string().url('Must be a valid URL').optional(),
  featured: z.boolean().optional(),
}).refine(
  (data) => {
    // If ctaType is 'github', githubUrl must be provided
    if (data.ctaType === 'github' && !data.githubUrl) {
      return false;
    }
    return true;
  },
  {
    message: 'githubUrl is required when ctaType is "github"',
    path: ['githubUrl'],
  }
) satisfies z.ZodType<Tool>;

// Helper functions for runtime validation
export function validateTool(data: unknown): Tool {
  return ToolSchema.parse(data);
}

export function validateToolSafe(data: unknown) {
  return ToolSchema.safeParse(data);
}