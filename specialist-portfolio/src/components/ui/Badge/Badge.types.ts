// specialist-portfolio/src/components/ui/Badge/Badge.types.ts
import { ReactNode } from 'react';

export type BadgeVariant = 'default' | 'accent';

export interface BadgeProps {
  /** Content of the badge */
  children: ReactNode;
  /** Visual style variant */
  variant?: BadgeVariant;
  /** Additional CSS class name */
  className?: string;
}