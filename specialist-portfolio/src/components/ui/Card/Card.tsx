// specialist-portfolio/src/components/ui/Card/Card.tsx
import { forwardRef } from 'react';
import clsx from 'clsx';
import { CardProps } from './Card.types';
import styles from './Card.module.css';

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, accent = false, className, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          styles.card,
          accent && styles['card--accent'],
          className
        )}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export default Card;