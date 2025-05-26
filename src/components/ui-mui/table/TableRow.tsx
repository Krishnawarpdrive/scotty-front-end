
import React from 'react';
import { TableRow as MuiTableRow } from '@mui/material';
import { cn } from '@/lib/utils';
import { TableRowProps } from './types';

export const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <MuiTableRow
        ref={ref}
        className={cn(
          'border-b transition-colors hover:bg-gray-50 data-[state=selected]:bg-blue-50',
          className
        )}
        sx={{
          '&:hover': {
            backgroundColor: '#f9fafb',
          },
          '&[data-state=selected]': {
            backgroundColor: '#eff6ff',
          },
          height: '60px',
        }}
        {...props}
      >
        {children}
      </MuiTableRow>
    );
  }
);

TableRow.displayName = 'TableRow';
