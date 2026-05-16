import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ResultDisplayProps {
  value: string | number;
  label?: string;
  unit?: string;
  breakdown?: ReactNode;
  className?: string;
}

export function ResultDisplay({
  value,
  label = "Result",
  unit,
  breakdown,
  className,
}: ResultDisplayProps) {
  return (
    <Card className={cn("glass rounded-3xl", className)}>
      <CardContent className="p-8 text-center">
        <div className="label-md text-secondary mb-2 tracking-widest">
          {label}
        </div>
        <div className="text-6xl font-semibold text-primary tabular-nums tracking-tighter leading-none">
          {value}
          {unit && <span className="text-3xl text-on-surface-variant ml-2 align-baseline">{unit}</span>}
        </div>
        {breakdown && <div className="mt-8 text-left border-t border-[rgba(84,68,52,0.15)] pt-6">{breakdown}</div>}
      </CardContent>
    </Card>
  );
}