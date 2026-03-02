/**
 * useFilteredProjects.ts
 * Custom hook for filtering and sorting projects.
 * Memoized for performance with large datasets.
 */

import { useMemo } from 'react';
import type { Project, ProjectCategory, ProjectStatus } from '@/types/project.types';

export interface FilterOptions {
  category?: ProjectCategory | 'all';
  status?: ProjectStatus | 'all';
  search?: string;
}

/**
 * useFilteredProjects hook
 * @param projects - Readonly array of all projects
 * @param filters - Filter options (category, status, search)
 * @returns Filtered and sorted readonly array of projects
 *
 * - Filters by category, status, and search (title/summary)
 * - Sorts by: featured first, then year (descending), then title (ascending)
 * - Uses useMemo to recompute only when inputs change
 */
export function useFilteredProjects(
  projects: readonly Project[],
  filters: FilterOptions
): readonly Project[] {
  return useMemo(() => {
    // Start with all projects
    let filtered = [...projects] as Project[]; // copy for mutation, but we'll return readonly

    // Apply category filter
    if (filters.category && filters.category !== 'all') {
      filtered = filtered.filter((p) => p.category === filters.category);
    }

    // Apply status filter
    if (filters.status && filters.status !== 'all') {
      filtered = filtered.filter((p) => p.status === filters.status);
    }

    // Apply search filter (case‑insensitive in title + summary)
    if (filters.search && filters.search.trim() !== '') {
      const query = filters.search.toLowerCase().trim();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.summary.toLowerCase().includes(query) ||
          (p.tags && p.tags.some((tag) => tag.toLowerCase().includes(query)))
      );
    }

    // Sort: featured first, then year (descending), then title (ascending)
    filtered.sort((a, b) => {
      // Featured projects first
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;

      // Then by year (if available)
      if (a.year && b.year) {
        if (a.year !== b.year) return b.year.localeCompare(a.year); // descending
      } else if (a.year && !b.year) return -1;
      else if (!a.year && b.year) return 1;

      // Finally by title alphabetically
      return a.title.localeCompare(b.title);
    });

    return filtered as readonly Project[];
  }, [projects, filters]);
}