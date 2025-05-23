
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
      {columns.map((column, index) => {
        // Define static widths for each column to prevent hover width changes
        const getColumnWidth = (columnId: string) => {
          switch (columnId) {
            case 'clientName':
            case 'roleName':
            case 'requirementId':
            case 'taName':
              return 'w-[180px]';
            case 'rolesProgress':
            case 'vacancies':
            case 'assignedRoles':
            case 'openRequirements':
              return 'w-[120px]';
            case 'unassignedRoles':
            case 'taAssigned':
            case 'efficiency':
              return 'w-[100px]';
            case 'nextDueDate':
            case 'dueDate':
              return 'w-[110px]';
            case 'priority':
            case 'status':
            case 'candidateStageProgress':
              return 'w-[90px]';
            case 'alertReason':
              return 'w-[180px]';
            case 'cta':
              return 'w-[140px]';
            case 'clientName':
            case 'linkedRole':
              return 'w-[120px]';
            case 'candidateProgress':
              return 'w-[130px]';
            default:
              return 'w-[120px]';
          }
        };

        return (
          <TableCell 
            key={column.id}
            className={cn(
              "text-[12px] text-[#262626] transition-colors",
              getColumnWidth(column.id),
              "overflow-hidden"
            )}
          >
            {column.cell ? column.cell(item) : item[column.id]}
          </TableCell>
        );
      })}
    </TableRow>
  );
}
