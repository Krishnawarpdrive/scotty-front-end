
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  FileText, 
  CheckCircle, 
  AlertCircle,
  Clock
} from 'lucide-react';

interface PendingAction {
  id: string;
  type: 'interview' | 'document' | 'assessment' | 'feedback';
  title: string;
  description: string;
  dueDate?: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'overdue' | 'completed';
}

interface CandidatePendingActionsProps {
  candidateId: string;
}

export const CandidatePendingActions: React.FC<CandidatePendingActionsProps> = ({ 
  candidateId 
}) => {
  // Mock data for pending actions
  const pendingActions: PendingAction[] = [
    {
      id: '1',
      type: 'interview',
      title: 'Technical Interview Feedback',
      description: 'Submit feedback for the technical interview conducted on Jan 20',
      dueDate: '2024-01-25',
      priority: 'high',
      status: 'pending'
    },
    {
      id: '2',
      type: 'document',
      title: 'Document Verification',
      description: 'Verify submitted documents for background check',
      dueDate: '2024-01-22',
      priority: 'medium',
      status: 'pending'
    }
  ];

  const getActionIcon = (type: string) => {
    switch (type) {
      case 'interview': return <Calendar className="h-4 w-4" />;
      case 'document': return <FileText className="h-4 w-4" />;
      case 'assessment': return <CheckCircle className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'default';
    }
  };

  const handleActionClick = (action: PendingAction) => {
    console.log('Action clicked:', action, 'for candidate:', candidateId);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Pending Actions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {pendingActions.map((action) => (
            <div key={action.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  {getActionIcon(action.type)}
                  <h4 className="font-medium">{action.title}</h4>
                </div>
                <Badge variant={getPriorityColor(action.priority) as any}>
                  {action.priority}
                </Badge>
              </div>
              
              <p className="text-sm text-muted-foreground">{action.description}</p>
              
              {action.dueDate && (
                <p className="text-xs text-muted-foreground">
                  Due: {new Date(action.dueDate).toLocaleDateString()}
                </p>
              )}
              
              <div className="flex justify-end">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleActionClick(action)}
                >
                  Take Action
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
