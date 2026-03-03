// specialist-portfolio/src/types/tool.types.ts

/**
 * Tool utility type definitions.
 * Aligns with "The Data Specialist" design system and Full Navigation Structure.
 */

/**
 * Tool category values, matching Tools Page filters.
 */
export type ToolCategory =
  | 'ai-prompts'
  | 'automation'
  | 'dev-utils'
  | 'strategy';

/**
 * A reusable tool or utility.
 */
export interface Tool {
  /** URL slug for deep linking */
  readonly slug: string;
  /** Tool name */
  readonly name: string;
  /** One‑line description of the problem it solves */
  readonly description: string;
  /** Primary category */
  readonly category: ToolCategory;
  /** Technology tags */
  readonly tags: readonly string[];
  /** Type of call‑to‑action */
  readonly ctaType: 'use' | 'github';
  /** GitHub repository URL (if ctaType is 'github') */
  readonly githubUrl?: string;
  /** Whether this tool should be featured on the Tools page */
  readonly featured?: boolean;
}