
import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  SmartActionContextService, 
  ActionContext, 
  PendingTask, 
  SmartNotification, 
  SmartAction 
} from '@/services/SmartActionContextService';
import { 
  Calendar, 
  UserPlus, 
  FileText, 
  MessageSquare, 
  Briefcase,
  TrendingUp,
  Settings,
  Bell,
  Search,
  Plus
} from 'lucide-react';

export const useSmartActionContext = () => {
  const location = useLocation();
  const contextService = SmartActionContextService.getInstance();
  const [context, setContext] = useState<ActionContext | null>(null);
  const [isVisible, setIsVisible] = useState(true); // Start visible for better user experience
  const [lastActivity, setLastActivity] = useState(Date.now());

  // Mock data - in real app, this would come from your store/API
  const getMockPendingTasks = (page: string): PendingTask[] => {
    const baseTasks: PendingTask[] = [
      {
        id: '1',
        type: 'interview',
        priority: 'urgent',
        title: 'Technical Interview - John Doe',
        dueDate: 'Today 2:00 PM',
        context: 'Senior Frontend Developer at TechCorp',
        action: () => console.log('Join interview')
      },
      {
        id: '2',
        type: 'review',
        priority: 'high',
        title: 'Review Candidate Applications',
        dueDate: 'End of day',
        context: '5 applications pending review',
        action: () => console.log('Review applications')
      },
      {
        id: '3',
        type: 'document',
        priority: 'medium',
        title: 'Update Job Requirements',
        context: 'React Developer role',
        action: () => console.log('Update requirements')
      }
    ];

    // Add page-specific tasks
    if (page === 'candidate-pool') {
      baseTasks.push({
        id: '4',
        type: 'follow_up',
        priority: 'high',
        title: 'Follow up with 3 candidates',
        context: 'Pending responses for over 48 hours',
        action: () => console.log('Follow up candidates')
      });
    }

    if (page === 'hr-dashboard') {
      baseTasks.push({
        id: '5',
        type: 'approval',
        priority: 'urgent',
        title: 'Approve Job Descriptions',
        context: '3 roles waiting for approval',
        action: () => console.log('Approve job descriptions')
      });
    }

    if (page === 'ta-mission-control') {
      baseTasks.push({
        id: '6',
        type: 'interview',
        priority: 'urgent',
        title: 'Conduct Phone Screening',
        context: 'Scheduled for 3:00 PM today',
        action: () => console.log('Start phone screening')
      });
    }

    return baseTasks;
  };

  const getMockNotifications = (): SmartNotification[] => [
    {
      id: '1',
      type: 'urgent',
      title: 'Interview Starting Soon',
      message: 'Technical interview with John Doe starts in 15 minutes',
      timestamp: '5 mins ago',
      dismissible: true,
      action: () => console.log('Join interview')
    },
    {
      id: '2',
      type: 'important',
      title: 'New Application Received',
      message: 'Senior Developer application requires immediate review',
      timestamp: '10 mins ago',
      dismissible: true
    },
    {
      id: '3',
      type: 'contextual',
      title: 'Daily Report Ready',
      message: 'Your hiring metrics summary is available',
      timestamp: '1 hour ago',
      dismissible: true
    }
  ];

  const getMockActions = (page: string): SmartAction[] => {
    const baseActions: SmartAction[] = [
      {
        id: '1',
        title: 'Quick Search',
        icon: <Search className="h-4 w-4" />,
        action: () => console.log('Quick search'),
        priority: 'contextual',
        context: ['all'],
        color: 'bg-blue-100 text-blue-600'
      },
      {
        id: '2',
        title: 'Create New Role',
        icon: <Plus className="h-4 w-4" />,
        action: () => console.log('Create role'),
        priority: 'important',
        context: ['role-management', 'hr-dashboard'],
        color: 'bg-green-100 text-green-600'
      }
    ];

    // Add page-specific actions
    if (page === 'candidate-pool') {
      baseActions.push(
        {
          id: '3',
          title: 'Add Candidate',
          icon: <UserPlus className="h-4 w-4" />,
          action: () => console.log('Add candidate'),
          priority: 'important',
          context: ['candidate-pool'],
          color: 'bg-purple-100 text-purple-600'
        },
        {
          id: '4',
          title: 'Bulk Actions',
          icon: <Settings className="h-4 w-4" />,
          action: () => console.log('Bulk actions'),
          priority: 'contextual',
          context: ['candidate-pool'],
          badge: 3
        }
      );
    }

    if (page === 'hr-dashboard' || page === 'general') {
      baseActions.push(
        {
          id: '5',
          title: 'View Analytics',
          icon: <TrendingUp className="h-4 w-4" />,
          action: () => console.log('View analytics'),
          priority: 'contextual',
          context: ['hr-dashboard', 'general'],
          color: 'bg-amber-100 text-amber-600'
        },
        {
          id: '6',
          title: 'Messages',
          icon: <MessageSquare className="h-4 w-4" />,
          action: () => console.log('View messages'),
          priority: 'contextual',
          context: ['hr-dashboard', 'general'],
          badge: 2
        }
      );
    }

    if (page === 'ta-mission-control') {
      baseActions.push(
        {
          id: '7',
          title: 'Schedule Interview',
          icon: <Calendar className="h-4 w-4" />,
          action: () => console.log('Schedule interview'),
          priority: 'important',
          context: ['ta-mission-control'],
          color: 'bg-indigo-100 text-indigo-600'
        },
        {
          id: '8',
          title: 'Review Applications',
          icon: <FileText className="h-4 w-4" />,
          action: () => console.log('Review applications'),
          priority: 'contextual',
          context: ['ta-mission-control'],
          badge: 8
        }
      );
    }

    return baseActions.filter(action => 
      action.context.includes('all') || action.context.includes(page)
    );
  };

  const updateActivityTimestamp = useCallback(() => {
    setLastActivity(Date.now());
  }, []);

  useEffect(() => {
    const page = contextService.determinePageContext(location.pathname);
    const timeContext = contextService.getTimeContext();
    
    const newContext: ActionContext = {
      page,
      userRole: 'hr', // This would come from your auth context
      pendingTasks: getMockPendingTasks(page),
      notifications: getMockNotifications(),
      timeContext,
      isUrgent: false
    };

    // Determine if situation is urgent
    newContext.isUrgent = newContext.pendingTasks.some(task => task.priority === 'urgent') ||
                         newContext.notifications.some(notif => notif.type === 'urgent');

    contextService.updateContext(newContext);
    setContext(newContext);

    // Show by default when there's urgent content or on first load
    if (newContext.isUrgent || !isVisible) {
      setIsVisible(true);
    }
  }, [location.pathname, isVisible]);

  useEffect(() => {
    const unsubscribe = contextService.subscribeToContext((newContext) => {
      setContext(newContext);
    });

    return unsubscribe;
  }, []);

  // Auto-hide after longer inactivity (2 minutes instead of 30 seconds)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (Date.now() - lastActivity > 120000) { // 2 minutes
        setIsVisible(false);
      }
    }, 120000);

    return () => clearTimeout(timer);
  }, [lastActivity]);

  // Track user activity
  useEffect(() => {
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    
    events.forEach(event => {
      document.addEventListener(event, updateActivityTimestamp, true);
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, updateActivityTimestamp, true);
      });
    };
  }, [updateActivityTimestamp]);

  const getActionsForContext = (): SmartAction[] => {
    if (!context) return [];
    return getMockActions(context.page);
  };

  const handleTaskClick = (task: PendingTask) => {
    task.action();
    updateActivityTimestamp();
  };

  const handleActionClick = (action: SmartAction) => {
    action.action();
    updateActivityTimestamp();
  };

  const handleNotificationDismiss = (notificationId: string) => {
    if (!context) return;
    
    const updatedNotifications = context.notifications.filter(n => n.id !== notificationId);
    contextService.updateContext({ notifications: updatedNotifications });
    updateActivityTimestamp();
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
    updateActivityTimestamp();
  };

  return {
    context,
    actions: getActionsForContext(),
    isVisible,
    toggleVisibility,
    handleTaskClick,
    handleActionClick,
    handleNotificationDismiss
  };
};
