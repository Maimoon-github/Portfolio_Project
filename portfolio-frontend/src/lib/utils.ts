// src/lib/utils.ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges Tailwind CSS classes with conditional logic using clsx,
 * then deduplicates and resolves conflicts with tailwind-merge.
 *
 * @param inputs - ClassValue array (strings, objects, arrays)
 * @returns Optimized className string
 *
 * @example
 * cn('px-2 py-1', isActive && 'bg-primary', 'px-4') // 'py-1 bg-primary px-4'
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}