
import { useState, useCallback } from 'react';
import { ToastInstance, ToastOptions } from '../../types/ToastTypes';
import { 
  generateToastId, 
  sortToastsByPriority,
  formatToastMessage 
} from '../../utils/ToastUtils';

export const useToastStateManager = () => {
  const [toasts, setToasts] = useState<ToastInstance[]>([]);

  const addToast = useCallback((options: ToastOptions): string => {
    const id = generateToastId();
    
    const toast: ToastInstance = {
      ...options,
      id,
      title: formatToastMessage(options.title, options.data),
      description: options.description ? formatToastMessage(options.description, options.data) : undefined,
      type: options.type || 'info',
      priority: options.priority || 'medium',
      dismissible: options.dismissible !== false,
      createdAt: new Date(),
      isVisible: true,
    };

    setToasts(prev => {
      const newToasts = [toast, ...prev];
      return sortToastsByPriority(newToasts);
    });

    // Call onShow callback
    options.onShow?.();

    return id;
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => {
      const toast = prev.find(t => t.id === id);
      if (toast) {
        toast.onDismiss?.();
      }
      return prev.filter(t => t.id !== id);
    });
  }, []);

  const updateToast = useCallback((id: string, updates: Partial<ToastOptions>) => {
    setToasts(prev => prev.map(toast => 
      toast.id === id 
        ? { 
            ...toast, 
            ...updates,
            title: updates.title ? formatToastMessage(updates.title, updates.data || toast.data) : toast.title,
            description: updates.description ? formatToastMessage(updates.description, updates.data || toast.data) : toast.description
          }
        : toast
    ));
  }, []);

  const clearAllToasts = useCallback(() => {
    setToasts(prev => {
      prev.forEach(toast => toast.onDismiss?.());
      return [];
    });
  }, []);

  return {
    toasts,
    addToast,
    removeToast,
    updateToast,
    clearAllToasts
  };
};
