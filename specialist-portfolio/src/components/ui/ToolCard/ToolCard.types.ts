// specialist-portfolio/src/components/ui/ToolCard/ToolCard.types.ts

/**
 * External links associated with a tool.
 */
export interface ToolLinks {
  /** Link to use the tool (live demo or hosted version) */
  useTool?: string;
  /** Link to source repository (GitHub, etc.) */
  github?: string;
  /** Link to documentation */
  documentation?: string;
}

/**
 * Props for the ToolCard component.
 */
export interface ToolCardProps {
  /** Unique tool identifier (used for keys) */
  id: string | number;
  /** Tool name/title */
  title: string;
  /** Brief description of the tool */
  description: string;
  /** Technology/category tags (rendered as Badge components) */
  tags?: readonly string[];
  /** External links */
  links?: ToolLinks;
  /** Optional icon or image URL */
  icon?: string;
  /** Alt text for icon (required if icon is provided) */
  iconAlt?: string;
  /** Additional CSS class names */
  className?: string;
}