/**
 * Shared wrapper for all calculator components.
 * Provides consistent layout: input panel left, result panel right.
 * On mobile: stacked vertically.
 */
"use client";

import { cn } from "@/lib/utils/cn";
import { Loader2 } from "lucide-react";

interface CalculatorShellProps {
  title: string;
  description?: string;
  inputs: React.ReactNode;
  result: React.ReactNode;
  isLoading?: boolean;
  error?: string | null;
  className?: string;
}

export function CalculatorShell({
  title,
  description,
  inputs,
  result,
  isLoading = false,
  error,
  className,
}: CalculatorShellProps) {
  return (
    <div className={cn("w-full", className)}>
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
        {description && (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        )}
      </div>

      {/* Two-panel layout */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Inputs */}
        <div className="rounded-lg border bg-card p-6 shadow-sm">{inputs}</div>

        {/* Result */}
        <div
          className={cn(
            "rounded-lg border bg-card p-6 shadow-sm transition-opacity duration-200",
            isLoading && "opacity-60"
          )}
        >
          {isLoading ? (
            <div className="flex h-full min-h-[120px] items-center justify-center">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : error ? (
            <div className="rounded-md bg-destructive/10 p-4 text-sm text-destructive">
              {error}
            </div>
          ) : (
            <div className="calc-result">{result}</div>
          )}
        </div>
      </div>
    </div>
  );
}
