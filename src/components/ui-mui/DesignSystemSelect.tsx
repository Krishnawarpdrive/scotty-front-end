
import React from 'react';
import { 
  FormControl, 
  InputLabel, 
  Select as MuiSelect, 
  SelectProps as MuiSelectProps,
  MenuItem
} from '@mui/material';
import { cn } from '@/lib/utils';

export interface DesignSystemSelectProps extends Omit<MuiSelectProps<string>, 'onChange'> {
  className?: string;
  label?: string;
  options: Array<{ value: string; label: string }>;
  onChange?: (value: string) => void;
}

export const DesignSystemSelect = React.forwardRef<HTMLDivElement, DesignSystemSelectProps>(
  ({ className, label, options, onChange, ...props }, ref) => {
    const handleChange = (event: any) => {
      if (onChange) {
        onChange(event.target.value as string);
      }
    };

    return (
      <FormControl
        ref={ref}
        fullWidth={props.fullWidth}
        size={props.size}
        className={cn('', className)}
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
          '& .MuiSelect-select': {
            padding: '8px 12px',
            fontSize: '13px',
            fontFamily: 'Rubik, sans-serif',
          },
        }}
      >
        {label && <InputLabel>{label}</InputLabel>}
        <MuiSelect
          onChange={handleChange}
          label={label}
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

DesignSystemSelect.displayName = 'DesignSystemSelect';
