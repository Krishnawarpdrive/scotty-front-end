
import React from 'react';
import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material';
import { cn } from '@/lib/utils';

export interface DesignSystemButtonProps extends MuiButtonProps {
  className?: string;
}

export const DesignSystemButton = React.forwardRef<HTMLButtonElement, DesignSystemButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <MuiButton
        ref={ref}
        className={cn('', className)}
        sx={{
          borderRadius: '6px',
          textTransform: 'none',
          fontWeight: 500,
          fontSize: '13px',
          fontFamily: 'Rubik, sans-serif',
          height: '36px',
          minWidth: 'auto',
          padding: '8px 16px',
          '&.MuiButton-contained': {
            backgroundColor: '#009933',
            '&:hover': {
              backgroundColor: '#00a341',
            },
          },
          '&.MuiButton-outlined': {
            borderColor: '#d1d5db',
            color: '#374151',
            '&:hover': {
              borderColor: '#009933',
              backgroundColor: 'transparent',
            },
          },
        }}
        {...props}
      >
        {children}
      </MuiButton>
    );
  }
);

DesignSystemButton.displayName = 'DesignSystemButton';
