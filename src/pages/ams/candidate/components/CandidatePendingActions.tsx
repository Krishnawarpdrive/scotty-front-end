
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  AlertTriangle, 
  Clock, 
  Calendar,
  FileText,
  Video,
  CheckCircle,
  ArrowRight,
  Bell
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface PendingAction {
  id: string;
  type: 'urgent' | 'overdue' | 'reminder' | 'upcoming';
  applicationName: string;
  stageName: string;
  actionTitle: string;
  description: string;
  dueDate?: string;
  daysOverdue?: number;
  priority: 'high' | 'medium' | 'low';
  actionType: 'document' | 'interview' | 'assessment' | 'video' | 'form';
  estimatedTime?: string;
}

interface CandidatePendingActionsProps {
  actions: PendingAction[];
  onActionClick: (action: PendingAction) => void;
  onDismiss: (actionId: string) => void;
}

export const CandidatePendingActions: React.FC<CandidatePendingActionsProps> = ({
  actions,
  onActionClick,
  onDismiss
}) => {
  const getActionIcon = (actionType: string) => {
    const iconClass = 'h-4 w-4';
    switch (actionType) {
      case 'document':
        return <FileText className={iconClass} />;
      case 'interview':
        return <Calendar className={iconClass} />;
      case 'assessment':
        return <Clock className={iconClass} />;
      case 'video':
        return <Video className={iconClass} />;
      case 'form':
        return <FileText className={iconClass} />;
      default:
        return <CheckCircle className={iconClass} />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'urgent':
      case 'overdue':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'reminder':
        return <Bell className="h-4 w-4 text-amber-500" />;
      case 'upcoming':
        return <Clock className="h-4 w-4 text-blue-500" />;
      default:
        return <CheckCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'urgent':
      case 'overdue':
        return 'border-l-red-500 bg-red-50';
      case 'reminder':
        return 'border-l-amber-500 bg-amber-50';
      case 'upcoming':
        return 'border-l-blue-500 bg-blue-50';
      default:
        return 'border-l-gray-500 bg-gray-50';
    }
  };

  const getPriorityBadge = (priority: string) => {
    const variants = {
      high: 'bg-red-100 text-red-700',
      medium: 'bg-yellow-100 text-yellow-700',
      low: 'bg-green-100 text-green-700'
    };
    return <Badge className={variants[priority as keyof typeof variants]}>{priority}</Badge>;
  };

  const sortedActions = [...actions].sort((a, b) => {
    const typeOrder = { overdue: 0, urgent: 1, reminder: 2, upcoming: 3 };
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    
    const typeCompare = typeOrder[a.type as keyof typeof typeOrder] - typeOrder[b.type as keyof typeof typeOrder];
    if (typeCompare !== 0) return typeCompare;
    
    return priorityOrder[a.priority as keyof typeof priorityOrder] - priorityOrder[b.priority as keyof typeof priorityOrder];
  });

  if (actions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            All Caught Up!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">You have no pending actions at this time.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-amber-600" />
          Pending Actions ({actions.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {sortedActions.map((action) => (
          <div
            key={action.id}
            className={cn(
              'border-l-4 rounded-lg p-4 transition-all duration-200 hover:shadow-md cursor-pointer',
              getTypeColor(action.type)
            )}
            onClick={() => onActionClick(action)}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                {getTypeIcon(action.type)}
                <div className="flex items-center gap-2">
                  {getActionIcon(action.actionType)}
                  <span className="font-medium text-sm">{action.actionTitle}</span>
                </div>
              </div>
              {getPriorityBadge(action.priority)}
            </div>
            
            <div className="space-y-2">
              <div className="text-xs text-gray-600">
                <span className="font-medium">{action.applicationName}</span> • {action.stageName}
              </div>
              
              <p className="text-sm text-gray-700">{action.description}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-xs text-gray-600">
                  {action.dueDate && (
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      Due: {action.dueDate}
                    </div>
                  )}
                  {action.daysOverdue && action.daysOverdue > 0 && (
                    <div className="text-red-600 font-medium">
                      {action.daysOverdue} days overdue
                    </div>
                  )}
                  {action.estimatedTime && (
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {action.estimatedTime}
                    </div>
                  )}
                </div>
                
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-6 px-2 text-xs"
                  onClick={(e) => {
                    e.stopPropagation();
                    onActionClick(action);
                  }}
                >
                  <ArrowRight className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        ))}
        
        {actions.length > 5 && (
          <Button variant="outline" className="w-full" size="sm">
            View All Actions ({actions.length})
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
