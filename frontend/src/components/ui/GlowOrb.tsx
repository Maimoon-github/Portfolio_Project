import { cn } from "@/lib/utils/cn";
import React from "react";

interface GlowOrbProps {
  className?: string;
  color?: "primary" | "secondary";
  size?: number;
  opacity?: number;
  parallax?: boolean;
}

export function GlowOrb({ 
  className, 
  color = "primary", 
  size = 400,
  opacity = 10,
  parallax = false
}: GlowOrbProps) {
  const bgClass = color === "primary" ? "bg-[color:var(--primary)]" : "bg-[color:var(--secondary)]";
  
  return (
    <div 
      className={cn(
        "absolute rounded-full mix-blend-screen pointer-events-none blur-[60px]",
        bgClass,
        className
      )}
      style={{
        width: size,
        height: size,
        opacity: opacity / 100,
      }}
    />
  );
}
