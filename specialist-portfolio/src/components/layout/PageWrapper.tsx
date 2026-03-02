import { forwardRef, ElementType, HTMLAttributes } from 'react';
import clsx from 'clsx';
import styles from './PageWrapper.module.css';

export interface PageWrapperProps extends HTMLAttributes<HTMLElement> {
  /** Page content */
  children: React.ReactNode;
  /** Reduce max-width for documentation/blog posts */
  narrow?: boolean;
  /** Additional CSS class name */
  className?: string;
  /** Polymorphic container tag (default 'div') */
  as?: ElementType;
}

/**
 * Page layout wrapper with a three‑column grid and responsive content area.
 * Provides outer margins and optional narrow variant for better readability.
 * Includes a subtle entrance animation.
 */
const PageWrapper = forwardRef<HTMLElement, PageWrapperProps>(
  (
    {
      children,
      narrow = false,
      className,
      as: Component = 'div',
      ...rest
    },
    ref
  ) => {
    const wrapperClasses = clsx(
      styles.wrapper,
      narrow && styles['wrapper--narrow'],
      className
    );

    return (
      <Component ref={ref} className={wrapperClasses} {...rest}>
        <div className={styles.wrapper__content}>{children}</div>
      </Component>
    );
  }
);

PageWrapper.displayName = 'PageWrapper';

export default PageWrapper;