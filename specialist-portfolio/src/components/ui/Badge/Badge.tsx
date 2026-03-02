// specialist-portfolio/src/components/ui/Badge/Badge.tsx
import { FC } from 'react';
import clsx from 'clsx';
import { BadgeProps } from './Badge.types';
import styles from './Badge.module.css';

export const Badge: FC<BadgeProps> = ({
  children,
  variant = 'default',
  className,
}) => {
  return (
    <span
      className={clsx(
        styles.badge,
        variant === 'accent' && styles['badge--accent'],
        variant === 'default' && styles['badge--default'],
        className
      )}
    >
      {children}
    </span>
  );
};