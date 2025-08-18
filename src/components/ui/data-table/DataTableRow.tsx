
import { TableCell, TableRow } from "@/components/ui/table";
import { getColumnValue } from './utils';
import { DataTableColumn } from './DataTable';

interface DataTableRowProps {
  row: any;
  columns: DataTableColumn[];
  onRowClick?: (row: any) => void;
}

export function DataTableRow({ row, columns, onRowClick }: DataTableRowProps) {
  return (
    <TableRow
      className={onRowClick ? "cursor-pointer hover:bg-muted/50" : ""}
      onClick={() => onRowClick?.(row)}
    >
      {columns.map((column) => (
        <TableCell key={column.id}>
          {column.cell 
            ? column.cell(row)
            : getColumnValue(row, column.accessorKey || column.id)
          }
        </TableCell>
      ))}
    </TableRow>
  );
}
