
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Target, AlertCircle, CheckCircle } from 'lucide-react';

interface SmartPaperContentProps {
  title?: string;
  description?: string;
  priority?: 'high' | 'medium' | 'low';
  estimatedTime?: string;
  actionType?: 'create' | 'update' | 'review' | 'analyze';
  onAction?: () => void;
  onDismiss?: () => void;
  insights?: string[];
  type?: 'urgent' | 'important' | 'contextual';
  tasks?: any[];
  notifications?: any[];
  actions?: any[];
  onTaskClick?: (task: any) => void;
  onActionClick?: (action: any) => void;
  onNotificationDismiss?: (notificationId: string) => void;
}

export const SmartPaperContent: React.FC<SmartPaperContentProps> = ({
  title = "Smart Action Required",
  description = "Review and take action on important items",
  priority = 'medium',
  estimatedTime = "5 min",
  actionType = 'review',
  onAction = () => {},
  onDismiss = () => {},
  insights = [],
  type,
  tasks = [],
  notifications = [],
  actions = [],
  onTaskClick,
  onActionClick,
  onNotificationDismiss
}) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getActionIcon = (type: string) => {
    switch (type) {
      case 'create': return <Target className="h-4 w-4" />;
      case 'update': return <AlertCircle className="h-4 w-4" />;
      case 'review': return <CheckCircle className="h-4 w-4" />;
      case 'analyze': return <Target className="h-4 w-4" />;
      default: return <Target className="h-4 w-4" />;
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <CardTitle className="text-lg">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <Badge className={getPriorityColor(priority)}>
            {priority.toUpperCase()}
          </Badge>
        </div>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{estimatedTime}</span>
          </div>
          <div className="flex items-center gap-1">
            {getActionIcon(actionType)}
            <span className="capitalize">{actionType}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {type && (
          <div>
            <h4 className="font-medium text-sm mb-2">{type} Items:</h4>
            <div className="space-y-2">
              {tasks.map((task, index) => (
                <div key={index} className="p-2 bg-gray-50 rounded cursor-pointer" onClick={() => onTaskClick?.(task)}>
                  {task.title || `Task ${index + 1}`}
                </div>
              ))}
              {notifications.map((notification, index) => (
                <div key={index} className="p-2 bg-blue-50 rounded flex justify-between items-center">
                  <span>{notification.message || `Notification ${index + 1}`}</span>
                  <Button size="sm" variant="ghost" onClick={() => onNotificationDismiss?.(notification.id)}>
                    ×
                  </Button>
                </div>
              ))}
              {actions.map((action, index) => (
                <div key={index} className="p-2 bg-green-50 rounded cursor-pointer" onClick={() => onActionClick?.(action)}>
                  {action.title || `Action ${index + 1}`}
                </div>
              ))}
            </div>
          </div>
        )}

        {insights.length > 0 && (
          <div>
            <h4 className="font-medium text-sm mb-2">Key Insights:</h4>
            <ul className="space-y-1">
              {insights.map((insight, index) => (
                <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="text-blue-500">•</span>
                  <span>{insight}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex gap-2">
          <Button onClick={onAction} className="flex-1">
            Take Action
          </Button>
          <Button onClick={onDismiss} variant="outline">
            Dismiss
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
