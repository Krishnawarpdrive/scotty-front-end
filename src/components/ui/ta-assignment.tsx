
import { 
  Avatar, 
  AvatarFallback, 
  AvatarImage 
} from "@/components/ui/avatar";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";

interface TAProps {
  id: string;
  name: string;
  avatarUrl?: string;
  department?: string;
  experience?: string;
}

interface TAAssignmentProps {
  tas: TAProps[];
  maxDisplay?: number;
}

export const TAAssignment = ({ tas, maxDisplay = 2 }: TAAssignmentProps) => {
  if (!tas || tas.length === 0) {
    return <span className="text-gray-400 text-sm">No TA assigned</span>;
  }

  const displayedTAs = tas.slice(0, maxDisplay);
  const additionalTAs = tas.length > maxDisplay ? tas.slice(maxDisplay) : [];

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center -space-x-1 cursor-help">
            {displayedTAs.map((ta) => (
              <Avatar key={ta.id} className="h-6 w-6 border-2 border-white">
                <AvatarImage src={ta.avatarUrl} alt={ta.name} />
                <AvatarFallback className="bg-gray-200 text-gray-700 text-xs">
                  {ta.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
            ))}
            
            {additionalTAs.length > 0 && (
              <div className="h-6 w-6 rounded-full bg-gray-100 text-xs flex items-center justify-center border-2 border-white text-gray-700">
                +{additionalTAs.length}
              </div>
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <div className="space-y-2">
            <p className="font-medium">Assigned TAs</p>
            <ul className="space-y-1">
              {tas.map((ta) => (
                <li key={ta.id} className="flex items-center gap-2">
                  <Avatar className="h-5 w-5">
                    <AvatarImage src={ta.avatarUrl} alt={ta.name} />
                    <AvatarFallback className="bg-gray-200 text-gray-700 text-xs">
                      {ta.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm">{ta.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
