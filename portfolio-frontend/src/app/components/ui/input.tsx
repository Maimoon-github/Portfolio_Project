import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * Input — DESIGN.md §5 Input Fields
 * "Sovereign" approach: no bottom line / full box.
 * surface_container_low bg, rounded-sm, ghost border only on focus.
 */
const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      ref={ref}
      className={cn(
        "flex h-10 w-full rounded-sm bg-secondary px-3 py-2",
        "text-base font-normal text-foreground placeholder:text-muted-foreground/50",
        "border border-transparent",
        "transition-colors duration-200",
        "focus:border-[rgba(84,68,52,0.4)] focus:outline-none focus:ring-2 focus:ring-primary/30",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "file:border-0 file:bg-transparent file:text-sm file:font-medium",
        className
      )}
      {...props}
    />
  )
)
Input.displayName = "Input"

export { Input }