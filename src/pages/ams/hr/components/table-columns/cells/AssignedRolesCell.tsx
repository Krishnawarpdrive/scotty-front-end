
import React from 'react';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";

interface AssignedRolesCellProps {
  ta: any;
}

export const AssignedRolesCell = ({ ta }: AssignedRolesCellProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="min-w-[60px] inline-block cursor-help">5</span>
        </TooltipTrigger>
        <TooltipContent>
          <div className="space-y-1">
            <p>Currently assigned: 5 roles</p>
            <p className="text-xs">Capacity utilization: 83%</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
