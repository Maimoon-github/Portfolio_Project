// // specialist-portfolio/src/components/ui/Button/Button.tsx
// import { forwardRef, ButtonHTMLAttributes, ReactNode, ForwardedRef } from 'react';
// import styles from './Button.module.css';

// export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
//   /** Visual style variant following design system */
//   variant?: 'primary' | 'secondary' | 'accent' | 'text';
//   /** Size variant affecting padding and font size */
//   size?: 'sm' | 'md' | 'lg';
//   /** Whether button is in loading state (shows spinner, disables interactions) */
//   isLoading?: boolean;
//   /** Optional icon rendered before children */
//   leftIcon?: ReactNode;
//   /** Optional icon rendered after children */
//   rightIcon?: ReactNode;
//   /** Whether button should take full width of container */
//   fullWidth?: boolean;
// }

// /**
//  * Primary UI button component with design system integration.
//  * Supports variants, sizes, icons, loading state, and full accessibility.
//  */
// const Button = forwardRef<HTMLButtonElement, ButtonProps>(
//   (
//     {
//       children,
//       variant = 'primary',
//       size = 'md',
//       isLoading = false,
//       leftIcon,
//       rightIcon,
//       fullWidth = false,
//       className = '',
//       disabled,
//       ...rest
//     },
//     ref: ForwardedRef<HTMLButtonElement>
//   ) => {
//     // Compose class names based on props
//     const buttonClasses = [
//       styles.button,
//       styles[`button--${variant}`],
//       styles[`button--${size}`],
//       isLoading && styles['button--loading'],
//       fullWidth && styles['button--full-width'],
//       className,
//     ]
//       .filter(Boolean)
//       .join(' ');

//     // Determine if button is disabled (either explicitly or during loading)
//     const isDisabled = disabled || isLoading;

//     return (
//       <button
//         ref={ref}
//         className={buttonClasses}
//         disabled={isDisabled}
//         aria-busy={isLoading}
//         aria-disabled={isDisabled}
//         {...rest}
//       >
//         {isLoading && (
//           <span className={styles.spinner} aria-hidden="true" />
//         )}
//         {!isLoading && leftIcon && (
//           <span className={styles.iconLeft} aria-hidden="true">
//             {leftIcon}
//           </span>
//         )}
//         <span className={styles.content}>{children}</span>
//         {!isLoading && rightIcon && (
//           <span className={styles.iconRight} aria-hidden="true">
//             {rightIcon}
//           </span>
//         )}
//       </button>
//     );
//   }
// );

// Button.displayName = 'Button';

// export default Button;

















// src/components/ui/Button/Button.tsx
import { forwardRef, ButtonHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import styles from './Button.module.css';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  as?: typeof Link | 'a' | 'button';
  to?: string;
  href?: string;
  children: ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      as: Component = 'button',
      to,
      href,
      children,
      className = '',
      ...rest
    },
    ref
  ) => {
    const classNames = `${styles.button} ${styles[`button--${variant}`]} ${styles[`button--${size}`]} ${fullWidth ? styles['button--full-width'] : ''} ${className}`;

    if (Component === Link && to) {
      return (
        <Link to={to} className={classNames} {...rest}>
          {children}
        </Link>
      );
    }

    if (Component === 'a' && href) {
      return (
        <a href={href} className={classNames} {...rest}>
          {children}
        </a>
      );
    }

    return (
      <button ref={ref} className={classNames} {...rest}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
export default Button;