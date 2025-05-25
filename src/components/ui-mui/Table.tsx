
import React from 'react';
import {
  Table as MuiTable,
  TableHead as MuiTableHead,
  TableBody as MuiTableBody,
  TableRow as MuiTableRow,
  TableCell as MuiTableCell,
  TableContainer as MuiTableContainer,
  Paper,
  TableProps as MuiTableProps,
  TableHeadProps as MuiTableHeadProps,
  TableBodyProps as MuiTableBodyProps,
  TableRowProps as MuiTableRowProps,
  TableCellProps as MuiTableCellProps,
} from '@mui/material';
import { cn } from '@/lib/utils';

export interface TableProps extends MuiTableProps {
  className?: string;
}

export interface TableHeaderProps extends MuiTableHeadProps {
  className?: string;
}

export interface TableBodyProps extends MuiTableBodyProps {
  className?: string;
}

export interface TableRowProps extends MuiTableRowProps {
  className?: string;
}

export interface TableCellProps extends MuiTableCellProps {
  className?: string;
}

export interface TableHeadProps extends MuiTableCellProps {
  className?: string;
}

export const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div className="relative w-full overflow-auto">
        <MuiTable
          ref={ref}
          className={cn('w-full caption-bottom text-sm', className)}
          {...props}
        >
          {children}
        </MuiTable>
      </div>
    );
  }
);

export const TableHeader = React.forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <MuiTableHead
        ref={ref}
        className={cn('[&_tr]:border-b', className)}
        {...props}
      >
        {children}
      </MuiTableHead>
    );
  }
);

export const TableBody = React.forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <MuiTableBody
        ref={ref}
        className={cn('[&_tr:last-child]:border-0', className)}
        {...props}
      >
        {children}
      </MuiTableBody>
    );
  }
);

export const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <MuiTableRow
        ref={ref}
        className={cn(
          'border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted',
          className
        )}
        {...props}
      >
        {children}
      </MuiTableRow>
    );
  }
);

export const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <MuiTableCell
        ref={ref}
        component="th"
        className={cn(
          'h-12 px-4 text-left align-middle font-medium text-[12px] text-[#262626] [&:has([role=checkbox])]:pr-0',
          className
        )}
        {...props}
      >
        {children}
      </MuiTableCell>
    );
  }
);

export const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <MuiTableCell
        ref={ref}
        className={cn(
          'p-4 align-middle text-[12px] text-[#262626] [&:has([role=checkbox])]:pr-0',
          className
        )}
        {...props}
      >
        {children}
      </MuiTableCell>
    );
  }
);

Table.displayName = 'Table';
TableHeader.displayName = 'TableHeader';
TableBody.displayName = 'TableBody';
TableRow.displayName = 'TableRow';
TableHead.displayName = 'TableHead';
TableCell.displayName = 'TableCell';
