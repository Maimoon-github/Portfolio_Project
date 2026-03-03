// specialist-portfolio/src/utils/cn.ts

/**
 * cn.ts
 * Conditional class name joining utility.
 * Filters out falsy values and joins remaining strings with a space.
 * Similar to clsx [citation:2][citation:5][citation:10], but lightweight.
 */

/**
 * Joins class names conditionally, filtering out falsy values.
 *
 * @param classes - Any number of class name strings or falsy values.
 * @returns A single string of space‑separated class names.
 *
 * @example
 * cn('btn', isActive && 'active', false, undefined) // → 'btn active'
 * cn('foo', { bar: true } is not supported – use plain strings/conditions.
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}