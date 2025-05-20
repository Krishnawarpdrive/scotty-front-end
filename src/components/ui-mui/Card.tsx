
import React from 'react';
import { Card as MuiCard, CardProps as MuiCardProps } from '@mui/material';
import { cn } from '@/lib/utils';

export interface CardProps extends MuiCardProps {
  className?: string;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <MuiCard
        ref={ref}
        className={cn('p-card-padding', className)}
        {...props}
      >
        {children}
      </MuiCard>
    );
  }
);

Card.displayName = 'Card';
