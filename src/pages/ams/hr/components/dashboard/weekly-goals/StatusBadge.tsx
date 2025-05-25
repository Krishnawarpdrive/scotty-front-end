
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertTriangle } from 'lucide-react';

interface StatusBadgeProps {
  status: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  switch (status) {
    case 'done':
      return <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" />Done</Badge>;
    case 'on-track':
      return <Badge className="bg-blue-100 text-blue-800">On Track</Badge>;
    case 'behind':
      return <Badge className="bg-yellow-100 text-yellow-800"><AlertTriangle className="h-3 w-3 mr-1" />Behind</Badge>;
    case 'feedback-pending':
      return <Badge className="bg-orange-100 text-orange-800">Feedback Pending</Badge>;
    case 'at-risk':
      return <Badge className="bg-red-100 text-red-800"><AlertTriangle className="h-3 w-3 mr-1" />At Risk</Badge>;
    default:
      return <Badge variant="secondary">Unknown</Badge>;
  }
};
