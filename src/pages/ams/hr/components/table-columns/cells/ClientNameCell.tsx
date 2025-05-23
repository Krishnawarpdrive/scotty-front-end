
import React from 'react';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";

interface ClientNameCellProps {
  client: any;
  onClientClick: (clientName: string) => void;
}

export const ClientNameCell = ({ client, onClientClick }: ClientNameCellProps) => {
  return (
    <div className="flex flex-col min-w-[140px]">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <span 
              className="font-medium hover:text-primary cursor-pointer truncate"
              onClick={() => onClientClick(client.name)}
            >
              {client.name}
            </span>
          </TooltipTrigger>
          <TooltipContent>
            <div className="space-y-1">
              <p className="font-semibold">{client.name}</p>
              <p className="text-xs">Client ID: #{client.id.substring(0, 8)}</p>
              <p className="text-xs">Account Type: {client.accountType || 'Standard'}</p>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <span className="text-[10px] text-muted-foreground truncate">
        #{client.id.substring(0, 8)}
      </span>
    </div>
  );
};
