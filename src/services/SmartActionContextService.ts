
export interface ActionContext {
  currentPage?: string;
  selectedItems?: string[];
  recentActions?: string[];
  userRole?: string;
}

export interface PendingTask {
  id: string;
  title: string;
  description?: string;
  priority: 'high' | 'medium' | 'low';
  dueDate?: string;
}

export interface SmartAction {
  id: string;
  type: string;
  payload?: any;
}

export class SmartActionContextService {
  static async executeAction(action: SmartAction): Promise<void> {
    console.log('Executing action:', action);
    // Implementation for executing smart actions
    return Promise.resolve();
  }

  static getContext(): ActionContext {
    return {
      currentPage: window.location.pathname,
      selectedItems: [],
      recentActions: [],
      userRole: 'user'
    };
  }
}
