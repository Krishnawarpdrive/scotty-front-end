
import React from 'react';
import { TextField as MuiTextField, TextFieldProps as MuiTextFieldProps } from '@mui/material';
import { cn } from '@/lib/utils';

export interface DesignSystemTextFieldProps extends Omit<MuiTextFieldProps, 'variant'> {
  className?: string;
}

export const DesignSystemTextField = React.forwardRef<HTMLDivElement, DesignSystemTextFieldProps>(
  ({ className, ...props }, ref) => {
    return (
      <MuiTextField
        ref={ref}
        variant="outlined"
        size="small"
        className={cn('w-full', className)}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '6px',
            fontSize: '13px',
            fontFamily: 'Rubik, sans-serif',
            height: '36px',
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#009933',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#009933',
              borderWidth: '1px',
            },
          },
          '& .MuiInputLabel-root': {
            fontSize: '13px',
            fontFamily: 'Rubik, sans-serif',
            '&.Mui-focused': {
              color: '#009933',
            },
          },
          '& .MuiOutlinedInput-input': {
            padding: '8px 12px',
            fontSize: '13px',
            fontFamily: 'Rubik, sans-serif',
          },
        }}
        {...props}
      />
    );
  }
);

DesignSystemTextField.displayName = 'DesignSystemTextField';
