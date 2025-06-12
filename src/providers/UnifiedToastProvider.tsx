
import React from 'react';
import { EnhancedToastProvider } from '@/components/feedback/enhanced-toast';

interface UnifiedToastProviderProps {
  children: React.ReactNode;
}

/**
 * Unified Toast Provider - Single provider for all toast functionality
 * 
 * This provider ensures consistent toast behavior across the entire application
 * with smart positioning, enhanced animations, and optimal user experience.
 */
export const UnifiedToastProvider: React.FC<UnifiedToastProviderProps> = ({ children }) => {
  return (
    <EnhancedToastProvider
      position="top-right"
      maxToasts={5}
      adaptToViewport={true}
      avoidOverlap={true}
    >
      {children}
    </EnhancedToastProvider>
  );
};

export default UnifiedToastProvider;
