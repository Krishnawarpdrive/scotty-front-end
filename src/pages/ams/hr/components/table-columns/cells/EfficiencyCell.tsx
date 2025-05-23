
import React from 'react';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";

interface EfficiencyCellProps {
  ta: any;
}

export const EfficiencyCell = ({ ta }: EfficiencyCellProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="text-gray-600 text-sm min-w-[70px] inline-block cursor-help">
            Medium
          </span>
        </TooltipTrigger>
        <TooltipContent>
          <div className="space-y-1">
            <p>Efficiency Rating: Medium</p>
            <p className="text-xs">Conversion rate: 65%</p>
            <p className="text-xs">Avg. time to fill: 28 days</p>
            <p className="text-xs">Client satisfaction: 4.2/5</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
