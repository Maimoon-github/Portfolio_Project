import { memo, ReactNode } from 'react';
import clsx from 'clsx';
import styles from './DataTable.module.css';
import type { ColumnDef } from './DataTable.types';

export interface TableRowProps<T extends Record<string, unknown>> {
  /** Data item for this row */
  dataItem: T;
  /** Column definitions */
  columns: ColumnDef<T>[];
  /** Row index (for alternating styling) */
  rowIndex: number;
  /** Optional click handler for row selection */
  onClick?: (item: T) => void;
  /** Additional CSS class name */
  className?: string;
}

/**
 * Table row component rendering cells based on column definitions.
 * Handles numeric formatting, custom cell renderers, and accessibility.
 */
const TableRow = <T extends Record<string, unknown>>({
  dataItem,
  columns,
  rowIndex,
  onClick,
  className,
}: TableRowProps<T>) => {
  const handleClick = () => {
    if (onClick) {
      onClick(dataItem);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (onClick && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick(dataItem);
    }
  };

  const rowClasses = clsx(
    styles.tr,
    rowIndex % 2 === 0 ? styles.rowEven : styles.rowOdd,
    onClick && styles.rowClickable,
    className
  );

  const cellValue = (column: ColumnDef<T>): ReactNode => {
    // Custom render function takes precedence
    if (column.cell) {
      return column.cell(dataItem);
    }

    // Use accessor if provided
    const value = column.accessor
      ? column.accessor(dataItem)
      : dataItem[column.key];

    // Format based on type
    if (column.type === 'number' && typeof value === 'number') {
      // Basic number formatting (could be enhanced with Intl)
      return value.toLocaleString();
    }

    // Default: render as string
    return String(value ?? '');
  };

  return (
    <tr
      className={rowClasses}
      onClick={onClick ? handleClick : undefined}
      onKeyDown={onClick ? handleKeyDown : undefined}
      tabIndex={onClick ? 0 : undefined}
      role={onClick ? 'button' : undefined}
    >
      {columns.map((column, colIndex) => {
        const isNumeric = column.type === 'number';
        const isFirstCell = colIndex === 0;

        return (
          <td
            key={String(column.key)}
            className={clsx(
              styles.td,
              isNumeric && styles.tdNumeric,
              column.cellClassName
            )}
            style={{ textAlign: column.align || 'left' }}
            scope={isFirstCell ? 'row' : undefined}
          >
            {isNumeric ? (
              <span className={styles.numericValue}>{cellValue(column)}</span>
            ) : (
              cellValue(column)
            )}
          </td>
        );
      })}
    </tr>
  );
};

TableRow.displayName = 'TableRow';

export default memo(TableRow) as typeof TableRow;