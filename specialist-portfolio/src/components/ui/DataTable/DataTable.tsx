// specialist-portfolio/src/components/ui/DataTable/DataTable.tsx
import React from 'react';
import clsx from 'clsx';
import { DataTableProps } from './DataTable.types';
import { TableHeader } from './TableHeader';
import { TableRow } from './TableRow';
import styles from './DataTable.module.css';

function DataTable<T extends object>({
  columns,
  data,
  className,
  caption,
  onRowClick,
}: DataTableProps<T>) {
  return (
    <div className={clsx(styles.tableWrapper, className)}>
      <table className={styles.table}>
        {caption && <caption className={styles.caption}>{caption}</caption>}
        <TableHeader columns={columns} />
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className={styles.emptyCell}>
                No data available
              </td>
            </tr>
          ) : (
            data.map((row, index) => (
              <TableRow
                key={index} // Ideally use a unique id from data, but index is fallback
                row={row}
                columns={columns}
                rowIndex={index}
                onClick={onRowClick}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;