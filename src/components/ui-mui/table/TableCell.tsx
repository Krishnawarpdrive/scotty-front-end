
import React from 'react';
import { TableCell as MuiTableCell } from '@mui/material';
import { cn } from '@/lib/utils';
import { TableCellProps } from './types';

export const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <MuiTableCell
        ref={ref}
        className={cn(
          'align-middle text-[12px] text-[#262626] [&:has([role=checkbox])]:pr-0',
          className
        )}
        sx={{
          fontFamily: 'Rubik, sans-serif',
          fontSize: '12px',
          color: '#262626',
          padding: '12px 16px',
          height: '60px',
        }}
        {...props}
      >
        {children}
      </MuiTableCell>
    );
  }
);

TableCell.displayName = 'TableCell';
