import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

/**
 * Button — DESIGN.md §5 Buttons
 * primary:   gradient #ffc68b → #ff9f1c at 135°, no border, rounded-lg, deep-brown text
 * secondary: ghost — no background, outline at 20% opacity, hover → 10% primary bg
 * ghost:     no background, no border, muted text
 * destructive: destructive tint
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-base font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  {
    variants: {
      variant: {
        primary:
          "bg-[linear-gradient(135deg,#ffc68b,#ff9f1c)] text-[#1a0e00] shadow-none hover:opacity-90 active:scale-[0.98]",
        secondary:
          "bg-transparent border border-[rgba(162,141,122,0.2)] text-foreground hover:bg-primary/10 hover:border-primary/30 active:scale-[0.98]",
        ghost:
          "bg-transparent text-muted-foreground hover:bg-accent hover:text-foreground",
        destructive:
          "bg-destructive/10 text-destructive border border-destructive/20 hover:bg-destructive/20",
        link:
          "bg-transparent text-primary underline-offset-4 hover:underline p-0 h-auto",
      },
      size: {
        sm:      "h-8  px-3 text-sm",
        default: "h-10 px-5",
        lg:      "h-12 px-8 text-lg",
        icon:    "h-10 w-10 p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }