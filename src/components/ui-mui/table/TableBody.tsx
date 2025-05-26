
import React from 'react';
import { TableBody as MuiTableBody } from '@mui/material';
import { cn } from '@/lib/utils';
import { TableBodyProps } from './types';

export const TableBody = React.forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <MuiTableBody
        ref={ref}
        className={cn('[&_tr:last-child]:border-0', className)}
        sx={{
          '& .MuiTableRow-root:hover': {
            backgroundColor: '#f9fafb',
          },
          '& .MuiTableRow-root:last-child .MuiTableCell-root': {
            borderBottom: 'none',
          },
          '& .MuiTableRow-root': {
            height: '60px',
          },
          '& .MuiTableCell-root': {
            height: '60px',
            padding: '12px 16px',
            fontFamily: 'Rubik, sans-serif',
          }
        }}
        {...props}
      >
        {children}
      </MuiTableBody>
    );
  }
);

TableBody.displayName = 'TableBody';
