
import React from 'react';
import { 
  TextField as MuiTextField, 
  TextFieldProps as MuiTextFieldProps 
} from '@mui/material';
import { cn } from '@/lib/utils';

export interface TextFieldProps extends Omit<MuiTextFieldProps, 'classes'> {
  className?: string;
}

export const TextField = React.forwardRef<HTMLDivElement, TextFieldProps>(
  ({ className, InputProps, ...props }, ref) => {
    return (
      <MuiTextField
        ref={ref}
        className={cn('', className)}
        InputProps={{
          ...InputProps,
          className: cn('h-input-height', InputProps?.className),
        }}
        {...props}
      />
    );
  }
);

TextField.displayName = 'TextField';
