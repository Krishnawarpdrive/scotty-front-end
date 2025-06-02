
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SmartLoadingProps {
  state: 'loading' | 'success' | 'error' | 'idle';
  message?: string;
  className?: string;
  variant?: 'default' | 'table' | 'card' | 'minimal';
}

export const SmartLoading: React.FC<SmartLoadingProps> = ({
  state,
  message,
  className,
  variant = 'default'
}) => {
  if (state === 'idle') return null;

  const renderTableSkeleton = () => (
    <div className="space-y-2">
      <Skeleton className="h-10 w-full" />
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex space-x-4">
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 flex-1" />
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-8 w-20" />
        </div>
      ))}
    </div>
  );

  const renderCardSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="border rounded-lg p-4 space-y-3">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
          <div className="space-y-2">
            <Skeleton className="h-2 w-full" />
            <Skeleton className="h-2 w-4/5" />
          </div>
        </div>
      ))}
    </div>
  );

  if (state === 'loading') {
    return (
      <div className={cn("flex flex-col items-center justify-center py-8", className)}>
        {variant === 'table' && renderTableSkeleton()}
        {variant === 'card' && renderCardSkeleton()}
        {(variant === 'default' || variant === 'minimal') && (
          <>
            <Loader2 className="h-8 w-8 animate-spin text-blue-600 mb-2" />
            <p className="text-sm text-gray-600">{message || 'Loading...'}</p>
          </>
        )}
      </div>
    );
  }

  if (state === 'error') {
    return (
      <div className={cn("flex flex-col items-center justify-center py-8 text-red-600", className)}>
        <AlertCircle className="h-8 w-8 mb-2" />
        <p className="text-sm">{message || 'Something went wrong'}</p>
      </div>
    );
  }

  if (state === 'success') {
    return (
      <div className={cn("flex flex-col items-center justify-center py-4 text-green-600", className)}>
        <CheckCircle className="h-6 w-6 mb-1" />
        <p className="text-sm">{message || 'Success!'}</p>
      </div>
    );
  }

  return null;
};

export const LoadingOverlay: React.FC<{ isLoading: boolean; children: React.ReactNode }> = ({
  isLoading,
  children
}) => (
  <div className="relative">
    {children}
    {isLoading && (
      <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-10">
        <SmartLoading state="loading" variant="minimal" />
      </div>
    )}
  </div>
);
