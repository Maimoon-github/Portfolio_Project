import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merges Tailwind classes intelligently — use everywhere instead of raw clsx. */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}