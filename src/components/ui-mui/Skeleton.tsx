
import React from 'react';
import { 
  Skeleton as MuiSkeleton, 
  SkeletonProps as MuiSkeletonProps 
} from '@mui/material';
import { cn } from '@/lib/utils';

export interface SkeletonProps extends MuiSkeletonProps {
  className?: string;
}

export const Skeleton = React.forwardRef<HTMLSpanElement, SkeletonProps>(
  ({ className, ...props }, ref) => {
    return (
      <MuiSkeleton
        ref={ref}
        className={cn('bg-muted', className)}
        {...props}
      />
    );
  }
);

Skeleton.displayName = 'Skeleton';
