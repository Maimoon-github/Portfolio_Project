// specialist-portfolio/src/components/ui/FilterBar/FilterBar.types.ts
export interface FilterBarProps {
  /** Array of filter option strings */
  filters: readonly string[];
  /** Currently active filter */
  activeFilter: string;
  /** Callback when filter changes */
  onFilterChange: (filter: string) => void;
  /** Accessible label for the radiogroup */
  ariaLabel?: string;
  /** Additional CSS class name */
  className?: string;
}