
import { toast as sonnerToast } from "sonner";

export interface ToastOptions {
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  duration?: number;
}

export const toast = {
  success: (options: string | ToastOptions) => {
    if (typeof options === 'string') {
      sonnerToast.success(options);
    } else {
      sonnerToast.success(options.title, {
        description: options.description,
        duration: options.duration,
        action: options.action ? {
          label: options.action.label,
          onClick: options.action.onClick,
        } : undefined,
      });
    }
  },
  
  error: (options: string | ToastOptions) => {
    if (typeof options === 'string') {
      sonnerToast.error(options);
    } else {
      sonnerToast.error(options.title, {
        description: options.description,
        duration: options.duration,
        action: options.action ? {
          label: options.action.label,
          onClick: options.action.onClick,
        } : undefined,
      });
    }
  },
  
  info: (options: string | ToastOptions) => {
    if (typeof options === 'string') {
      sonnerToast.info(options);
    } else {
      sonnerToast.info(options.title, {
        description: options.description,
        duration: options.duration,
        action: options.action ? {
          label: options.action.label,
          onClick: options.action.onClick,
        } : undefined,
      });
    }
  },
  
  warning: (options: string | ToastOptions) => {
    if (typeof options === 'string') {
      sonnerToast.warning(options);
    } else {
      sonnerToast.warning(options.title, {
        description: options.description,
        duration: options.duration,
        action: options.action ? {
          label: options.action.label,
          onClick: options.action.onClick,
        } : undefined,
      });
    }
  },
  
  promise: <T,>(
    promise: Promise<T>,
    options: {
      loading: string;
      success: string | ((data: T) => string);
      error: string | ((error: any) => string);
    }
  ) => {
    return sonnerToast.promise(promise, options);
  },
};
