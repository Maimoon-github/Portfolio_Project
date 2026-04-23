import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

/**
 * Badge — DESIGN.md §5 Data & Technical Badges
 * default: surface_container_highest bg + soft-blue (chart-3) text — "Protective/Technical" feel
 * primary: amber gradient text on dark bg for success/prosperity metrics
 * outline: ghost border only (15% opacity rule)
 */
const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[0.75rem] font-medium uppercase tracking-[0.1em] transition-colors select-none",
  {
    variants: {
      variant: {
        default:
          "bg-accent text-chart-3",                            // tech stack chips
        primary:
          "bg-[linear-gradient(135deg,#ffc68b,#ff9f1c)] text-[#1a0e00]", // prosperity/success
        secondary:
          "bg-secondary text-foreground/80",                   // neutral metadata
        outline:
          "border border-[rgba(84,68,52,0.15)] bg-transparent text-muted-foreground", // ghost
        destructive:
          "bg-destructive/10 text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }