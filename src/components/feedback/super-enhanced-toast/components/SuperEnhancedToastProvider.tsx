
import React from 'react';
import { EnhancedToastProvider } from '../../enhanced-toast';

interface SuperEnhancedToastProviderProps {
  children: React.ReactNode;
}

export const SuperEnhancedToastProvider: React.FC<SuperEnhancedToastProviderProps> = ({ children }) => {
  return (
    <EnhancedToastProvider>
      {children}
    </EnhancedToastProvider>
  );
};
