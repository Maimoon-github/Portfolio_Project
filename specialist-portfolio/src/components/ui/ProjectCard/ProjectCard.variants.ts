// specialist-portfolio/src/components/ui/ProjectCard/ProjectCard.variants.ts

/**
 * Variant configuration for the ProjectCard component.
 * Defines layout and section visibility for compact (archive) and detailed (portfolio) views.
 */

export type ProjectCardVariant = 'compact' | 'detailed';

export interface ProjectCardConfig {
  /** CSS module class name (modifier) for this variant. */
  className: string;
  /** Section visibility flags. */
  sections: {
    /** Display technology/category tags */
    showTags: boolean;
    /** Display metric values (using JetBrains Mono font) */
    showMetrics: boolean;
    /** Display full description (detailed) or just summary (compact) */
    showDescription: boolean;
    /** Render a Gold Fleck accent line (for featured/highlighted items) */
    accentLine: boolean;
  };
}

export const CARD_VARIANTS: Record<ProjectCardVariant, ProjectCardConfig> = {
  compact: {
    className: 'projectCard--compact',
    sections: {
      showTags: true,
      showMetrics: false,
      showDescription: false, // compact uses only summary
      accentLine: false,
    },
  },
  detailed: {
    className: 'projectCard--detailed',
    sections: {
      showTags: true,
      showMetrics: true,
      showDescription: true,
      accentLine: true,
    },
  },
} as const;