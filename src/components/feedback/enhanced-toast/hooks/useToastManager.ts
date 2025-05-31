
import { useState, useCallback, useRef } from 'react';
import { ToastInstance, ToastOptions, ToastPromiseOptions } from '../types/ToastTypes';
import { 
  generateToastId, 
  getDefaultDuration, 
  sortToastsByPriority,
  formatToastMessage 
} from '../utils/ToastUtils';

export const useToastManager = () => {
  const [toasts, setToasts] = useState<ToastInstance[]>([]);
  const timersRef = useRef<Map<string, NodeJS.Timeout>>(new Map());
  const pausedTimersRef = useRef<Map<string, number>>(new Map());

  const clearTimer = useCallback((id: string) => {
    const timer = timersRef.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timersRef.current.delete(id);
    }
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts(prev => {
      const toast = prev.find(t => t.id === id);
      if (toast) {
        toast.onDismiss?.();
      }
      return prev.filter(t => t.id !== id);
    });
    
    clearTimer(id);
    pausedTimersRef.current.delete(id);
  }, [clearTimer]);

  const startTimer = useCallback((toast: ToastInstance) => {
    if (toast.persistent || toast.duration === 0) return;

    const duration = toast.duration || getDefaultDuration(
      toast.type || 'info', 
      toast.priority || 'medium'
    );

    const timer = setTimeout(() => {
      dismissToast(toast.id);
    }, duration);

    timersRef.current.set(toast.id, timer);
  }, [dismissToast]);

  const showToast = useCallback((options: ToastOptions): string => {
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

    // Start auto-dismiss timer
    startTimer(toast);

    // Call onShow callback
    options.onShow?.();

    return id;
  }, [startTimer]);

  const dismissAll = useCallback(() => {
    setToasts(prev => {
      prev.forEach(toast => toast.onDismiss?.());
      return [];
    });
    
    timersRef.current.forEach(timer => clearTimeout(timer));
    timersRef.current.clear();
    pausedTimersRef.current.clear();
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

  const pauseToast = useCallback((id: string) => {
    const timer = timersRef.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timersRef.current.delete(id);
      pausedTimersRef.current.set(id, Date.now());
    }
  }, []);

  const resumeToast = useCallback((id: string) => {
    const pausedAt = pausedTimersRef.current.get(id);
    if (pausedAt) {
      const toast = toasts.find(t => t.id === id);
      if (toast) {
        const elapsed = Date.now() - pausedAt;
        const remainingDuration = (toast.duration || getDefaultDuration(
          toast.type || 'info', 
          toast.priority || 'medium'
        )) - elapsed;

        if (remainingDuration > 0) {
          const timer = setTimeout(() => dismissToast(id), remainingDuration);
          timersRef.current.set(id, timer);
        } else {
          dismissToast(id);
        }
      }
      pausedTimersRef.current.delete(id);
    }
  }, [toasts, dismissToast]);

  const promise = useCallback(<T>(
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
            : { ...result, type: 'success' as const };
        } else if (typeof options.success === 'string') {
          successOptions = { title: options.success, type: 'success' as const };
        } else {
          successOptions = { ...options.success, type: 'success' as const };
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
            : { ...result, type: 'error' as const };
        } else if (typeof options.error === 'string') {
          errorOptions = { title: options.error, type: 'error' as const };
        } else {
          errorOptions = { ...options.error, type: 'error' as const };
        }

        showToast(errorOptions);
        throw error;
      })
      .finally(() => {
        options.finally?.();
      });
  }, [showToast, dismissToast]);

  return {
    toasts,
    showToast,
    dismissToast,
    dismissAll,
    updateToast,
    pauseToast,
    resumeToast,
    promise
  };
};
