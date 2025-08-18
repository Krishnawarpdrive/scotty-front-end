
import React from 'react';
import {
  Tabs as MuiTabs,
  TabsProps as MuiTabsProps,
  Tab as MuiTab,
  TabList,
  TabPanel
} from '@mui/material';
import { cn } from '@/lib/utils';

export interface TabsProps extends MuiTabsProps {
  className?: string;
}

export interface TabsListProps {
  className?: string;
  children: React.ReactNode;
}

export interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

export interface TabsContentProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <MuiTabs
        ref={ref as any}
        className={cn('', className)}
        {...props}
      >
        {children}
      </MuiTabs>
    );
  }
);

export const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(
  ({ className, children }) => {
    return (
      <div className={cn('flex border-b', className)}>
        {children}
      </div>
    );
  }
);

export const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className, children, value, ...props }) => {
    return (
      <MuiTab
        label={children}
        value={value}
        className={cn('', className)}
        {...props}
      />
    );
  }
);

export const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className, children, value, ...props }) => {
    return (
      <TabPanel value={value} className={cn('p-4', className)} {...props}>
        {children}
      </TabPanel>
    );
  }
);

Tabs.displayName = 'Tabs';
TabsList.displayName = 'TabsList';
TabsTrigger.displayName = 'TabsTrigger';
TabsContent.displayName = 'TabsContent';
