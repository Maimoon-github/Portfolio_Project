// specialist-portfolio/src/components/ui/FilterBar/FilterBar.tsx
import { useCallback, useRef, KeyboardEvent, memo } from 'react';
import clsx from 'clsx';
import { FilterBarProps } from './FilterBar.types';
import styles from './FilterBar.module.css';

/**
 * FilterBar component with keyboard‑accessible radio‑group behavior.
 * Follows "The Data Specialist" design system.
 */
const FilterBar = memo(
  ({
    filters,
    activeFilter,
    onFilterChange,
    ariaLabel = 'Filter options',
    className,
  }: FilterBarProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

    // Keep refs array in sync with filters length
    buttonRefs.current = buttonRefs.current.slice(0, filters.length);

    const handleKeyDown = useCallback(
      (e: KeyboardEvent<HTMLDivElement>) => {
        const { key } = e;
        const buttons = buttonRefs.current.filter(Boolean) as HTMLButtonElement[];
        if (buttons.length === 0) return;

        const currentIndex = buttons.findIndex((btn) => btn === document.activeElement);
        let nextIndex = -1;

        if (key === 'ArrowRight') {
          e.preventDefault();
          nextIndex = (currentIndex + 1) % buttons.length;
        } else if (key === 'ArrowLeft') {
          e.preventDefault();
          nextIndex = (currentIndex - 1 + buttons.length) % buttons.length;
        } else if (key === 'Enter' || key === ' ') {
          e.preventDefault();
          if (currentIndex !== -1) {
            const selectedFilter = filters[currentIndex];
            if (selectedFilter !== activeFilter) {
              onFilterChange(selectedFilter);
            }
          }
          return;
        } else {
          return;
        }

        if (nextIndex !== -1) {
          buttons[nextIndex].focus();
        }
      },
      [filters, activeFilter, onFilterChange]
    );

    const handleClick = useCallback(
      (filter: string) => {
        if (filter !== activeFilter) {
          onFilterChange(filter);
        }
      },
      [activeFilter, onFilterChange]
    );

    return (
      <div
        ref={containerRef}
        className={clsx(styles.filterBar, className)}
        role="radiogroup"
        aria-label={ariaLabel}
        onKeyDown={handleKeyDown}
      >
        {filters.map((filter, index) => {
          const isActive = filter === activeFilter;
          return (
            <button
              key={filter}
              ref={(el) => (buttonRefs.current[index] = el)}
              className={clsx(styles.filterBar__button, isActive && styles['filterBar__button--active'])}
              role="radio"
              aria-checked={isActive}
              onClick={() => handleClick(filter)}
              tabIndex={isActive ? 0 : -1}
            >
              {filter}
            </button>
          );
        })}
      </div>
    );
  }
);

FilterBar.displayName = 'FilterBar';

export default FilterBar;