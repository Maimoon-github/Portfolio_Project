'use client';

import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";

const toggleVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-[var(--color-accent)] data-[state=on]:text-[var(--color-on-accent)] [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 outline-none transition-[color,box-shadow] whitespace-nowrap",
  {
    variants: {
      variant: {
        default: "bg-transparent hover:bg-[var(--color-surface-container-high)] hover:text-[var(--color-on-background)]",
        outline:
          "border border-[var(--color-glass-border)] bg-transparent hover:bg-[var(--color-accent)] hover:text-[var(--color-on-accent)]",
      },
      size: {
        default: "h-9 px-2 min-w-9",
        sm: "h-8 px-1.5 min-w-8",
        lg: "h-10 px-2.5 min-w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Toggle({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof TogglePrimitive.Root> &
  VariantProps<typeof toggleVariants>) {
  return (
    <TogglePrimitive.Root
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Toggle, toggleVariants };