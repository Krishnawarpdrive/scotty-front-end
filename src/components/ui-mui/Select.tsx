
import React from 'react';
import {
  Select as MuiSelect,
  SelectProps as MuiSelectProps,
  FormControl,
  InputLabel,
  MenuItem,
} from '@mui/material';
import { cn } from '@/lib/utils';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends Omit<MuiSelectProps<string>, 'onChange'> {
  className?: string;
  label?: string;
  options: SelectOption[];
  onChange?: (value: string) => void;
}

export const Select = React.forwardRef<HTMLDivElement, SelectProps>(
  ({ className, label, options, onChange, ...props }, ref) => {
    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
      if (onChange) {
        onChange(event.target.value as string);
      }
    };

    return (
      <FormControl
        className={cn('h-input-height', className)}
        fullWidth={props.fullWidth}
        size={props.size}
      >
        {label && <InputLabel id={`${props.id || 'select'}-label`}>{label}</InputLabel>}
        <MuiSelect
          ref={ref as any}
          labelId={`${props.id || 'select'}-label`}
          onChange={handleChange as any}
          className="h-input-height"
          variant="outlined"
          {...props}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </MuiSelect>
      </FormControl>
    );
  }
);

Select.displayName = 'Select';
