
import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface PipelineStatusIndicatorProps {
  roleName: string;
  isPipelineConfigured: boolean;
  hasRequirements: boolean;
  className?: string;
}

export const PipelineStatusIndicator: React.FC<PipelineStatusIndicatorProps> = ({
  roleName,
  isPipelineConfigured,
  hasRequirements,
  className = ""
}) => {
  const showRedDot = !isPipelineConfigured || !hasRequirements;
  
  const getTooltipContent = () => {
    const issues = [];
    if (!isPipelineConfigured) issues.push("Pipeline not configured");
    if (!hasRequirements) issues.push("Requirements not mapped");
    
    if (issues.length === 0) return "Pipeline fully configured";
    return `Issues: ${issues.join(", ")}`;
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={`relative inline-block ${className}`}>
            {showRedDot && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-pulse" />
            )}
            <div className="text-sm text-gray-600 hover:text-gray-800 cursor-help">
              {roleName}
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <div className="space-y-1">
            <p className="font-semibold">{roleName}</p>
            <p className="text-xs">{getTooltipContent()}</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
