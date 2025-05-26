
import React from 'react';
import { Table as MuiTable } from '@mui/material';
import { cn } from '@/lib/utils';
import { TableProps } from './types';

export const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div className="relative w-full overflow-auto">
        <MuiTable
          ref={ref}
          className={cn('w-full caption-bottom', className)}
          sx={{
            fontFamily: 'Rubik, sans-serif',
            fontSize: '12px',
            '& .MuiTableCell-root': {
              fontFamily: 'Rubik, sans-serif',
              fontSize: '12px',
              color: '#262626',
              padding: '12px 16px',
              borderBottom: '1px solid #e5e7eb',
              height: '60px',
            }
          }}
          {...props}
        >
          {children}
        </MuiTable>
      </div>
    );
  }
);

Table.displayName = 'Table';
