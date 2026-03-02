import { ReactNode, HTMLAttributes } from 'react';

export type BadgeVariant = 'default' | 'accent';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Content of the badge (text, icon, etc.) */
  children: ReactNode;
  /** Visual style variant */
  variant?: BadgeVariant;
  /** Optional additional CSS class name */
  className?: string;
}