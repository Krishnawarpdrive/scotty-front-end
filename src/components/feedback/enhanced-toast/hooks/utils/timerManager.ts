
import { useRef, useCallback } from 'react';
import { ToastInstance } from '../../types/ToastTypes';
import { getDefaultDuration } from '../../utils/ToastUtils';

export const useTimerManager = () => {
  const timersRef = useRef<Map<string, NodeJS.Timeout>>(new Map());
  const pausedTimersRef = useRef<Map<string, number>>(new Map());

  const clearTimer = useCallback((id: string) => {
    const timer = timersRef.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timersRef.current.delete(id);
    }
  }, []);

  const startTimer = useCallback((toast: ToastInstance, onDismiss: (id: string) => void) => {
    if (toast.persistent || toast.duration === 0) return;

    const duration = toast.duration || getDefaultDuration(
      toast.type || 'info', 
      toast.priority || 'medium'
    );

    const timer = setTimeout(() => {
      onDismiss(toast.id);
    }, duration);

    timersRef.current.set(toast.id, timer);
  }, []);

  const pauseTimer = useCallback((id: string) => {
    const timer = timersRef.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timersRef.current.delete(id);
      pausedTimersRef.current.set(id, Date.now());
    }
  }, []);

  const resumeTimer = useCallback((id: string, toasts: ToastInstance[], onDismiss: (id: string) => void) => {
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
          const timer = setTimeout(() => onDismiss(id), remainingDuration);
          timersRef.current.set(id, timer);
        } else {
          onDismiss(id);
        }
      }
      pausedTimersRef.current.delete(id);
    }
  }, []);

  const clearAllTimers = useCallback(() => {
    timersRef.current.forEach(timer => clearTimeout(timer));
    timersRef.current.clear();
    pausedTimersRef.current.clear();
  }, []);

  return {
    clearTimer,
    startTimer,
    pauseTimer,
    resumeTimer,
    clearAllTimers
  };
};
