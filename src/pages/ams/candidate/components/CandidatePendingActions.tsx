
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  AlertTriangle, 
  Clock, 
  FileText, 
  Video, 
  CheckCircle,
  Calendar,
  Briefcase
} from 'lucide-react';

interface PendingAction {
  id: string;
  type: 'urgent' | 'overdue' | 'upcoming';
  applicationName: string;
  stageName: string;
  actionTitle: string;
  description: string;
  dueDate?: string;
  daysOverdue?: number;
  priority: 'high' | 'medium' | 'low';
  actionType: 'interview' | 'document' | 'form' | 'assessment';
  estimatedTime: string;
}

interface CandidatePendingActionsProps {
  actions: PendingAction[];
  onActionClick: (action: PendingAction) => void;
}

export const CandidatePendingActions: React.FC<CandidatePendingActionsProps> = ({
  actions,
  onActionClick,
}) => {
  const getActionIcon = (actionType: string) => {
    switch (actionType) {
      case 'interview':
        return <Video className="h-4 w-4" />;
      case 'document':
        return <FileText className="h-4 w-4" />;
      case 'form':
        return <CheckCircle className="h-4 w-4" />;
      case 'assessment':
        return <Briefcase className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'urgent':
        return 'bg-red-50 border-red-200';
      case 'overdue':
        return 'bg-red-100 border-red-300';
      case 'upcoming':
        return 'bg-blue-50 border-blue-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'urgent':
      case 'overdue':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'upcoming':
        return <Calendar className="h-4 w-4 text-blue-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const urgentActions = actions.filter(a => a.type === 'urgent' || a.type === 'overdue');
  const upcomingActions = actions.filter(a => a.type === 'upcoming');

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-4">Pending Actions</h2>
        
        {/* Urgent/Overdue Actions */}
        {urgentActions.length > 0 && (
          <div className="space-y-3 mb-6">
            <h3 className="text-sm font-medium text-red-700 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Requires Immediate Action ({urgentActions.length})
            </h3>
            
            {urgentActions.map((action) => (
              <Card 
                key={action.id} 
                className={`cursor-pointer transition-all hover:shadow-md ${getTypeColor(action.type)}`}
                onClick={() => onActionClick(action)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      {getTypeIcon(action.type)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-sm truncate">{action.actionTitle}</h4>
                        <Badge variant="destructive" className="text-xs px-1 py-0">
                          {action.type}
                        </Badge>
                      </div>
                      
                      <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                        {action.description}
                      </p>
                      
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span className="truncate">{action.applicationName}</span>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          {action.daysOverdue ? (
                            <span className="text-red-600 font-medium">
                              {action.daysOverdue}d overdue
                            </span>
                          ) : (
                            <span>{action.dueDate}</span>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          {getActionIcon(action.actionType)}
                          <span>{action.estimatedTime}</span>
                        </div>
                        
                        <Button size="sm" className="h-6 text-xs px-2">
                          Take Action
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Upcoming Actions */}
        {upcomingActions.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-blue-700 flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Upcoming ({upcomingActions.length})
            </h3>
            
            {upcomingActions.map((action) => (
              <Card 
                key={action.id} 
                className={`cursor-pointer transition-all hover:shadow-md ${getTypeColor(action.type)}`}
                onClick={() => onActionClick(action)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      {getTypeIcon(action.type)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm mb-1 truncate">{action.actionTitle}</h4>
                      <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                        {action.description}
                      </p>
                      
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span className="truncate">{action.applicationName}</span>
                        <span>{action.dueDate}</span>
                      </div>
                      
                      <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                        {getActionIcon(action.actionType)}
                        <span>{action.estimatedTime}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {actions.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-3" />
              <h3 className="font-medium text-gray-900 mb-1">All caught up!</h3>
              <p className="text-sm text-gray-500">No pending actions at the moment.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
