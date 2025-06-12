
import { DataTableColumn } from './types';
import { getColumnValue } from './utils';

interface DataTableRowProps<T> {
  item: T;
  columns: DataTableColumn<T>[];
  onRowClick?: (item: T) => void;
}

export function DataTableRow<T>({
  item,
  columns,
  onRowClick,
}: DataTableRowProps<T>) {
  return (
    <tr 
      className="border-b transition-colors hover:bg-muted/50 cursor-pointer"
      onClick={() => onRowClick?.(item)}
    >
      {columns.map((column) => {
        const value = column.cell 
          ? column.cell(item)
          : column.accessorKey ? getColumnValue(item, String(column.accessorKey)) : '';
        
        return (
          <td 
            key={column.id}
            className="h-12 px-4 text-left align-middle text-sm"
            style={{ width: column.width }}
          >
            {value}
          </td>
        );
      })}
    </tr>
  );
}
