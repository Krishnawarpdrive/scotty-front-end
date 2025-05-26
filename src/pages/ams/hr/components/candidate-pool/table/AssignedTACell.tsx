
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { Candidate } from '../CandidateTable';

interface AssignedTACellProps {
  candidate: Candidate;
}

export const AssignedTACell: React.FC<AssignedTACellProps> = ({ candidate }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Avatar className="h-8 w-8 cursor-help">
            <AvatarImage src={candidate.assignedTA.avatar} />
            <AvatarFallback className="text-xs">
              {candidate.assignedTA.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
        </TooltipTrigger>
        <TooltipContent>
          <p className="font-medium">{candidate.assignedTA.name}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
