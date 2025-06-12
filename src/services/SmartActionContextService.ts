
import { useLocation } from 'react-router-dom';

export interface ActionContext {
  page: string;
  userRole: 'hr' | 'ta' | 'candidate' | 'executive' | 'admin';
  pendingTasks: PendingTask[];
  notifications: SmartNotification[];
  timeContext: 'morning' | 'afternoon' | 'evening';
  isUrgent: boolean;
}

export interface PendingTask {
  id: string;
  type: 'interview' | 'review' | 'document' | 'approval' | 'follow_up';
  priority: 'urgent' | 'high' | 'medium' | 'low';
  title: string;
  dueDate?: string;
  context: string;
  action: () => void;
}

export interface SmartNotification {
  id: string;
  type: 'urgent' | 'important' | 'contextual';
  title: string;
  message: string;
  action?: () => void;
  dismissible: boolean;
  timestamp: string;
}

export interface SmartAction {
  id: string;
  title: string;
  icon: React.ReactNode;
  action: () => void;
  priority: 'urgent' | 'important' | 'contextual';
  context: string[];
  badge?: number;
  color?: string;
}

export class SmartActionContextService {
  private static instance: SmartActionContextService;
  private contextListeners: ((context: ActionContext) => void)[] = [];
  private currentContext: ActionContext | null = null;

  static getInstance(): SmartActionContextService {
    if (!SmartActionContextService.instance) {
      SmartActionContextService.instance = new SmartActionContextService();
    }
    return SmartActionContextService.instance;
  }

  getCurrentContext(): ActionContext | null {
    return this.currentContext;
  }

  updateContext(context: Partial<ActionContext>): void {
    this.currentContext = {
      ...this.currentContext,
      ...context
    } as ActionContext;
    
    this.notifyListeners();
  }

  subscribeToContext(callback: (context: ActionContext) => void): () => void {
    this.contextListeners.push(callback);
    
    return () => {
      this.contextListeners = this.contextListeners.filter(listener => listener !== callback);
    };
  }

  private notifyListeners(): void {
    if (this.currentContext) {
      this.contextListeners.forEach(listener => listener(this.currentContext!));
    }
  }

  determinePageContext(pathname: string): string {
    // Candidate pages
    if (pathname.includes('/candidate/')) return 'candidate-dashboard';
    
    // HR pages
    if (pathname.includes('/hr/dashboard')) return 'hr-dashboard';
    if (pathname.includes('/hr/candidate-pool')) return 'candidate-pool';
    if (pathname.includes('/hr/role-management')) return 'role-management';
    
    // TA pages
    if (pathname.includes('/ta/mission-control')) return 'ta-mission-control';
    
    // Executive pages
    if (pathname.includes('/executive/')) return 'executive-dashboard';
    
    // General AMS pages
    if (pathname.includes('/clients')) return 'clients';
    if (pathname.includes('/roles')) return 'roles-library';
    if (pathname.includes('/ams/enhanced-dashboard') || pathname.includes('/ams/dashboard')) return 'general';
    if (pathname === '/ams' || pathname === '/') return 'general';
    
    return 'general';
  }

  getTimeContext(): 'morning' | 'afternoon' | 'evening' {
    const hour = new Date().getHours();
    if (hour < 12) return 'morning';
    if (hour < 17) return 'afternoon';
    return 'evening';
  }

  shouldAutoShow(context: ActionContext): boolean {
    // Auto-show for urgent tasks or notifications
    if (context.pendingTasks.some(task => task.priority === 'urgent')) return true;
    if (context.notifications.some(notif => notif.type === 'urgent')) return true;
    
    // Auto-show in morning for daily planning on dashboard pages
    if (context.timeContext === 'morning' && 
        (context.page === 'hr-dashboard' || context.page === 'general')) return true;
    
    // Auto-show for TA users during work hours
    if (context.userRole === 'ta' && context.timeContext !== 'evening') return true;
    
    return false;
  }
}
