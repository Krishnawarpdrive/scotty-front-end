
import { useCallback } from 'react';
import { useToast } from '../../enhanced-toast';
import { ToastOptions } from '../../enhanced-toast/types/ToastTypes';
import { useSuperEnhancedToast } from './useSuperEnhancedToast';
import { useSpecializedToasts } from './useSpecializedToasts';
import { usePromiseToasts } from './usePromiseToasts';

export const useCombinedSuperEnhancedToast = () => {
  const { showToast } = useToast();
  const basicToasts = useSuperEnhancedToast();
  const specializedToasts = useSpecializedToasts();
  const promiseToasts = usePromiseToasts();

  // Custom toast with full options
  const custom = useCallback((options: ToastOptions) => {
    return showToast(options);
  }, [showToast]);

  return {
    ...basicToasts,
    ...specializedToasts,
    ...promiseToasts,
    custom
  };
};

// Export individual hooks for flexibility
export { useSuperEnhancedToast } from './useSuperEnhancedToast';
export { useSpecializedToasts } from './useSpecializedToasts';
export { usePromiseToasts } from './usePromiseToasts';
