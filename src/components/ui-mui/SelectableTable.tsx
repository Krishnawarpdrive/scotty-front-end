
import React from 'react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from './Table';
import { Checkbox } from './Checkbox';
import { cn } from '@/lib/utils';

export interface Column<T = any> {
  id: string;
  header: string;
  accessorKey?: string;
  cell?: (item: T) => React.ReactNode;
  className?: string;
}

export interface SelectableTableProps<T = any> {
  data: T[];
  columns: Column<T>[];
  selectedItems?: string[];
  onSelectItem?: (id: string) => void;
  onSelectAll?: () => void;
  onRowClick?: (item: T) => void;
  className?: string;
  getItemId?: (item: T) => string;
  isLoading?: boolean;
  emptyMessage?: string;
}

export function SelectableTable<T = any>({
  data,
  columns,
  selectedItems = [],
  onSelectItem,
  onSelectAll,
  onRowClick,
  className,
  getItemId = (item: any) => item.id,
  isLoading = false,
  emptyMessage = "No data available"
}: SelectableTableProps<T>) {
  const hasSelection = !!onSelectItem;
  const allSelected = data.length > 0 && selectedItems.length === data.length;
  const someSelected = selectedItems.length > 0 && selectedItems.length < data.length;

  if (isLoading) {
    return (
      <div className="w-full overflow-auto">
        <Table className={className}>
          <TableHeader>
            <TableRow>
              {hasSelection && <TableHead className="w-12">SELECT</TableHead>}
              {columns.map((column) => (
                <TableHead key={column.id} className={column.className}>
                  {column.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array(5).fill(0).map((_, i) => (
              <TableRow key={i}>
                {hasSelection && (
                  <TableCell>
                    <div className="h-4 w-4 bg-gray-200 rounded animate-pulse" />
                  </TableCell>
                )}
                {columns.map((column) => (
                  <TableCell key={column.id}>
                    <div className="h-4 bg-gray-200 rounded animate-pulse" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="w-full overflow-auto">
        <Table className={className}>
          <TableHeader>
            <TableRow>
              {hasSelection && <TableHead className="w-12">SELECT</TableHead>}
              {columns.map((column) => (
                <TableHead key={column.id} className={column.className}>
                  {column.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell colSpan={columns.length + (hasSelection ? 1 : 0)} className="text-center py-8 text-gray-500">
                {emptyMessage}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    );
  }

  return (
    <div className="w-full overflow-auto">
      <Table className={className}>
        <TableHeader>
          <TableRow>
            {hasSelection && (
              <TableHead className="w-12">
                <Checkbox
                  checked={allSelected}
                  indeterminate={someSelected}
                  onChange={onSelectAll}
                  className="mx-auto"
                />
              </TableHead>
            )}
            {columns.map((column) => (
              <TableHead key={column.id} className={column.className}>
                {column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => {
            const itemId = getItemId(item);
            const isSelected = selectedItems.includes(itemId);
            
            return (
              <TableRow
                key={itemId}
                className={cn(
                  onRowClick && 'cursor-pointer',
                  isSelected && 'bg-blue-50'
                )}
                onClick={() => onRowClick?.(item)}
                data-state={isSelected ? 'selected' : undefined}
              >
                {hasSelection && (
                  <TableCell>
                    <Checkbox
                      checked={isSelected}
                      onChange={() => onSelectItem?.(itemId)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </TableCell>
                )}
                {columns.map((column) => (
                  <TableCell key={column.id} className={column.className}>
                    {column.cell 
                      ? column.cell(item) 
                      : column.accessorKey 
                        ? (item as any)[column.accessorKey]
                        : ''
                    }
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
