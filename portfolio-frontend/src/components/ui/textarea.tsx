import * as React from "react"
import { cn } from "@/lib/utils"

/** Textarea — same Sovereign approach as Input: surface_container_low, no hard box. */
const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<"textarea">>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "flex min-h-[100px] w-full rounded-sm bg-secondary px-3 py-2.5 resize-y",
        "text-base font-normal text-foreground placeholder:text-muted-foreground/50",
        "border border-transparent",
        "transition-colors duration-200",
        "focus:border-[rgba(84,68,52,0.4)] focus:outline-none focus:ring-2 focus:ring-primary/30",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
)
Textarea.displayName = "Textarea"

export { Textarea }