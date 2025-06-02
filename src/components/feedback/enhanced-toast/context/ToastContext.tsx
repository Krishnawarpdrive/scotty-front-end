
import React, { createContext, useContext } from 'react';
import { ToastContextType, ToastPosition } from '../types/ToastTypes';
import { useToastManager } from '../hooks/useToastManager';
import { ToastContainer } from '../components/ToastContainer';

const ToastContext = createContext<ToastContextType | undefined>(undefined);

interface ToastProviderProps {
  children: React.ReactNode;
  position?: ToastPosition;
  maxToasts?: number;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({
  children,
  position = 'top-right',
  maxToasts = 5
}) => {
  const toastManager = useToastManager();

  return (
    <ToastContext.Provider value={toastManager}>
      {children}
      <ToastContainer
        toasts={toastManager.toasts}
        position={position}
        maxToasts={maxToasts}
        onDismiss={toastManager.dismissToast}
        onPause={toastManager.pauseToast}
        onResume={toastManager.resumeToast}
      />
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
