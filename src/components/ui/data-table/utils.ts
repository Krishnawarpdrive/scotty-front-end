
import { DataTableColumn } from './types';

export function getColumnValue<T>(item: T, column: DataTableColumn<T>): any {
  if (typeof column.accessorKey === 'function') {
    return column.accessorKey(item);
  } else {
    return item[column.accessorKey as string];
  }
}
