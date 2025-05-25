
import React from 'react';
import { 
  Checkbox as MuiCheckbox, 
  CheckboxProps as MuiCheckboxProps,
  FormControlLabel
} from '@mui/material';
import { cn } from '@/lib/utils';

export interface CheckboxProps extends Omit<MuiCheckboxProps, 'size'> {
  className?: string;
  label?: string;
}

export const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(
  ({ className, label, ...props }, ref) => {
    const checkbox = (
      <MuiCheckbox
        ref={ref}
        size="small"
        className={cn('p-0', className)}
        {...props}
      />
    );

    if (label) {
      return (
        <FormControlLabel
          control={checkbox}
          label={label}
          className="text-sm"
        />
      );
    }

    return checkbox;
  }
);

Checkbox.displayName = 'Checkbox';
