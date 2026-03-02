// specialist-portfolio/src/components/ui/Card/Card.types.ts
import { HTMLAttributes, ReactNode } from 'react';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Content of the card */
  children: ReactNode;
  /** Whether to show the gold accent line at the top (featured card) */
  accent?: boolean;
}