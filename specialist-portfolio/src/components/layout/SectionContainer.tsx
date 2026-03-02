// specialist-portfolio/src/components/layout/SectionContainer.tsx
import { forwardRef, ElementType, HTMLAttributes } from 'react';
import clsx from 'clsx';
import styles from './layout.module.css'; // reuse layout module for consistency

export type PaddingSize = 'sm' | 'md' | 'lg' | 'xl';
export type BackgroundVariant = 'default' | 'accent' | 'surface';

export interface SectionContainerProps extends HTMLAttributes<HTMLElement> {
  /** Unique identifier for anchor links and accessibility (required) */
  id: string;
  /** ID of the element that labels this section (for aria-labelledby) */
  titleId?: string;
  /** Polymorphic element type */
  as?: 'section' | 'div' | 'article' | 'aside';
  /** Vertical padding size (multiples of 8px) */
  paddingSize?: PaddingSize;
  /** Background variant from design system */
  backgroundVariant?: BackgroundVariant;
  /** Content to be rendered inside the section */
  children: React.ReactNode;
  /** Additional CSS class name */
  className?: string;
}

/**
 * SectionContainer – a layout primitive for page sections.
 * Provides consistent vertical padding, background options, and accessibility support.
 * Uses "The Data Specialist" design tokens via CSS variables.
 */
const SectionContainer = forwardRef<HTMLElement, SectionContainerProps>(
  (
    {
      id,
      titleId,
      as: Component = 'section',
      paddingSize = 'md',
      backgroundVariant = 'default',
      children,
      className,
      ...rest
    },
    ref
  ) => {
    const containerClasses = clsx(
      styles.container,
      styles[`container--padding-${paddingSize}`],
      styles[`container--bg-${backgroundVariant}`],
      className
    );

    return (
      <Component
        ref={ref}
        id={id}
        className={containerClasses}
        aria-labelledby={titleId}
        {...rest}
      >
        <div className={styles.container__inner}>{children}</div>
      </Component>
    );
  }
);

SectionContainer.displayName = 'SectionContainer';

export default SectionContainer;