
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Candidate } from '../CandidateTable';

interface EnhancedAppliedRolesCellProps {
  candidate: Candidate;
}

export const EnhancedAppliedRolesCell: React.FC<EnhancedAppliedRolesCellProps> = ({ candidate }) => {
  const displayRoles = candidate.appliedRoles.slice(0, 2);
  const remainingCount = candidate.appliedRoles.length - 2;

  return (
    <TooltipProvider>
      <div className="space-y-1">
        {displayRoles.map((role, index) => (
          <Tooltip key={index}>
            <TooltipTrigger asChild>
              <Badge variant="outline" className="text-xs truncate max-w-32 cursor-help">
                {role}
              </Badge>
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs">{role}</p>
            </TooltipContent>
          </Tooltip>
        ))}
        
        {remainingCount > 0 && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Badge variant="secondary" className="text-xs cursor-help">
                +{remainingCount} more
              </Badge>
            </TooltipTrigger>
            <TooltipContent>
              <div className="max-w-xs space-y-1">
                <p className="font-semibold">All Applied Roles:</p>
                {candidate.appliedRoles.map((role, index) => (
                  <p key={index} className="text-sm">{role}</p>
                ))}
              </div>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
    </TooltipProvider>
  );
};
