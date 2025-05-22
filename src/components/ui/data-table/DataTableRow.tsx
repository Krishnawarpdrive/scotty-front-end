
import React from 'react';
import { TableRow, TableCell } from "@/components/ui/table";
import { DataTableColumn } from './types';
import { cn } from "@/lib/utils";

export interface DataTableRowProps<T> {
  item: T;
  columns: DataTableColumn<T>[];
  onRowClick?: (item: T) => void;
}

export function DataTableRow<T extends Record<string, any>>({ 
  item, 
  columns,
  onRowClick,
}: DataTableRowProps<T>) {
  return (
    <TableRow
      className={cn(
        "group",
        onRowClick && "cursor-pointer hover:bg-muted/60"
      )}
      onClick={() => onRowClick && onRowClick(item)}
    >
      {columns.map((column) => {
        return (
          <TableCell 
            key={column.id}
            className="text-[12px] text-[#262626] transition-colors"
          >
            {column.cell ? column.cell(item) : item[column.id]}
          </TableCell>
        );
      })}
    </TableRow>
  );
}
