
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Clock, CheckCircle, XCircle } from 'lucide-react';
import { Candidate } from '../CandidateTable';

interface ReasonCellProps {
  candidate: Candidate;
}

export const ReasonCell: React.FC<ReasonCellProps> = ({ candidate }) => {
  // Logic to determine reason based on candidate data
  const getReason = () => {
    if (candidate.status === 'On Hold') {
      return {
        text: 'On Hold - Review Required',
        variant: 'secondary' as const,
        icon: Clock,
        color: 'text-yellow-600'
      };
    }
    
    if (candidate.status === 'Rejected') {
      return {
        text: 'Not Qualified',
        variant: 'destructive' as const,
        icon: XCircle,
        color: 'text-red-600'
      };
    }
    
    if (candidate.nextAction && candidate.actionDueDate) {
      const dueDate = new Date(candidate.actionDueDate);
      const today = new Date();
      const diffTime = dueDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays <= 0) {
        return {
          text: 'Action Overdue',
          variant: 'destructive' as const,
          icon: AlertTriangle,
          color: 'text-red-600'
        };
      } else if (diffDays <= 2) {
        return {
          text: 'Action Due Soon',
          variant: 'secondary' as const,
          icon: AlertTriangle,
          color: 'text-orange-600'
        };
      }
    }
    
    if (candidate.status === 'Active') {
      return {
        text: 'In Progress',
        variant: 'default' as const,
        icon: CheckCircle,
        color: 'text-green-600'
      };
    }
    
    return {
      text: 'No Action Required',
      variant: 'outline' as const,
      icon: CheckCircle,
      color: 'text-gray-600'
    };
  };

  const reason = getReason();
  const Icon = reason.icon;

  return (
    <div className="flex items-center space-x-2">
      <Icon className={`h-4 w-4 ${reason.color}`} />
      <Badge variant={reason.variant} className="text-xs">
        {reason.text}
      </Badge>
    </div>
  );
};
