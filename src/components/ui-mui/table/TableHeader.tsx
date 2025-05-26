
import React from 'react';
import { TableHead as MuiTableHead } from '@mui/material';
import { cn } from '@/lib/utils';
import { TableHeaderProps } from './types';

export const TableHeader = React.forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <MuiTableHead
        ref={ref}
        className={cn('bg-gray-50', className)}
        sx={{
          backgroundColor: '#f9fafb',
          '& .MuiTableCell-root': {
            backgroundColor: '#f9fafb',
            fontWeight: 500,
            fontSize: '12px',
            color: '#262626',
            textTransform: 'uppercase',
            letterSpacing: '0.025em',
            height: '48px',
            borderBottom: '1px solid #e5e7eb',
            fontFamily: 'Rubik, sans-serif',
          }
        }}
        {...props}
      >
        {children}
      </MuiTableHead>
    );
  }
);

TableHeader.displayName = 'TableHeader';
