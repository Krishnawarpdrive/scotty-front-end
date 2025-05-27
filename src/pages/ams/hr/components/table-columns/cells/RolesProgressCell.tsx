
import React from 'react';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";

interface RolesProgressCellProps {
  client: any;
}

export const RolesProgressCell = ({ client }: RolesProgressCellProps) => {
  const percentage = Math.round((client.rolesHired / client.rolesNeeded) * 100);
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex flex-col items-start min-w-[100px] cursor-help gap-1">
            <span className="text-[12px] text-[#262626] font-rubik">
              {client.rolesHired} / {client.rolesNeeded}
            </span>
            <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
              <div 
                className="h-full bg-green-500 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${Math.min(percentage, 100)}%` }}
              />
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <div className="space-y-1">
            <p>Roles Hired: {client.rolesHired}</p>
            <p>Roles Needed: {client.rolesNeeded}</p>
            <p>Progress: {percentage}%</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
