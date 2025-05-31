
import { useCallback } from 'react';
import { 
  useToast,
  createSuccessToast,
  createErrorToast,
  createWarningToast,
  createInfoToast,
  createLoadingToast,
  createUploadToast,
  createDownloadToast,
  createSaveToast,
  createDeleteToast,
  createUserActionToast,
  createSystemToast
} from '../../enhanced-toast';
import { ToastOptions } from '../../enhanced-toast/types/ToastTypes';
import { SuperEnhancedToastOptions, PromiseToastOptions } from '../types/SuperEnhancedToastTypes';

export const useSuperEnhancedToast = () => {
  const { showToast, dismissToast, dismissAll, updateToast, promise } = useToast();

  // Enhanced convenience methods
  const success = useCallback((options: SuperEnhancedToastOptions | string) => {
    const toastOptions = typeof options === 'string' 
      ? createSuccessToast(options)
      : createSuccessToast(options.title, { description: options.description });
    
    if (typeof options === 'object' && options.action) {
      toastOptions.actions = [{
        label: options.action.label,
        onClick: options.action.onClick,
        variant: 'outline'
      }];
    }
    
    if (typeof options === 'object' && options.duration) {
      toastOptions.duration = options.duration;
    }
    
    return showToast(toastOptions);
  }, [showToast]);

  const error = useCallback((options: SuperEnhancedToastOptions | string) => {
    const toastOptions = typeof options === 'string' 
      ? createErrorToast(options)
      : createErrorToast(options.title, { description: options.description });
    
    if (typeof options === 'object' && options.action) {
      toastOptions.actions = [{
        label: options.action.label,
        onClick: options.action.onClick,
        variant: 'outline'
      }];
    }
    
    if (typeof options === 'object' && options.duration) {
      toastOptions.duration = options.duration;
    }
    
    return showToast(toastOptions);
  }, [showToast]);

  const warning = useCallback((options: SuperEnhancedToastOptions | string) => {
    const toastOptions = typeof options === 'string' 
      ? createWarningToast(options)
      : createWarningToast(options.title, { description: options.description });
    
    if (typeof options === 'object' && options.action) {
      toastOptions.actions = [{
        label: options.action.label,
        onClick: options.action.onClick,
        variant: 'outline'
      }];
    }
    
    if (typeof options === 'object' && options.duration) {
      toastOptions.duration = options.duration;
    }
    
    return showToast(toastOptions);
  }, [showToast]);

  const info = useCallback((options: SuperEnhancedToastOptions | string) => {
    const toastOptions = typeof options === 'string' 
      ? createInfoToast(options)
      : createInfoToast(options.title, { description: options.description });
    
    if (typeof options === 'object' && options.action) {
      toastOptions.actions = [{
        label: options.action.label,
        onClick: options.action.onClick,
        variant: 'outline'
      }];
    }
    
    if (typeof options === 'object' && options.duration) {
      toastOptions.duration = options.duration;
    }
    
    return showToast(toastOptions);
  }, [showToast]);

  const loading = useCallback((title: string, description?: string) => {
    return showToast(createLoadingToast(title, { description }));
  }, [showToast]);

  return {
    success,
    error,
    warning,
    info,
    loading,
    dismiss: dismissToast,
    dismissAll,
    update: updateToast,
    promise
  };
};
