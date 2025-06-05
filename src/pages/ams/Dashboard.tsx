
import React, { useEffect } from 'react';
import { useKeyboardShortcuts } from '@/contexts/KeyboardShortcutsContext';
import { useDashboardShortcuts } from '@/hooks/useDashboardShortcuts';
import EnhancedAMSDashboard from './EnhancedDashboard';

const AMSDashboard: React.FC = () => {
  const { setCurrentScope } = useKeyboardShortcuts();
  
  // Set the scope when component mounts
  useEffect(() => {
    setCurrentScope('dashboard');
    return () => setCurrentScope('global');
  }, [setCurrentScope]);

  // Register dashboard specific shortcuts
  useDashboardShortcuts();

  return <EnhancedAMSDashboard />;
};

export default AMSDashboard;
