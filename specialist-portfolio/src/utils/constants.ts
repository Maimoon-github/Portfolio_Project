// specialist-portfolio/src/utils/constants.ts

/**
 * constants.ts
 * Application‑wide constants and configuration values.
 * Centralizes strings, categories, and breakpoints for maintainability.
 */

/**
 * Site metadata
 */
export const SITE_NAME = 'The Data Specialist';
export const SITE_URL = 'https://dataspecialist.dev';
export const OWNER_NAME = 'Jane Doe'; // Placeholder – replace with actual name
export const SITE_DESCRIPTION = 'Developer, AI Engineer, and Agentic Workflow Architect.';

/**
 * Primary navigation labels from Full Navigation Structure.
 */
export const NAV_ITEMS = [
  'Work',
  'Capabilities',
  'Mind',
  'Knowledge Base',
  'Connect',
] as const;

/**
 * Responsive breakpoints in pixels.
 */
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

/**
 * Project categories (kebab‑case, lowercase) – used in Portfolio/Projects filters.
 */
export const PROJECT_CATEGORIES = [
  'ai-engineering',
  'web-apps',
  'automation',
  'strategy',
] as const;

/**
 * Blog categories – used in Blog page filters.
 */
export const BLOG_CATEGORIES = [
  'ai-strategy',
  'engineering',
  'automation',
  'digital-growth',
] as const;

/**
 * Tool categories – used in Tools page filters.
 */
export const TOOL_CATEGORIES = [
  'ai-prompts',
  'automation',
  'dev-utils',
  'strategy',
] as const;

/**
 * Contact form inquiry types.
 */
export const INQUIRY_TYPES = [
  'Consulting',
  'Collaboration',
  'Speaking',
  'Other',
] as const;