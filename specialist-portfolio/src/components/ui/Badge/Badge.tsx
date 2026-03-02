import React from 'react';
import clsx from 'clsx';
import { BadgeProps } from './Badge.types';
import styles from './Badge.module.css';

/**
 * Badge component – small status indicator (new, experimental, category, etc.)
 */
export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  className,
  ...rest
}) => {
  return (
    <span
      className={clsx(
        styles.badge,
        styles[`badge--${variant}`],
        className
      )}
      {...rest}
    >
      {children}
    </span>
  );
};

Badge.displayName = 'Badge';






