
import React from 'react';
import { Button } from "@/components/ui/button";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { getClientAlertReason, alertReasonToCta, getCTAColor } from '../utils/alertUtils';

interface CTACellProps {
  client: any;
}

export const CTACell = ({ client }: CTACellProps) => {
  const alertReason = getClientAlertReason(client.name);
  const { action, priority } = alertReasonToCta[alertReason] || { action: "Take Action", priority: 'low' as const };
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button 
            size="sm" 
            className={`text-xs h-7 px-2 ${getCTAColor(priority)}`}
            onClick={() => console.log(`Executing: ${action} for client: ${client.name}`)}
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
