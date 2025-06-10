
import { useCallback } from 'react';
import { ToastOptions, ToastPromiseOptions } from '../../types/ToastTypes';

export const usePromiseHandler = (
  showToast: (options: ToastOptions) => string,
  dismissToast: (id: string) => void
) => {
  const handlePromise = useCallback(<T>(
    promise: Promise<T>, 
    options: ToastPromiseOptions<T>
  ): Promise<T> => {
    // Show loading toast
    const loadingOptions = typeof options.loading === 'string' 
      ? { title: options.loading, type: 'loading' as const }
      : { ...options.loading, type: 'loading' as const };
    
    const loadingId = showToast(loadingOptions);

    return promise
      .then((data) => {
        dismissToast(loadingId);
        
        let successOptions: ToastOptions;
        if (typeof options.success === 'function') {
          const result = options.success(data);
          successOptions = typeof result === 'string' 
            ? { title: result, type: 'success' as const }
            : { type: 'success' as const, ...result };
        } else if (typeof options.success === 'string') {
          successOptions = { title: options.success, type: 'success' as const };
        } else {
          // Type guard to ensure we have an object before spreading
          const successObj = options.success as ToastOptions;
          successOptions = { 
            type: 'success' as const,
            ...successObj 
          };
        }

        showToast(successOptions);
        return data;
      })
      .catch((error) => {
        dismissToast(loadingId);
        
        let errorOptions: ToastOptions;
        if (typeof options.error === 'function') {
          const result = options.error(error);
          errorOptions = typeof result === 'string'
            ? { title: result, type: 'error' as const }
            : { type: 'error' as const, ...result };
        } else if (typeof options.error === 'string') {
          errorOptions = { title: options.error, type: 'error' as const };
        } else {
          // Type guard to ensure we have an object before spreading
          const errorObj = options.error as ToastOptions;
          errorOptions = { 
            type: 'error' as const,
            ...errorObj 
          };
        }

        showToast(errorOptions);
        throw error;
      })
      .finally(() => {
        options.finally?.();
      });
  }, [showToast, dismissToast]);

  return { handlePromise };
};
