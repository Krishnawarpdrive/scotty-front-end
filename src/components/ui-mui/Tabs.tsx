
import React from 'react';
import {
  Tabs as MuiTabs,
  Tab as MuiTab,
  TabsProps as MuiTabsProps,
} from '@mui/material';
import { cn } from '@/lib/utils';

export interface TabsProps extends Omit<MuiTabsProps, 'onChange'> {
  className?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

export interface TabsListProps {
  className?: string;
  children: React.ReactNode;
}

export interface TabsTriggerProps {
  className?: string;
  value: string;
  children: React.ReactNode;
  disabled?: boolean;
}

export interface TabsContentProps {
  className?: string;
  value: string;
  children: React.ReactNode;
}

export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  ({ className, defaultValue, onValueChange, children, ...props }, ref) => {
    const [value, setValue] = React.useState(defaultValue || '');

    const handleChange = (_: React.SyntheticEvent, newValue: string) => {
      setValue(newValue);
      if (onValueChange) {
        onValueChange(newValue);
      }
    };

    return (
      <div ref={ref} className={cn('', className)} {...props}>
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, { value, onChange: handleChange } as any);
          }
          return child;
        })}
      </div>
    );
  }
);

export const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(
  ({ className, children }, ref) => {
    return (
      <MuiTabs
        ref={ref as any}
        className={cn('inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground', className)}
      >
        {children}
      </MuiTabs>
    );
  }
);

export const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className, value, children, disabled }, ref) => {
    return (
      <MuiTab
        ref={ref as any}
        value={value}
        label={children}
        disabled={disabled}
        className={cn(
          'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm',
          className
        )}
      />
    );
  }
);

export const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className, children }, ref) => {
    return (
      <div
        ref={ref}
        role="tabpanel"
        className={cn(
          'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          className
        )}
      >
        {children}
      </div>
    );
  }
);

Tabs.displayName = 'Tabs';
TabsList.displayName = 'TabsList';
TabsTrigger.displayName = 'TabsTrigger';
TabsContent.displayName = 'TabsContent';
