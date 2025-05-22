
import React from 'react';
import { TableRow, TableCell } from "@/components/ui/table";
import { DataTableColumn } from './types';
import { cn } from "@/lib/utils";
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
    <TableRow 
      className={cn(onRowClick && "cursor-pointer hover:bg-gray-50")}
      onClick={() => onRowClick && onRowClick(item)}
    >
      {columns.map((column) => (
        <TableCell key={column.id}>
          {column.cell ? column.cell(item) : getColumnValue(item, column)}
        </TableCell>
      ))}
    </TableRow>
  )
}
