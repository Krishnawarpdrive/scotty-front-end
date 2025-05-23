
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
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center min-w-[100px] cursor-help">
            <span>{client.rolesHired} / {client.rolesNeeded}</span>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <div className="space-y-1">
            <p>Roles Hired: {client.rolesHired}</p>
            <p>Roles Needed: {client.rolesNeeded}</p>
            <p>Progress: {Math.round((client.rolesHired / client.rolesNeeded) * 100)}%</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
