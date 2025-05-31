
import { useCallback } from 'react';
import { ToastOptions, ToastPromiseOptions } from '../types/ToastTypes';
import { useToastStateManager } from './utils/toastStateManager';
import { useTimerManager } from './utils/timerManager';
import { usePromiseHandler } from './utils/promiseHandler';

export const useToastManager = () => {
  const {
    toasts,
    addToast,
    removeToast,
    updateToast,
    clearAllToasts
  } = useToastStateManager();

  const {
    clearTimer,
    startTimer,
    pauseTimer,
    resumeTimer,
    clearAllTimers
  } = useTimerManager();

  const dismissToast = useCallback((id: string) => {
    removeToast(id);
    clearTimer(id);
  }, [removeToast, clearTimer]);

  const showToast = useCallback((options: ToastOptions): string => {
    const id = addToast(options);
    
    // Find the toast that was just added to start its timer
    const toast = { ...options, id, createdAt: new Date(), isVisible: true };
    startTimer(toast, dismissToast);

    return id;
  }, [addToast, startTimer, dismissToast]);

  const dismissAll = useCallback(() => {
    clearAllToasts();
    clearAllTimers();
  }, [clearAllToasts, clearAllTimers]);

  const pauseToast = useCallback((id: string) => {
    pauseTimer(id);
  }, [pauseTimer]);

  const resumeToast = useCallback((id: string) => {
    resumeTimer(id, toasts, dismissToast);
  }, [resumeTimer, toasts, dismissToast]);

  const { handlePromise } = usePromiseHandler(showToast, dismissToast);

  const promise = useCallback(<T>(
    promiseInstance: Promise<T>, 
    options: ToastPromiseOptions<T>
  ): Promise<T> => {
    return handlePromise(promiseInstance, options);
  }, [handlePromise]);

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
