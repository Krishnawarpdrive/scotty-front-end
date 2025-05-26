
import React from 'react';
import { TableCell as MuiTableCell } from '@mui/material';
import { cn } from '@/lib/utils';
import { TableHeadProps } from './types';

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
        sx={{
          fontFamily: 'Rubik, sans-serif',
          fontWeight: 500,
          fontSize: '12px',
          color: '#262626',
          textTransform: 'uppercase',
          letterSpacing: '0.025em',
          backgroundColor: '#f9fafb',
          height: '48px',
          padding: '8px 16px',
        }}
        {...props}
      >
        {children}
      </MuiTableCell>
    );
  }
);

TableHead.displayName = 'TableHead';
