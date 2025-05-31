
import React from 'react';
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
} from './enhanced-toast';
import { ToastOptions } from './enhanced-toast/types/ToastTypes';

interface SuperEnhancedToastOptions {
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  duration?: number;
}

export const useSuperEnhancedToast = () => {
  const { showToast, dismissToast, dismissAll, updateToast, promise } = useToast();

  // Enhanced convenience methods
  const success = (options: SuperEnhancedToastOptions | string) => {
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
  };

  const error = (options: SuperEnhancedToastOptions | string) => {
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
  };

  const warning = (options: SuperEnhancedToastOptions | string) => {
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
  };

  const info = (options: SuperEnhancedToastOptions | string) => {
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
  };

  const loading = (title: string, description?: string) => {
    return showToast(createLoadingToast(title, { description }));
  };

  // Specialized action toasts
  const upload = (filename: string, progress?: number) => {
    return showToast(createUploadToast(filename, { data: { progress } }));
  };

  const download = (filename: string) => {
    return showToast(createDownloadToast(filename));
  };

  const save = (itemName: string, onUndo?: () => void) => {
    const toastOptions = createSaveToast(itemName);
    if (onUndo) {
      toastOptions.actions = [{
        label: 'Undo',
        onClick: onUndo,
        variant: 'outline'
      }];
    }
    return showToast(toastOptions);
  };

  const remove = (itemName: string, onUndo?: () => void) => {
    const toastOptions = createDeleteToast(itemName);
    if (onUndo) {
      toastOptions.actions = [{
        label: 'Undo',
        onClick: onUndo,
        variant: 'outline'
      }];
    }
    return showToast(toastOptions);
  };

  const userAction = (action: string, userName: string) => {
    return showToast(createUserActionToast(action, userName));
  };

  const system = (message: string, isError = false) => {
    return showToast(createSystemToast(message, { type: isError ? 'error' : 'info' }));
  };

  // Advanced promise handling
  const promiseWithToast = <T,>(
    promiseInstance: Promise<T>,
    {
      loading: loadingMessage,
      success: successMessage,
      error: errorMessage
    }: {
      loading: string;
      success: string | ((data: T) => string);
      error: string | ((error: any) => string);
    }
  ) => {
    return promise(promiseInstance, {
      loading: loadingMessage,
      success: successMessage,
      error: errorMessage
    });
  };

  // Custom toast with full options
  const custom = (options: ToastOptions) => {
    return showToast(options);
  };

  return {
    success,
    error,
    warning,
    info,
    loading,
    upload,
    download,
    save,
    remove,
    userAction,
    system,
    custom,
    promise: promiseWithToast,
    dismiss: dismissToast,
    dismissAll,
    update: updateToast
  };
};
