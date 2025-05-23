
import React from 'react';
import { Avatar } from "@/components/ui/avatar";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";

interface TAProfileListProps {
  taList: string[];
  maxVisible?: number;
}

const TAProfileList: React.FC<TAProfileListProps> = ({ taList, maxVisible = 3 }) => {
  const visibleTAs = taList.slice(0, maxVisible);
  const remainingCount = taList.length - maxVisible;

  if (taList.length === 0) {
    return <span className="text-gray-500 text-sm">No TA assigned</span>;
  }

  return (
    <div className="flex items-center gap-1">
      {visibleTAs.map((ta, index) => (
        <TooltipProvider key={index}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Avatar className="h-6 w-6 border-2 border-white">
                <div className="flex h-full w-full items-center justify-center bg-gray-200 text-xs font-medium">
                  {ta.charAt(0)}
                </div>
              </Avatar>
            </TooltipTrigger>
            <TooltipContent>
              <p>{ta}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
      
      {remainingCount > 0 && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="h-6 w-6 rounded-full bg-gray-300 flex items-center justify-center text-xs font-medium text-gray-600 cursor-help">
                +{remainingCount}
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <div className="space-y-1">
                {taList.slice(maxVisible).map((ta, index) => (
                  <p key={index}>{ta}</p>
                ))}
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
};

export default TAProfileList;
