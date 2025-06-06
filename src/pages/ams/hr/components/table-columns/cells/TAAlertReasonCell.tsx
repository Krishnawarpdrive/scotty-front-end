
import React from 'react';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { getRandomTAAlertReason } from '../utils/taAlertUtils';

interface TAAlertReasonCellProps {
  ta: any;
}

export const TAAlertReasonCell = ({ ta }: TAAlertReasonCellProps) => {
  const randomReason = getRandomTAAlertReason();
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="text-sm text-gray-600 truncate max-w-[150px] inline-block cursor-help">
            {randomReason}
          </span>
        </TooltipTrigger>
        <TooltipContent>
          <div className="space-y-1 max-w-xs">
            <p className="font-semibold">Alert Details</p>
            <p>{randomReason}</p>
            <p className="text-xs text-gray-500">Click CTA to resolve</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
