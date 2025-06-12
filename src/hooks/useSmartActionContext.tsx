
import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { SmartActionContextService, ActionContext, PendingTask, SmartAction } from '@/services/SmartActionContextService';

interface SmartActionState {
  context: ActionContext | null;
  pendingTasks: PendingTask[];
  notifications: any[];
  isLoading: boolean;
}

interface SmartActionContextType extends SmartActionState {
  updateContext: (context: Partial<ActionContext>) => void;
  addPendingTask: (task: PendingTask) => void;
  removePendingTask: (taskId: string) => void;
  executeAction: (action: SmartAction) => Promise<void>;
}

const initialState: SmartActionState = {
  context: null,
  pendingTasks: [],
  notifications: [],
  isLoading: false,
};

type SmartActionActionType =
  | { type: 'SET_CONTEXT'; payload: Partial<ActionContext> }
  | { type: 'ADD_PENDING_TASK'; payload: PendingTask }
  | { type: 'REMOVE_PENDING_TASK'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean };

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

  const value: SmartActionContextType = {
    ...state,
    updateContext,
    addPendingTask,
    removePendingTask,
    executeAction,
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
