
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Candidate } from '../CandidateTable';

interface AssignedTACellProps {
  candidate: Candidate;
}

export const AssignedTACell: React.FC<AssignedTACellProps> = ({ candidate }) => {
  return (
    <div className="flex items-center gap-2">
      <Avatar className="h-6 w-6">
        <AvatarImage src={candidate.assignedTA.avatar} />
        <AvatarFallback className="text-xs">
          {candidate.assignedTA.name.split(' ').map(n => n[0]).join('')}
        </AvatarFallback>
      </Avatar>
      <span className="text-sm truncate max-w-24">{candidate.assignedTA.name}</span>
    </div>
  );
};
