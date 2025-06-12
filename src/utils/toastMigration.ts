
import { useUnifiedToast } from '@/hooks/useUnifiedToast';

/**
 * Toast Migration Utility
 * 
 * This utility provides helper functions to migrate from old toast implementations
 * to the new unified toast system. Use these helpers during the migration process.
 */

// Legacy toast compatibility layer
export const createLegacyToastAdapter = () => {
  const toast = useUnifiedToast();

  return {
    // Shadcn toast compatibility
    toast: (options: { title: string; description?: string; variant?: 'default' | 'destructive' }) => {
      if (options.variant === 'destructive') {
        return toast.error({ title: options.title, description: options.description });
      }
      return toast.success({ title: options.title, description: options.description });
    },

    // Sonner compatibility
    success: (message: string) => toast.success(message),
    error: (message: string) => toast.error(message),
    info: (message: string) => toast.info(message),
    warning: (message: string) => toast.warning(message),
    loading: (message: string) => toast.loading(message),

    // Custom enhanced methods
    promise: toast.promise,
    dismiss: toast.dismiss,
    dismissAll: toast.dismissAll,
  };
};

// Type definitions for migration
export interface LegacyToastOptions {
  title: string;
  description?: string;
  variant?: 'default' | 'destructive';
  duration?: number;
}

export interface SonnerToastOptions {
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}
