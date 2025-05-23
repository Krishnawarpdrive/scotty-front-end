
import React from 'react';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";

interface UnassignedRolesCellProps {
  client: any;
}

export const UnassignedRolesCell = ({ client }: UnassignedRolesCellProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center min-w-[80px] cursor-help">
            <span className={client.unassignedRoles > 0 ? "text-amber-600 font-medium" : ""}>
              {client.unassignedRoles} / {client.totalRoles}
            </span>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <div className="space-y-1">
            <p>Unassigned: {client.unassignedRoles}</p>
            <p>Total Roles: {client.totalRoles}</p>
            {client.unassignedRoles > 0 && (
              <p className="text-amber-600">⚠️ Needs attention</p>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
