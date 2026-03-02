// specialist-portfolio/src/components/ui/DataTable/TableRow.tsx
import React from 'react';
import clsx from 'clsx';
import { Column } from './DataTable.types';
import styles from './DataTable.module.css';

interface TableRowProps<T> {
  row: T;
  columns: Column<T>[];
  rowIndex: number;
  onClick?: (row: T) => void;
}

export function TableRow<T>({ row, columns, rowIndex, onClick }: TableRowProps<T>) {
  const handleClick = () => {
    if (onClick) {
      onClick(row);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (onClick && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick(row);
    }
  };

  const isClickable = Boolean(onClick);

  return (
    <tr
      className={clsx(
        styles.bodyRow,
        isClickable && styles.rowClickable
      )}
      onClick={isClickable ? handleClick : undefined}
      onKeyDown={isClickable ? handleKeyDown : undefined}
      tabIndex={isClickable ? 0 : undefined}
      role={isClickable ? 'button' : undefined}
    >
      {columns.map((col) => {
        // Determine cell content
        let content: React.ReactNode = '';
        if (col.accessor) {
          content = col.accessor(row);
        } else {
          content = row[col.key] as React.ReactNode;
        }

        // Apply number/total styling
        const cellClasses = clsx(
          styles.cell,
          col.align && styles[`text-${col.align}`],
          col.isTotal && styles.totalCell,
          col.isNumber && !col.isTotal && styles.numberCell,
          col.cellClassName
        );

        return (
          <td key={String(col.key)} className={cellClasses}>
            {content}
          </td>
        );
      })}
    </tr>
  );
}