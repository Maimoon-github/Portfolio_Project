// specialist-portfolio/src/components/ui/Button/Button.types.ts
import { ButtonHTMLAttributes, ReactNode } from 'react';

/**
 * Visual style variants for the Button component.
 * Maps to "The Data Specialist" design system color roles.
 *
 * - `primary`: High-emphasis actions using Lapis Deep (`#0D33A6`)
 * - `secondary`: Medium-emphasis outline variant with Lapis Deep border
 * - `accent`: High-emphasis special actions using Gold Fleck (`#D9AE89`)
 * - `text`: Low-emphasis text button, transparent background with hover underline
 */
export type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'text';

/**
 * Size variants for the Button component.
 * Affects padding, font size, and overall dimensions.
 *
 * - `sm`: Compact size (8px padding, 0.875rem font)
 * - `md`: Default medium size (12px padding, 1rem font)
 * - `lg`: Large size (16px padding, 1.125rem font)
 */
export type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * Props for the Button component.
 * Extends native button attributes for full HTML support.
 */
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style variant. @default 'primary' */
  variant?: ButtonVariant;

  /** Size variant. @default 'md' */
  size?: ButtonSize;

  /** Whether button is in loading state (shows spinner, disables interactions). @default false */
  isLoading?: boolean;

  /** Optional icon rendered before children. */
  leftIcon?: ReactNode;

  /** Optional icon rendered after children. */
  rightIcon?: ReactNode;

  /** Whether button should take full width of container. @default false */
  fullWidth?: boolean;
}