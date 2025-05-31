
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  actions?: React.ReactNode;
  badge?: {
    label: string;
    variant?: 'default' | 'secondary' | 'destructive' | 'outline';
  };
}

export const PageHeader: React.FC<PageHeaderProps> = ({ 
  title, 
  subtitle, 
  children, 
  actions,
  badge 
}) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-semibold text-gray-900 font-rubik">{title}</h1>
          {badge && (
            <Badge variant={badge.variant || 'default'}>
              {badge.label}
            </Badge>
          )}
        </div>
        {subtitle && (
          <p className="text-sm text-gray-600 mt-1 font-rubik">{subtitle}</p>
        )}
      </div>
      {(children || actions) && (
        <div className="flex items-center space-x-3">
          {actions || children}
        </div>
      )}
    </div>
  );
};
