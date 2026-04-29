"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"
import { cn } from "@/lib/utils"

/**
 * Slider — Calculator Hub sliders.
 * Track: surface_container. Filled range: primary amber. Thumb: #ffc68b with glow.
 * Mirrors the native range styling in globals.css for visual consistency.
 */
const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn("relative flex w-full touch-none select-none items-center", className)}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-secondary">
      <SliderPrimitive.Range className="absolute h-full bg-[linear-gradient(90deg,#ffc68b,#ff9f1c)]" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb
      className={cn(
        "block h-[18px] w-[18px] rounded-full",
        "bg-primary border-2 border-background",
        "shadow-[0_0_0_2px_rgba(255,198,139,0.3)]",
        "transition-shadow duration-150",
        "hover:shadow-[0_0_0_4px_rgba(255,198,139,0.25)]",
        "focus-visible:outline-none focus-visible:shadow-[0_0_0_4px_rgba(255,198,139,0.4)]",
        "disabled:pointer-events-none disabled:opacity-50"
      )}
    />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }