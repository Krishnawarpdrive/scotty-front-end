
import React from 'react';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";

interface OpenRequirementsCellProps {
  ta: any;
}

export const OpenRequirementsCell = ({ ta }: OpenRequirementsCellProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="min-w-[80px] inline-block cursor-help">10</span>
        </TooltipTrigger>
        <TooltipContent>
          <div className="space-y-1">
            <p>Open requirements: 10</p>
            <p className="text-xs">Active sourcing: 8</p>
            <p className="text-xs">On hold: 2</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
