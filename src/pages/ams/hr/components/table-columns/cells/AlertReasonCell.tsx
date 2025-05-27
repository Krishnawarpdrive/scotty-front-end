
import React from 'react';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { getClientAlertReason } from '../utils/alertUtils';

interface AlertReasonCellProps {
  client: any;
}

export const AlertReasonCell = ({ client }: AlertReasonCellProps) => {
  const alertReason = getClientAlertReason(client.name);
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="text-sm text-gray-600 truncate max-w-[150px] cursor-help">
            {alertReason}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <div className="space-y-1 max-w-xs">
            <p className="font-semibold">Alert Details</p>
            <p>{alertReason}</p>
            <p className="text-xs text-gray-500">Click CTA to resolve</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
