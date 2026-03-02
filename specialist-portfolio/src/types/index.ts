/**
 * Barrel export for all shared type definitions.
 * Use `import type { ... } from '@/types'` for convenient access.
 */

// Re-export common types
export type {
  NavigationItem,
  FilterOption,
  SEOMeta,
  ProjectStatus,
  ProjectCategory,
  BlogCategory,
  ToolCategory,
  WithChildren,
  OptionalChildren,
  Breakpoint
} from './common.types';

// Re-export project types
export type {
  ProjectMetric,
  ProjectBadge,
  ProjectLinks,
  ProjectFilterOptions,
  Project
} from './project.types';

// Re-export blog types
export type {
  BlogCategory as BlogCategoryAlias, // renamed to avoid conflict, but kept for clarity
  BlogPostMeta,
  BlogPost
} from './blog.types';

// Re-export tool types
export type {
  ToolCategory as ToolCategoryAlias, // renamed to avoid conflict
  Tool
} from './tool.types';

// Re-export resume types
export type {
  Experience,
  Education,
  Certification,
  Publication,
  ResumeData
} from './resume.types';

// Re-export navigation types
export type {
  NavItem,
  NavigationConfig
} from './navigation.types';