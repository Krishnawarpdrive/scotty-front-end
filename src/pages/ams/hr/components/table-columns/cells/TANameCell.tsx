
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";

interface TANameCellProps {
  ta: any;
}

export const TANameCell = ({ ta }: TANameCellProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-2 min-w-[120px] cursor-help">
            <Avatar className="h-6 w-6">
              <AvatarImage src={ta.avatarUrl} alt={ta.name} />
              <AvatarFallback className="bg-gray-200 text-gray-700">
                {ta.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <span className="font-medium hover:text-primary cursor-pointer truncate">
              {ta.name}
            </span>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <div className="space-y-1">
            <p className="font-semibold">{ta.name}</p>
            <p className="text-xs">TA ID: #{ta.id?.substring(0, 8) || 'N/A'}</p>
            <p className="text-xs">Department: {ta.department || 'Engineering'}</p>
            <p className="text-xs">Experience: {ta.experience || '3+ years'}</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
