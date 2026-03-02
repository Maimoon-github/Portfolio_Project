/**
 * Variant configuration for the ProjectCard component.
 * Defines layout and section visibility for compact (archive) and detailed (portfolio) views.
 */

/**
 * Available card layout variants.
 * - `compact`: Dense layout for grid views (Projects archive)
 * - `detailed`: Expanded layout with image and full content (Portfolio curated)
 */
export type ProjectCardVariant = 'compact' | 'detailed';

/**
 * Configuration for a specific card variant.
 * Controls grid placement, CSS classes, and conditional section rendering.
 */
export interface ProjectCardConfig {
  /**
   * Number of columns this card should span in a 12‑column grid.
   * @example 4 for compact cards in a three‑column layout, 6 for detailed cards in a two‑column layout
   */
  gridSpan: number;

  /**
   * CSS module class name (modifier) for this variant.
   * Should correspond to a class in `ProjectCard.module.css`, e.g., `projectCard--compact`.
   */
  className: string;

  /**
   * Section visibility flags.
   * These determine which sub‑components are rendered inside the card.
   */
  sections: {
    /** Display technology/category tags */
    showTags: boolean;
    /** Display metric values (using JetBrains Mono font) */
    showMetrics: boolean;
    /** Display project description (compact may truncate) */
    showDescription: boolean;
    /** Render a Gold Fleck accent line (for featured/highlighted items) */
    accentLine: boolean;
  };
}

/**
 * Central registry of variant configurations.
 * Maps each variant to its specific settings.
 */
export const CARD_VARIANTS: Record<ProjectCardVariant, ProjectCardConfig> = {
  compact: {
    gridSpan: 4, // Fits three cards per row in a 12‑column grid
    className: 'projectCard--compact',
    sections: {
      showTags: true,
      showMetrics: false, // Metrics hidden in compact view to save space
      showDescription: true,
      accentLine: false,
    },
  },
  detailed: {
    gridSpan: 6, // Two cards per row, allowing more space per card
    className: 'projectCard--detailed',
    sections: {
      showTags: true,
      showMetrics: true, // Full metrics with gold‑accent numbers
      showDescription: true,
      accentLine: true, // Gold top border for featured projects
    },
  },
} as const; // `as const` ensures the literal types are preserved