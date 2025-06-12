import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, UserCheck, FileText, Calendar, DollarSign } from 'lucide-react';

interface SmartAction {
  id: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  onClick: () => void;
  condition?: () => boolean;
}

interface SmartActionContextProps {
  actions: SmartAction[];
  registerAction: (action: SmartAction) => void;
  unregisterAction: (actionId: string) => void;
}

const SmartActionContext = createContext<SmartActionContextProps | undefined>(undefined);

export const SmartActionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [actions, setActions] = useState<SmartAction[]>([]);

  const registerAction = (action: SmartAction) => {
    setActions(prevActions => [...prevActions, action]);
  };

  const unregisterAction = (actionId: string) => {
    setActions(prevActions => prevActions.filter(action => action.id !== actionId));
  };

  const value: SmartActionContextProps = {
    actions,
    registerAction,
    unregisterAction,
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
