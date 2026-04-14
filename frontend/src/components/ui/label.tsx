import { cn } from "@/lib/utils/cn";
import type { LabelHTMLAttributes } from "react";

type LabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
  className?: string;
};

export function Label({ className, ...props }: LabelProps) {
  return (
    <label
      className={cn(
        "block text-sm font-medium text-slate-700 dark:text-slate-200",
        className
      )}
      {...props}
    />
  );
}
