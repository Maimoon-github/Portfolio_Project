'use client';

import * as React from "react";
import { cn } from "./utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "resize-none flex w-full min-h-16 rounded-md border border-[var(--color-glass-border)] bg-[var(--color-background)] px-3 py-2 text-base text-[var(--color-on-background)] placeholder:text-[var(--color-outline)] focus:outline-none focus:border-[var(--color-accent)] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };