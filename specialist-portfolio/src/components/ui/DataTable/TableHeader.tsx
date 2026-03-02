import { memo } from 'react';
import clsx from 'clsx';
import styles from './DataTable.module.css';
import type { ColumnDef } from './DataTable.types';

export interface TableHeaderProps<T extends Record<string, unknown>> {
  /** Column definitions for the table */
  columns: ColumnDef<T>[];
  /** Current sorting state */
  sortState?: { key: string; direction: 'asc' | 'desc' };
  /** Callback when sort column changes */
  onSortChange?: (key: string) => void;
  /** Additional CSS class name */
  className?: string;
}

/**
 * Table header component with sortable columns.
 * Renders `<thead>` with sortable headers and accessibility attributes.
 */
const TableHeader = <T extends Record<string, unknown>>({
  columns,
  sortState,
  onSortChange,
  className,
}: TableHeaderProps<T>) => {
  const handleSort = (key: string) => {
    if (onSortChange) {
      onSortChange(key);
    }
  };

  const getSortIndicator = (key: string): string => {
    if (!sortState || sortState.key !== key) return '';
    return sortState.direction === 'asc' ? styles.sortAsc : styles.sortDesc;
  };

  return (
    <thead className={clsx(styles.thead, className)}>
      <tr>
        {columns.map((column) => {
          const isSortable = column.sortable ?? true;
          const sortIndicator = getSortIndicator(String(column.key));
          const ariaSort =
            sortState?.key === String(column.key)
              ? sortState.direction === 'asc'
                ? 'ascending'
                : 'descending'
              : 'none';

          return (
            <th
              key={String(column.key)}
              scope="col"
              className={clsx(
                styles.th,
                column.type === 'number' && styles.thNumeric,
                isSortable && styles.thSortable,
                sortIndicator
              )}
              aria-sort={isSortable ? ariaSort : undefined}
              onClick={() => isSortable && handleSort(String(column.key))}
              onKeyDown={(e) => {
                if (isSortable && (e.key === 'Enter' || e.key === ' ')) {
                  e.preventDefault();
                  handleSort(String(column.key));
                }
              }}
              tabIndex={isSortable ? 0 : undefined}
              style={{ textAlign: column.align || 'left' }}
            >
              <div className={styles.thContent}>
                <span>{column.header}</span>
                {isSortable && (
                  <span className={styles.sortIndicator} aria-hidden="true">
                    {sortState?.key === String(column.key)
                      ? sortState.direction === 'asc'
                        ? '↑'
                        : '↓'
                      : '↕'}
                  </span>
                )}
              </div>
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

TableHeader.displayName = 'TableHeader';

export default memo(TableHeader) as typeof TableHeader;