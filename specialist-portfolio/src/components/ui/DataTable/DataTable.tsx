import { useState, useMemo, memo, ReactNode } from 'react';
import styles from './DataTable.module.css';

export interface Column<T extends Record<string, unknown>> {
  /** Key from data object */
  key: keyof T;
  /** Column header text */
  label: string;
  /** Data type for styling and sorting */
  type?: 'text' | 'number' | 'date';
  /** Whether column is sortable */
  sortable?: boolean;
}

export interface DataTableProps<T extends Record<string, unknown>> {
  /** Column definitions */
  columns: Column<T>[];
  /** Data rows */
  data: readonly T[];
  /** Optional initial sort configuration */
  initialSort?: { key: keyof T; direction: 'asc' | 'desc' };
  /** Additional CSS classes */
  className?: string;
}

type SortDirection = 'asc' | 'desc' | null;

/**
 * Data table component with sorting support.
 * Follows "The Data Specialist" design system with Lapis Deep headers
 * and JetBrains Mono for numeric data.
 */
const DataTable = <T extends Record<string, unknown>>({
  columns,
  data,
  initialSort,
  className = '',
}: DataTableProps<T>) => {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T | null;
    direction: SortDirection;
  }>(() => ({
    key: initialSort?.key ?? null,
    direction: initialSort?.direction ?? null,
  }));

  // Handle sort toggle
  const handleSort = (key: keyof T) => {
    setSortConfig((prev) => {
      if (prev.key !== key) {
        return { key, direction: 'asc' };
      }
      if (prev.direction === 'asc') {
        return { key, direction: 'desc' };
      }
      return { key: null, direction: null };
    });
  };

  // Get sort direction for a column
  const getSortDirection = (key: keyof T): SortDirection => {
    return sortConfig.key === key ? sortConfig.direction : null;
  };

  // Get ARIA sort value for column header
  const getAriaSort = (key: keyof T): 'ascending' | 'descending' | 'none' => {
    if (sortConfig.key !== key) return 'none';
    return sortConfig.direction === 'asc' ? 'ascending' : 'descending';
  };

  // Sort data based on current config
  const sortedData = useMemo(() => {
    if (!sortConfig.key || !sortConfig.direction) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key!];
      const bValue = b[sortConfig.key!];

      // Handle undefined/null
      if (aValue == null && bValue == null) return 0;
      if (aValue == null) return 1;
      if (bValue == null) return -1;

      // Compare based on type
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
      }

      // Default string comparison
      const aString = String(aValue);
      const bString = String(bValue);
      const comparison = aString.localeCompare(bString);
      return sortConfig.direction === 'asc' ? comparison : -comparison;
    });
  }, [data, sortConfig]);

  // Determine if column contains numeric data
  const isNumericColumn = (column: Column<T>): boolean => {
    return column.type === 'number';
  };

  // Render sort indicator
  const renderSortIndicator = (direction: SortDirection): ReactNode => {
    if (direction === 'asc') return <span className={styles.sortIndicator}>↑</span>;
    if (direction === 'desc') return <span className={styles.sortIndicator}>↓</span>;
    return <span className={styles.sortIndicator}>↕</span>;
  };

  const tableClasses = [styles.table, className].filter(Boolean).join(' ');

  return (
    <div className={styles.tableContainer}>
      <table className={tableClasses} role="grid">
        <thead className={styles.thead}>
          <tr>
            {columns.map((column) => {
              const sortDirection = getSortDirection(column.key);
              const isSortable = column.sortable ?? true; // Default to sortable

              return (
                <th
                  key={String(column.key)}
                  scope="col"
                  className={[
                    styles.th,
                    isNumericColumn(column) && styles.thNumeric,
                    isSortable && styles.thSortable,
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  aria-sort={isSortable ? getAriaSort(column.key) : undefined}
                  onClick={() => isSortable && handleSort(column.key)}
                  onKeyDown={(e) => {
                    if (isSortable && (e.key === 'Enter' || e.key === ' ')) {
                      e.preventDefault();
                      handleSort(column.key);
                    }
                  }}
                  tabIndex={isSortable ? 0 : undefined}
                  role="columnheader"
                >
                  <div className={styles.thContent}>
                    <span>{column.label}</span>
                    {isSortable && renderSortIndicator(sortDirection)}
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {sortedData.map((row, rowIndex) => (
            <tr key={rowIndex} className={styles.tr}>
              {columns.map((column, colIndex) => {
                const value = row[column.key];
                const isNumeric = isNumericColumn(column);

                return (
                  <td
                    key={String(column.key)}
                    className={[styles.td, isNumeric && styles.tdNumeric]
                      .filter(Boolean)
                      .join(' ')}
                    role="gridcell"
                  >
                    {isNumeric ? (
                      <span className={styles.numericValue}>{String(value)}</span>
                    ) : (
                      String(value)
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default memo(DataTable) as typeof DataTable;