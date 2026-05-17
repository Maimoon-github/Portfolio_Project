'use client';

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { cn } from "./utils";

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row gap-2",
        month: "flex flex-col gap-4",
        caption: "flex justify-center pt-1 relative items-center w-full",
        caption_label: "text-sm font-medium text-[var(--color-on-background)]",
        nav: "flex items-center gap-1",
        nav_button: cn(
          "size-7 bg-transparent p-0 inline-flex items-center justify-center rounded-md border border-[var(--color-glass-border)] text-[var(--color-outline)] hover:bg-[var(--color-accent)] hover:text-[var(--color-on-accent)]",
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-x-1",
        head_row: "flex",
        head_cell: "rounded-md w-8 font-normal text-[0.8rem] text-[var(--color-outline)]",
        row: "flex w-full mt-2",
        cell: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-[var(--color-accent)]",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
            : "[&:has([aria-selected])]:rounded-md",
        ),
        day: cn(
          "size-8 p-0 font-normal inline-flex items-center justify-center rounded-md text-[var(--color-on-background)] hover:bg-[var(--color-surface-container-high)] aria-selected:opacity-100",
        ),
        day_range_start: "day-range-start aria-selected:bg-[var(--color-primary)] aria-selected:text-[var(--color-on-primary)]",
        day_range_end: "day-range-end aria-selected:bg-[var(--color-primary)] aria-selected:text-[var(--color-on-primary)]",
        day_selected:
          "bg-[var(--color-primary)] text-[var(--color-on-primary)] hover:bg-[var(--color-primary)] hover:text-[var(--color-on-primary)] focus:bg-[var(--color-primary)] focus:text-[var(--color-on-primary)]",
        day_today: "bg-[var(--color-surface-container-high)] text-[var(--color-on-background)]",
        day_outside: "day-outside text-[var(--color-outline)] aria-selected:text-[var(--color-outline)]",
        day_disabled: "text-[var(--color-outline)] opacity-50",
        day_range_middle: "aria-selected:bg-[var(--color-accent)] aria-selected:text-[var(--color-on-accent)]",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ className, ...props }) => <ChevronLeft className={cn("size-4", className)} {...props} />,
        IconRight: ({ className, ...props }) => <ChevronRight className={cn("size-4", className)} {...props} />,
      }}
      {...props}
    />
  );
}

export { Calendar };