
import React from 'react';
import { Button } from "@/components/ui/button";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { getRandomTAAlertReason, taAlertReasonToCta, getTACTAColor } from '../utils/taAlertUtils';

interface TACTACellProps {
  ta: any;
}

export const TACTACell = ({ ta }: TACTACellProps) => {
  const randomReason = getRandomTAAlertReason();
  const { action, priority } = taAlertReasonToCta[randomReason] || { action: "Take Action", priority: 'low' as const };
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button 
            size="sm" 
            className={`text-xs h-7 px-2 ${getTACTAColor(priority)}`}
            onClick={() => console.log(`Executing: ${action} for TA: ${ta.name}`)}
          >
            {action}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <div className="space-y-1">
            <p className="font-semibold">Action Required</p>
            <p>{action}</p>
            <p className="text-xs text-gray-500">Click to execute</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
