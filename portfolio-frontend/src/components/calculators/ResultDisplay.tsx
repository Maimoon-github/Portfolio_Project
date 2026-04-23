// src/components/calculators/ResultDisplay.tsx
import { ReactNode } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface ResultDisplayProps {
  value: string | number
  label?: string
  unit?: string
  breakdown?: ReactNode
  className?: string
}

export function ResultDisplay({
  value,
  label = "Result",
  unit,
  breakdown,
  className,
}: ResultDisplayProps) {
  return (
    <Card className={cn("bg-accent/10 border-accent/20", className)}>
      <CardContent className="p-8 text-center">
        <div className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-1">
          {label}
        </div>
        <div className="text-6xl font-medium text-[#ffc68b] tabular-nums tracking-tighter">
          {value}
          {unit && <span className="text-3xl text-muted-foreground ml-2">{unit}</span>}
        </div>
        {breakdown && <div className="mt-8 text-left">{breakdown}</div>}
      </CardContent>
    </Card>
  )
}