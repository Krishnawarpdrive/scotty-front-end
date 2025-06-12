
import React from 'react';
import { SuperEnhancedToastProvider } from '@/components/feedback/super-enhanced-toast';

interface UnifiedToastProviderProps {
  children: React.ReactNode;
}

export const UnifiedToastProvider: React.FC<UnifiedToastProviderProps> = ({ children }) => {
  return (
    <SuperEnhancedToastProvider>
      {children}
    </SuperEnhancedToastProvider>
  );
};
