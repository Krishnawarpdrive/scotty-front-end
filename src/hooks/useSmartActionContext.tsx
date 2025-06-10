import React, { createContext, useContext, useState, ReactNode } from 'react';
import { 
  CheckCircle,
  AlertTriangle,
  Calendar,
  Clock,
  FileText,
  Users,
  TrendingUp,
  MessageSquare,
  UserPlus,
  Search,
  Filter,
  Settings,
  Target
} from 'lucide-react';

interface SmartAction {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  priority: 'high' | 'medium' | 'low';
  category: string;
  onClick: () => void;
  isCompleted?: boolean;
  dueDate?: Date;
}

interface SmartActionContextType {
  actions: SmartAction[];
  addAction: (action: SmartAction) => void;
  removeAction: (id: string) => void;
  markCompleted: (id: string) => void;
  getActionsByCategory: (category: string) => SmartAction[];
  getPriorityActions: () => SmartAction[];
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
  const [actions, setActions] = useState<SmartAction[]>([]);

  const addAction = (action: SmartAction) => {
    setActions([...actions, action]);
  };

  const removeAction = (id: string) => {
    setActions(actions.filter(action => action.id !== id));
  };

  const markCompleted = (id: string) => {
    setActions(actions.map(action =>
      action.id === id ? { ...action, isCompleted: true } : action
    ));
  };

  const getActionsByCategory = (category: string): SmartAction[] => {
    return actions.filter(action => action.category === category);
  };

  const getPriorityActions = (): SmartAction[] => {
    return actions.sort((a, b) => {
      const priorityValues = { 'high': 3, 'medium': 2, 'low': 1 };
      return priorityValues[b.priority] - priorityValues[a.priority];
    });
  };

  const value: SmartActionContextType = {
    actions,
    addAction,
    removeAction,
    markCompleted,
    getActionsByCategory,
    getPriorityActions,
  };

  return (
    <SmartActionContext.Provider value={value}>
      {children}
    </SmartActionContext.Provider>
  );
};
