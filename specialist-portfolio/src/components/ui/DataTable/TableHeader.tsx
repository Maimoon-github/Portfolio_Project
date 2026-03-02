// specialist-portfolio/src/components/ui/DataTable/TableHeader.tsx
import React from 'react';
import clsx from 'clsx';
import { Column } from './DataTable.types';
import styles from './DataTable.module.css';

interface TableHeaderProps<T> {
  columns: Column<T>[];
}

export function TableHeader<T>({ columns }: TableHeaderProps<T>) {
  return (
    <thead>
      <tr className={styles.headerRow}>
        {columns.map((col) => {
          const alignClass = col.align ? styles[`text-${col.align}`] : '';
          return (
            <th
              key={String(col.key)}
              scope="col"
              className={clsx(styles.headerCell, alignClass)}
            >
              {col.header}
            </th>
          );
        })}
      </tr>
    </thead>
  );
}