// src/components/ui/button.tsx
// Shadcn/ui-compatible Button primitive using the Mystical Black Lotus
// design tokens.  Supports: default | ghost | outline | destructive + sizes.

'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// ── Variant map ───────────────────────────────────────────────────────────────
const buttonVariants = cva(
  // Base
  [
    'inline-flex items-center justify-center gap-2',
    'font-semibold uppercase tracking-[0.15em] text-[12px]',
    'cursor-pointer select-none whitespace-nowrap',
    'rounded-[var(--radius-sm)]',
    'transition-all duration-[220ms] ease-[var(--ease-spring)]',
    'focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[var(--color-primary)]',
    'disabled:opacity-[var(--opacity-disabled)] disabled:pointer-events-none',
    'active:scale-[0.98]',
  ],
  {
    variants: {
      variant: {
        // Neo-Mint primary CTA
        default: [
          'bg-[var(--color-neo-mint)] text-[#0a0a0a]',
          'shadow-[var(--shadow-glow-neo)]',
          'hover:scale-[1.02] hover:shadow-[0_0_32px_-4px_rgba(0,229,160,0.55)]',
        ],
        // Ghost: violet border, glow on hover
        ghost: [
          'bg-transparent text-[var(--color-primary)]',
          'border border-[var(--color-primary-container)]',
          'hover:scale-[1.02] hover:shadow-[var(--shadow-glow-md)] hover:border-[var(--color-primary)]',
        ],
        // Outline: subtle surface border
        outline: [
          'bg-transparent text-[var(--color-on-surface)]',
          'border border-[var(--color-outline-variant)]',
          'hover:scale-[1.02] hover:border-[var(--color-outline)]',
        ],
        // Destructive
        destructive: [
          'bg-[var(--color-error-container)] text-[var(--color-on-error-container)]',
          'hover:opacity-90',
        ],
        // Link-style — no bg or border
        link: [
          'bg-transparent text-[var(--color-primary)] underline-offset-4',
          'hover:underline normal-case tracking-normal text-[14px]',
        ],
      },
      size: {
        sm:      'px-4 py-2 text-[11px]',
        default: 'px-6 py-3',
        lg:      'px-10 py-[1.125rem] text-[13px]',
        icon:    'h-10 w-10 p-0 rounded-[var(--radius-md)]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

// ── Component ─────────────────────────────────────────────────────────────────
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Merge props onto child element instead of rendering a <button>. */
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };