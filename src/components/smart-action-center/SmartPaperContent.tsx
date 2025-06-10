import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Clock, 
  AlertTriangle, 
  Star, 
  Calendar
} from 'lucide-react';
import { PendingTask, SmartNotification, SmartAction } from '@/services/SmartActionContextService';
import { cn } from '@/lib/utils';

interface SmartPaperContentProps {
  type: 'urgent' | 'important' | 'contextual';
  tasks: PendingTask[];
  notifications: SmartNotification[];
  actions: SmartAction[];
  onTaskClick: (task: PendingTask) => void;
  onActionClick: (action: SmartAction) => void;
  onNotificationDismiss: (notificationId: string) => void;
}

export const SmartPaperContent: React.FC<SmartPaperContentProps> = ({
  type,
  tasks,
  notifications,
  actions,
  onTaskClick,
  onActionClick,
  onNotificationDismiss
}) => {
  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'urgent': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'important': return <Star className="h-4 w-4 text-amber-500" />;
      default: return <Clock className="h-4 w-4 text-blue-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'border-l-red-500 bg-red-50';
      case 'important': return 'border-l-amber-500 bg-amber-50';
      default: return 'border-l-blue-500 bg-blue-50';
    }
  };

  const getTypeLabel = () => {
    switch (type) {
      case 'urgent': return 'Urgent Actions';
      case 'important': return 'Important Tasks';
      case 'contextual': return 'Quick Actions';
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (type === 'urgent') return task.priority === 'urgent';
    if (type === 'important') return task.priority === 'high';
    return task.priority === 'medium' || task.priority === 'low';
  });

  const filteredNotifications = notifications.filter(notif => notif.type === type);
  const filteredActions = actions.filter(action => action.priority === type);

  if (filteredTasks.length === 0 && filteredNotifications.length === 0 && filteredActions.length === 0) {
    return (
      <Card className="w-80">
        <CardContent className="p-4">
          <div className="text-center text-gray-500">
            <Clock className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">All caught up!</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-80 max-h-96 overflow-hidden">
      <CardContent className="p-0">
        <div className="p-4 border-b bg-gray-50">
          <h3 className="font-semibold text-sm flex items-center gap-2">
            {getPriorityIcon(type)}
            {getTypeLabel()}
            {(filteredTasks.length + filteredNotifications.length) > 0 && (
              <Badge variant="secondary" className="ml-auto">
                {filteredTasks.length + filteredNotifications.length}
              </Badge>
            )}
          </h3>
        </div>

        <div className="max-h-80 overflow-y-auto">
          {/* Urgent Notifications */}
          {filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={cn(
                'p-3 border-b border-l-4 hover:bg-gray-50 transition-colors',
                getPriorityColor(notification.type)
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{notification.title}</p>
                  <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
                  <p className="text-xs text-gray-400 mt-1">{notification.timestamp}</p>
                </div>
                {notification.dismissible && (
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-6 w-6 p-0"
                    onClick={() => onNotificationDismiss(notification.id)}
                  >
                    ×
                  </Button>
                )}
              </div>
              {notification.action && (
                <Button size="sm" className="mt-2 h-6 text-xs" onClick={notification.action}>
                  Take Action
                </Button>
              )}
            </div>
          ))}

          {/* Pending Tasks */}
          {filteredTasks.map((task) => (
            <div
              key={task.id}
              className={cn(
                'p-3 border-b border-l-4 hover:bg-gray-50 transition-colors cursor-pointer',
                getPriorityColor(task.priority)
              )}
              onClick={() => onTaskClick(task)}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{task.title}</p>
                  <p className="text-xs text-gray-600 mt-1">{task.context}</p>
                  {task.dueDate && (
                    <div className="flex items-center gap-1 mt-1">
                      <Calendar className="h-3 w-3 text-gray-400" />
                      <p className="text-xs text-gray-400">{task.dueDate}</p>
                    </div>
                  )}
                </div>
                {getPriorityIcon(task.priority)}
              </div>
            </div>
          ))}

          {/* Quick Actions */}
          {filteredActions.map((action) => (
            <div
              key={action.id}
              className="p-3 border-b hover:bg-gray-50 transition-colors cursor-pointer"
              onClick={() => onActionClick(action)}
            >
              <div className="flex items-center gap-3">
                <div className={cn(
                  'w-8 h-8 rounded-lg flex items-center justify-center',
                  action.color || 'bg-blue-100 text-blue-600'
                )}>
                  {action.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{action.title}</p>
                </div>
                {action.badge && (
                  <Badge variant="secondary" className="text-xs">
                    {action.badge}
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
