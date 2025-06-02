
import React, { createContext, useContext } from 'react';
import { ToastContextType, ToastPosition } from '../types/ToastTypes';
import { useToastManager } from '../hooks/useToastManager';
import { EnhancedToastContainer } from '../components/EnhancedToastContainer';
import { useSmartPositioning } from '../hooks/useSmartPositioning';

const EnhancedToastContext = createContext<ToastContextType | undefined>(undefined);

interface EnhancedToastProviderProps {
  children: React.ReactNode;
  position?: ToastPosition;
  maxToasts?: number;
  adaptToViewport?: boolean;
  avoidOverlap?: boolean;
}

export const EnhancedToastProvider: React.FC<EnhancedToastProviderProps> = ({
  children,
  position = 'top-right',
  maxToasts,
  adaptToViewport = true,
  avoidOverlap = true
}) => {
  const toastManager = useToastManager();
  const smartPositioning = useSmartPositioning({
    defaultPosition: position,
    adaptToViewport,
    avoidOverlap
  });

  const effectiveMaxToasts = maxToasts || smartPositioning.getMaxToastsForPosition();
  const spacing = smartPositioning.getSpacingForPosition();

  return (
    <EnhancedToastContext.Provider value={toastManager}>
      {children}
      <EnhancedToastContainer
        toasts={toastManager.toasts}
        position={smartPositioning.position}
        maxToasts={effectiveMaxToasts}
        spacing={spacing}
        onDismiss={toastManager.dismissToast}
        onPause={toastManager.pauseToast}
        onResume={toastManager.resumeToast}
      />
    </EnhancedToastContext.Provider>
  );
};

export const useEnhancedToast = (): ToastContextType => {
  const context = useContext(EnhancedToastContext);
  if (!context) {
    throw new Error('useEnhancedToast must be used within an EnhancedToastProvider');
  }
  return context;
};
