
import { useSuperEnhancedToast } from './super-enhanced-toast';

interface ToastOptions {
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  duration?: number;
}

// Backward compatibility layer with enhanced features
export const useEnhancedToast = () => {
  const toast = useSuperEnhancedToast();

  const showSuccess = (options: ToastOptions) => {
    return toast.success(options);
  };

  const showError = (options: ToastOptions) => {
    return toast.error(options);
  };

  const showInfo = (options: ToastOptions) => {
    return toast.info(options);
  };

  const showWarning = (options: ToastOptions) => {
    return toast.warning(options);
  };

  const showPromise = <T,>(
    promise: Promise<T>,
    options: {
      loading: string;
      success: string | ((data: T) => string);
      error: string | ((error: any) => string);
    }
  ) => {
    return toast.promise(promise, options);
  };

  return {
    success: showSuccess,
    error: showError,
    info: showInfo,
    warning: showWarning,
    promise: showPromise,
  };
};

// New enhanced toast hook with all Phase 5 features
export const useEnhancedToastV2 = () => {
  return useSuperEnhancedToast();
};
