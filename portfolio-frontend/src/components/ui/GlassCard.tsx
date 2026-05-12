import { cn } from "@/lib/utils";
import React from "react";

export function GlassCard({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl", className)}>
      {children}
    </div>
  );
}
