
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Candidate } from '../CandidateTable';

interface StatusCellProps {
  candidate: Candidate;
}

export const StatusCell: React.FC<StatusCellProps> = ({ candidate }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800 border-green-200';
      case 'On Hold': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Rejected': return 'bg-red-100 text-red-800 border-red-200';
      case 'Hired': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Withdrawn': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Badge className={cn('text-xs border', getStatusColor(candidate.status))}>
      {candidate.status}
    </Badge>
  );
};
