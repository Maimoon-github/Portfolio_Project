'use client';

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "./utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none",
  {
    variants: {
      variant: {
        default: "bg-[var(--color-primary)] text-[var(--color-on-primary)] hover:bg-[var(--color-primary)]/90",
        destructive:
          "bg-[var(--color-error)] text-[var(--color-on-error)] hover:bg-[var(--color-error)]/90",
        outline:
          "border border-[var(--color-glass-border)] bg-[var(--color-background)] text-[var(--color-on-background)] hover:bg-[var(--color-accent)] hover:text-[var(--color-on-accent)]",
        secondary:
          "bg-[var(--color-secondary)] text-[var(--color-on-secondary)] hover:bg-[var(--color-secondary)]/80",
        ghost:
          "hover:bg-[var(--color-accent)] hover:text-[var(--color-on-accent)]",
        link: "text-[var(--color-primary)] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };