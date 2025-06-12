
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ActionContext, PendingTask, SmartNotification } from '@/services/SmartActionContextService';

interface SmartAction {
  id: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  onClick: () => void;
  condition?: () => boolean;
  priority?: 'urgent' | 'important' | 'contextual';
}

interface SmartActionContextProps {
  actions: SmartAction[];
  registerAction: (action: SmartAction) => void;
  unregisterAction: (actionId: string) => void;
  context: ActionContext | null;
  isVisible: boolean;
  toggleVisibility: () => void;
  handleTaskClick: (task: PendingTask) => void;
  handleActionClick: (action: SmartAction) => void;
  handleNotificationDismiss: (notificationId: string) => void;
}

const SmartActionContext = createContext<SmartActionContextProps | undefined>(undefined);

export const SmartActionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [actions, setActions] = useState<SmartAction[]>([]);
  const [context, setContext] = useState<ActionContext | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const registerAction = (action: SmartAction) => {
    setActions(prevActions => [...prevActions, action]);
  };

  const unregisterAction = (actionId: string) => {
    setActions(prevActions => prevActions.filter(action => action.id !== actionId));
  };

  const toggleVisibility = () => {
    setIsVisible(prev => !prev);
  };

  const handleTaskClick = (task: PendingTask) => {
    console.log('Task clicked:', task);
    task.action();
  };

  const handleActionClick = (action: SmartAction) => {
    console.log('Action clicked:', action);
    action.onClick();
  };

  const handleNotificationDismiss = (notificationId: string) => {
    console.log('Notification dismissed:', notificationId);
  };

  const value: SmartActionContextProps = {
    actions,
    registerAction,
    unregisterAction,
    context,
    isVisible,
    toggleVisibility,
    handleTaskClick,
    handleActionClick,
    handleNotificationDismiss,
  };

  return (
    <SmartActionContext.Provider value={value}>
      {children}
    </SmartActionContext.Provider>
  );
};

export const useSmartActionContext = () => {
  const context = useContext(SmartActionContext);
  if (!context) {
    throw new Error('useSmartActionContext must be used within a SmartActionProvider');
  }
  return context;
};
