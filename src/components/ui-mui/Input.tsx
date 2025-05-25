
import React from 'react';
import { 
  TextField as MuiTextField, 
  TextFieldProps as MuiTextFieldProps 
} from '@mui/material';
import { cn } from '@/lib/utils';

export interface InputProps extends Omit<MuiTextFieldProps, 'variant'> {
  className?: string;
}

export const Input = React.forwardRef<HTMLDivElement, InputProps>(
  ({ className, type = 'text', ...props }, ref) => {
    return (
      <MuiTextField
        ref={ref}
        type={type}
        variant="outlined"
        size="small"
        className={cn('w-full', className)}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';
