
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export interface StatusConfig {
  label: string;
  color: 'green' | 'yellow' | 'red' | 'blue' | 'gray';
  variant: 'default' | 'secondary' | 'outline' | 'destructive';
}

export interface StatusIndicatorProps {
  status: string;
  statusConfig: Record<string, StatusConfig>;
  size?: 'sm' | 'md' | 'lg';
  showDot?: boolean;
  className?: string;
}

const colorClasses = {
  green: 'bg-green-500',
  yellow: 'bg-yellow-500',
  red: 'bg-red-500',
  blue: 'bg-blue-500',
  gray: 'bg-gray-500',
};

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  status,
  statusConfig,
  size = 'md',
  showDot = false,
  className,
}) => {
  const config = statusConfig[status];
  
  if (!config) {
    return (
      <Badge variant="outline" className={className}>
        {status}
      </Badge>
    );
  }

  const dotSizes = {
    sm: 'h-2 w-2',
    md: 'h-2.5 w-2.5',
    lg: 'h-3 w-3',
  };

  return (
    <Badge
      variant={config.variant}
      className={cn(
        'flex items-center gap-1.5',
        size === 'sm' && 'text-xs px-2 py-0.5',
        size === 'lg' && 'text-sm px-3 py-1',
        className
      )}
    >
      {showDot && (
        <div
          className={cn(
            'rounded-full',
            dotSizes[size],
            colorClasses[config.color]
          )}
        />
      )}
      {config.label}
    </Badge>
  );
};

// Predefined status configurations
export const vendorStatusConfig: Record<string, StatusConfig> = {
  active: { label: 'Active', color: 'green', variant: 'default' },
  inactive: { label: 'Inactive', color: 'gray', variant: 'secondary' },
  paused: { label: 'Paused', color: 'yellow', variant: 'secondary' },
  pending: { label: 'Pending', color: 'blue', variant: 'outline' },
};

export const requirementStatusConfig: Record<string, StatusConfig> = {
  open: { label: 'Open', color: 'blue', variant: 'default' },
  'in-progress': { label: 'In Progress', color: 'yellow', variant: 'secondary' },
  closed: { label: 'Closed', color: 'green', variant: 'outline' },
  'on-hold': { label: 'On Hold', color: 'red', variant: 'destructive' },
};

export const priorityStatusConfig: Record<string, StatusConfig> = {
  high: { label: 'High', color: 'red', variant: 'destructive' },
  medium: { label: 'Medium', color: 'yellow', variant: 'secondary' },
  low: { label: 'Low', color: 'gray', variant: 'outline' },
};
