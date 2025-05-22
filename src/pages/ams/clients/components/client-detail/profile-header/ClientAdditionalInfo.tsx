
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Slack, UserRound } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface ClientAdditionalInfoProps {
  isExpanded: boolean;
  hasSlackIntegration?: boolean;
  clientOwner: string;
}

const ClientAdditionalInfo: React.FC<ClientAdditionalInfoProps> = ({
  isExpanded,
  hasSlackIntegration = false,
  clientOwner
}) => {
  if (!isExpanded) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t mt-2">
      <div>
        <h3 className="text-[10px] font-medium mb-2">Communication Channels</h3>
        <div className="flex gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className={`inline-flex items-center justify-center rounded-md p-1.5 ${hasSlackIntegration ? 'bg-[#4A154B] text-white' : 'bg-gray-100 text-gray-400'}`}>
                  <Slack className="h-4 w-4" />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{hasSlackIntegration ? 'Slack Connected' : 'Slack Not Connected'}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      
      <div>
        <h3 className="text-[10px] font-medium mb-2">Client Owner</h3>
        {clientOwner ? (
          <Badge variant="secondary" className="flex items-center gap-1 font-normal">
            <UserRound className="h-3 w-3" />
            <span>{clientOwner}</span>
          </Badge>
        ) : (
          <p className="text-xs text-gray-500">No owner assigned</p>
        )}
      </div>
    </div>
  );
};

export default ClientAdditionalInfo;
