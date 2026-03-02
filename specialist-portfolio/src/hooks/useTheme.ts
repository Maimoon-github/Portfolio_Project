/**
 * useTheme.ts
 * Custom hook for theme state management with localStorage persistence.
 * Defaults to 'dark' per "The Data Specialist" design system.
 */

import { useState, useEffect, useCallback } from 'react';

export type Theme = 'dark' | 'light';

const STORAGE_KEY = 'theme';
const DEFAULT_THEME: Theme = 'dark';

/**
 * useTheme hook
 * @returns { theme: Theme; toggleTheme: () => void }
 *
 * - Reads initial theme from localStorage (falls back to DEFAULT_THEME)
 * - Persists theme changes to localStorage
 * - Syncs `data-theme` attribute on <html> element for CSS consumption
 * - SSR‑safe (checks for window before accessing browser APIs)
 */
export function useTheme() {
  // Initialize theme state (lazy initializer to avoid hydration mismatch)
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') return DEFAULT_THEME;
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
    return stored === 'light' ? 'light' : DEFAULT_THEME; // only accept 'light' if explicitly stored
  });

  // Sync data-theme attribute and localStorage whenever theme changes
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Update <html> data-theme attribute
    document.documentElement.setAttribute('data-theme', theme);

    // Persist to localStorage
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  // Memoized toggle function
  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  return { theme, toggleTheme };
}