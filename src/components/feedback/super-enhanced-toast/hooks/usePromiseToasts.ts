
import { useCallback } from 'react';
import { useToast } from '../../enhanced-toast';
import { PromiseToastOptions } from '../types/SuperEnhancedToastTypes';

export const usePromiseToasts = () => {
  const { promise } = useToast();

  // Advanced promise handling
  const promiseWithToast = useCallback(<T>(
    promiseInstance: Promise<T>,
    options: PromiseToastOptions<T>
  ) => {
    return promise(promiseInstance, {
      loading: options.loading,
      success: options.success,
      error: options.error
    });
  }, [promise]);

  return {
    promise: promiseWithToast
  };
};
