
import React from 'react';
import { Outlet } from 'react-router-dom';
import { SmartActionProvider } from '@/hooks/useSmartActionContext';

interface EnhancedAMSLayoutProps {
  children?: React.ReactNode;
}

export const EnhancedAMSLayout: React.FC<EnhancedAMSLayoutProps> = ({ children }) => {
  return (
    <SmartActionProvider>
      <div className="min-h-screen bg-background">
        <main className="flex-1">
          {children || <Outlet />}
        </main>
      </div>
    </SmartActionProvider>
  );
};

export default EnhancedAMSLayout;
