
import React from 'react';
import { SmartActionProvider } from '@/hooks/useSmartActionContext';
import { SmartActionCenter } from '@/components/smart-action-center';

interface SmartActionWrapperProps {
  children: React.ReactNode;
}

export const SmartActionWrapper: React.FC<SmartActionWrapperProps> = ({ children }) => {
  return (
    <SmartActionProvider>
      {children}
      <SmartActionCenter />
    </SmartActionProvider>
  );
};
