
import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface HRTooltipProps {
  hrName: string;
}

const HRTooltip: React.FC<HRTooltipProps> = ({ hrName }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="cursor-help">{hrName}</span>
        </TooltipTrigger>
        <TooltipContent>
          <div className="text-xs">
            <p className="font-bold">{hrName}</p>
            <p>hr.{hrName.split(' ')[0].toLowerCase()}@example.com</p>
            <p>+1 (555) 123-4567</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default HRTooltip;
