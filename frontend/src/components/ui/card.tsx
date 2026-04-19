import * as React from "react";
import { cn } from "@/lib/utils/cn";

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    surface?: "low" | "default" | "high" | "highest" | "variant";
  }
>(({ className, surface = "default", ...props }, ref) => {
  const surfaceClasses = {
    low: "bg-[color:var(--surface_container_low)]",
    default: "bg-[color:var(--surface_container)]",
    high: "bg-[color:var(--surface_container_high)]",
    highest: "bg-[color:var(--surface_container_highest)]",
    variant: "bg-[color:var(--surface_variant)]/40 backdrop-blur-xl", // For glassmorphism
  };

  return (
    <div
      ref={ref}
      className={cn(
        "rounded-[2rem] overflow-hidden",
        surfaceClasses[surface],
        className
      )}
      {...props}
    />
  );
});
Card.displayName = "Card";

export { Card };
