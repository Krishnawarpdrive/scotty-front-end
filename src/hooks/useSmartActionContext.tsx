
import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { SmartActionContextService, ActionContext, PendingTask, SmartAction, SmartNotification } from '@/services/SmartActionContextService';

interface SmartActionState {
  context: ActionContext | null;
  pendingTasks: PendingTask[];
  notifications: SmartNotification[];
  isLoading: boolean;
  actions: any[];
  isVisible: boolean;
}

interface SmartActionContextType extends SmartActionState {
  updateContext: (context: Partial<ActionContext>) => void;
  addPendingTask: (task: PendingTask) => void;
  removePendingTask: (taskId: string) => void;
  executeAction: (action: SmartAction) => Promise<void>;
  toggleVisibility: () => void;
  handleTaskClick: (task: PendingTask) => void;
  handleActionClick: (action: any) => void;
  handleNotificationDismiss: (id: string) => void;
}

const initialState: SmartActionState = {
  context: null,
  pendingTasks: [],
  notifications: [],
  isLoading: false,
  actions: [],
  isVisible: false,
};

type SmartActionActionType =
  | { type: 'SET_CONTEXT'; payload: Partial<ActionContext> }
  | { type: 'ADD_PENDING_TASK'; payload: PendingTask }
  | { type: 'REMOVE_PENDING_TASK'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'TOGGLE_VISIBILITY' }
  | { type: 'ADD_NOTIFICATION'; payload: SmartNotification }
  | { type: 'REMOVE_NOTIFICATION'; payload: string };

const smartActionReducer = (state: SmartActionState, action: SmartActionActionType): SmartActionState => {
  switch (action.type) {
    case 'SET_CONTEXT':
      return {
        ...state,
        context: state.context ? { ...state.context, ...action.payload } : action.payload as ActionContext,
      };
    case 'ADD_PENDING_TASK':
      return {
        ...state,
        pendingTasks: [...state.pendingTasks, action.payload],
      };
    case 'REMOVE_PENDING_TASK':
      return {
        ...state,
        pendingTasks: state.pendingTasks.filter(task => task.id !== action.payload),
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    case 'TOGGLE_VISIBILITY':
      return {
        ...state,
        isVisible: !state.isVisible,
      };
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [...state.notifications, action.payload],
      };
    case 'REMOVE_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.filter(n => n.id !== action.payload),
      };
    default:
      return state;
  }
};

const SmartActionContext = createContext<SmartActionContextType | undefined>(undefined);

interface SmartActionProviderProps {
  children: ReactNode;
}

export const SmartActionProvider: React.FC<SmartActionProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(smartActionReducer, initialState);

  const updateContext = (context: Partial<ActionContext>) => {
    dispatch({ type: 'SET_CONTEXT', payload: context });
  };

  const addPendingTask = (task: PendingTask) => {
    dispatch({ type: 'ADD_PENDING_TASK', payload: task });
  };

  const removePendingTask = (taskId: string) => {
    dispatch({ type: 'REMOVE_PENDING_TASK', payload: taskId });
  };

  const executeAction = async (action: SmartAction) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      await SmartActionContextService.executeAction(action);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const toggleVisibility = () => {
    dispatch({ type: 'TOGGLE_VISIBILITY' });
  };

  const handleTaskClick = (task: PendingTask) => {
    console.log('Task clicked:', task);
  };

  const handleActionClick = (action: any) => {
    console.log('Action clicked:', action);
  };

  const handleNotificationDismiss = (id: string) => {
    dispatch({ type: 'REMOVE_NOTIFICATION', payload: id });
  };

  const value: SmartActionContextType = {
    ...state,
    updateContext,
    addPendingTask,
    removePendingTask,
    executeAction,
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

export const useSmartActionContext = (): SmartActionContextType => {
  const context = useContext(SmartActionContext);
  if (context === undefined) {
    throw new Error('useSmartActionContext must be used within a SmartActionProvider');
  }
  return context;
};
