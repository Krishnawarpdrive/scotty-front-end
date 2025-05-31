
import React from 'react';
import { toast } from 'sonner';
import { CheckCircle, AlertCircle, Info, X, Clock } from 'lucide-react';

interface ToastOptions {
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  duration?: number;
}

export const useEnhancedToast = () => {
  const showSuccess = (options: ToastOptions) => {
    toast.success(options.title, {
      description: options.description,
      duration: options.duration || 4000,
      icon: <CheckCircle className="h-4 w-4" />,
      action: options.action ? {
        label: options.action.label,
        onClick: options.action.onClick,
      } : undefined,
    });
  };

  const showError = (options: ToastOptions) => {
    toast.error(options.title, {
      description: options.description,
      duration: options.duration || 6000,
      icon: <AlertCircle className="h-4 w-4" />,
      action: options.action ? {
        label: options.action.label,
        onClick: options.action.onClick,
      } : undefined,
    });
  };

  const showInfo = (options: ToastOptions) => {
    toast.info(options.title, {
      description: options.description,
      duration: options.duration || 4000,
      icon: <Info className="h-4 w-4" />,
      action: options.action ? {
        label: options.action.label,
        onClick: options.action.onClick,
      } : undefined,
    });
  };

  const showWarning = (options: ToastOptions) => {
    toast.warning(options.title, {
      description: options.description,
      duration: options.duration || 5000,
      icon: <Clock className="h-4 w-4" />,
      action: options.action ? {
        label: options.action.label,
        onClick: options.action.onClick,
      } : undefined,
    });
  };

  const showPromise = <T,>(
    promise: Promise<T>,
    options: {
      loading: string;
      success: string | ((data: T) => string);
      error: string | ((error: any) => string);
    }
  ) => {
    return toast.promise(promise, {
      loading: options.loading,
      success: options.success,
      error: options.error,
    });
  };

  return {
    success: showSuccess,
    error: showError,
    info: showInfo,
    warning: showWarning,
    promise: showPromise,
  };
};
