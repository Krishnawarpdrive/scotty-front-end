
export interface PendingTask {
  id: string;
  title: string;
  context: string;
  priority: 'urgent' | 'high' | 'medium' | 'low';
  dueDate?: string;
}

export interface SmartNotification {
  id: string;
  title: string;
  message: string;
  type: 'urgent' | 'important' | 'info';
  timestamp: string;
  dismissible?: boolean;
  action?: () => void;
}

export interface SmartAction {
  id: string;
  title: string;
  priority: 'urgent' | 'important' | 'contextual';
  icon: React.ReactNode;
  badge?: string;
  color?: string;
  action: () => void;
  context: string;
}

export interface ActionContext {
  pendingTasks: PendingTask[];
  notifications: SmartNotification[];
  isUrgent: boolean;
}

export class SmartActionContextService {
  static getDefaultContext(): ActionContext {
    return {
      pendingTasks: [],
      notifications: [],
      isUrgent: false
    };
  }

  static getDefaultActions(): SmartAction[] {
    return [];
  }
}
