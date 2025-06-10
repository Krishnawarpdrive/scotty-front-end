
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { SmartActionContextService, ActionContext, PendingTask, SmartNotification, SmartAction } from '@/services/SmartActionContextService';

interface SmartActionContextType {
  actions: SmartAction[];
  context: ActionContext | null;
  isVisible: boolean;
  addAction: (action: SmartAction) => void;
  removeAction: (id: string) => void;
  markCompleted: (id: string) => void;
  getActionsByCategory: (category: string) => SmartAction[];
  getPriorityActions: () => SmartAction[];
  toggleVisibility: () => void;
  handleTaskClick: (task: PendingTask) => void;
  handleActionClick: (action: SmartAction) => void;
  handleNotificationDismiss: (notificationId: string) => void;
}

const SmartActionContext = createContext<SmartActionContextType | undefined>(undefined);

export const useSmartActionContext = () => {
  const context = useContext(SmartActionContext);
  if (!context) {
    throw new Error('useSmartActionContext must be used within a SmartActionProvider');
  }
  return context;
};

interface SmartActionProviderProps {
  children: ReactNode;
}

export const SmartActionProvider: React.FC<SmartActionProviderProps> = ({ children }) => {
  const [actions, setActions] = useState<SmartAction[]>(SmartActionContextService.getDefaultActions());
  const [context, setContext] = useState<ActionContext>(SmartActionContextService.getDefaultContext());
  const [isVisible, setIsVisible] = useState(false);

  const addAction = (action: SmartAction) => {
    setActions([...actions, action]);
  };

  const removeAction = (id: string) => {
    setActions(actions.filter(action => action.id !== id));
  };

  const markCompleted = (id: string) => {
    // Handle completion logic here
    console.log('Marking completed:', id);
  };

  const getActionsByCategory = (category: string): SmartAction[] => {
    return actions.filter(action => action.priority === category);
  };

  const getPriorityActions = (): SmartAction[] => {
    return actions.sort((a, b) => {
      const priorityValues = { 'urgent': 3, 'important': 2, 'contextual': 1 };
      return priorityValues[b.priority] - priorityValues[a.priority];
    });
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const handleTaskClick = (task: PendingTask) => {
    console.log('Task clicked:', task);
  };

  const handleActionClick = (action: SmartAction) => {
    action.action();
  };

  const handleNotificationDismiss = (notificationId: string) => {
    setContext(prev => ({
      ...prev,
      notifications: prev.notifications.filter(n => n.id !== notificationId)
    }));
  };

  const value: SmartActionContextType = {
    actions,
    context,
    isVisible,
    addAction,
    removeAction,
    markCompleted,
    getActionsByCategory,
    getPriorityActions,
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
