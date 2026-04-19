import { cn } from "@/lib/utils/cn";
import React from "react";

export function Chip({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-[color:var(--surface_container_highest)] px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider text-[color:var(--secondary)]",
        className
      )}
    >
      {children}
    </span>
  );
}
