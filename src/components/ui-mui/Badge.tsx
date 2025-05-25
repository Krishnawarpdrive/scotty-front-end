
import React from 'react';
import { 
  Chip as MuiChip, 
  ChipProps as MuiChipProps 
} from '@mui/material';
import { cn } from '@/lib/utils';

export interface BadgeProps extends Omit<MuiChipProps, 'variant' | 'label'> {
  className?: string;
  variant?: 'default' | 'secondary' | 'destructive' | 'outline';
  children: React.ReactNode;
}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    const getVariantStyles = () => {
      switch (variant) {
        case 'secondary':
          return { backgroundColor: '#f1f5f9', color: '#475569' };
        case 'destructive':
          return { backgroundColor: '#fef2f2', color: '#dc2626' };
        case 'outline':
          return { backgroundColor: 'transparent', color: '#374151', border: '1px solid #d1d5db' };
        default:
          return { backgroundColor: '#f9fafb', color: '#111827' };
      }
    };

    return (
      <MuiChip
        ref={ref as any}
        label={children}
        size="small"
        className={cn('h-5 text-xs font-medium', className)}
        sx={getVariantStyles()}
        {...props}
      />
    );
  }
);

Badge.displayName = 'Badge';
