import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  Clock, 
  Bell, 
  CheckCircle, 
  AlertTriangle, 
  Calendar, 
  Target, 
  BarChart3,
  ArrowRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface SmartPaperContentProps {
  title: string;
  description?: string;
  status?: 'pending' | 'completed' | 'failed';
  priority?: 'high' | 'medium' | 'low';
  dueDate?: string;
  assignedTo?: string;
  actions?: React.ReactNode;
  className?: string;
}

export const SmartPaperContent: React.FC<SmartPaperContentProps> = ({
  title,
  description,
  status,
  priority,
  dueDate,
  assignedTo,
  actions,
  className
}) => {
  const getStatusBadge = () => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline">Pending</Badge>;
      case 'completed':
        return <Badge>Completed</Badge>;
      case 'failed':
        return <Badge variant="destructive">Failed</Badge>;
      default:
        return null;
    }
  };

  const getPriorityBadge = () => {
    switch (priority) {
      case 'high':
        return <Badge variant="destructive">High Priority</Badge>;
      case 'medium':
        return <Badge variant="secondary">Medium Priority</Badge>;
      case 'low':
        return <Badge variant="outline">Low Priority</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          {getStatusBadge() || getPriorityBadge()}
        </div>
        {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center space-x-2 text-sm">
          {dueDate && (
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>Due: {dueDate}</span>
            </div>
          )}
          {assignedTo && (
            <div className="flex items-center space-x-1">
              <Target className="h-4 w-4 text-muted-foreground" />
              <span>Assigned to: {assignedTo}</span>
            </div>
          )}
        </div>
        <Separator />
        <div className="flex justify-between items-center">
          {actions || (
            <Button variant="ghost" size="sm">
              View Details <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
