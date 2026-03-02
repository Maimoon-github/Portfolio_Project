// specialist-portfolio/src/components/ui/DataTable/DataTable.types.ts
import { ReactNode } from 'react';

/**
 * Column definition for DataTable.
 * @template T - The type of data objects in the table.
 */
export interface Column<T> {
  /** Unique key for the column (used to access data if accessor not provided) */
  key: keyof T;
  /** Header text or element */
  header: ReactNode;
  /** Optional custom accessor function – if not provided, data is accessed via row[key] */
  accessor?: (row: T) => ReactNode;
  /** Text alignment for the column */
  align?: 'left' | 'center' | 'right';
  /** Whether the column contains numbers (applies monospaced font) */
  isNumber?: boolean;
  /** Whether the column contains total values (applies gold color + monospaced font) */
  isTotal?: boolean;
  /** Optional additional CSS class name for cells in this column */
  cellClassName?: string;
}

export interface DataTableProps<T> {
  /** Column definitions */
  columns: Column<T>[];
  /** Array of data objects */
  data: T[];
  /** Optional CSS class name for the wrapper */
  className?: string;
  /** Optional table caption (visible for accessibility, visually hidden) */
  caption?: string;
  /** Optional click handler for rows */
  onRowClick?: (row: T) => void;
}