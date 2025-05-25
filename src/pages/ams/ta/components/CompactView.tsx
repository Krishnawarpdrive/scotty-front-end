
import React from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ChevronDown } from "lucide-react";

interface MetricItemProps {
  icon: string;
  label: string;
  current: number;
  total: number;
}

const MetricItem: React.FC<MetricItemProps> = ({ icon, label, current, total }) => {
  const progress = (current / total) * 100;
  
  let bgColor = "bg-[#FBEAE7]"; // Red pastel (0-50%)
  if (progress >= 100) {
    bgColor = "bg-[#EAF6DA]"; // Green pastel (100%)
  } else if (progress >= 76) {
    bgColor = "bg-[#F5F5D0]"; // Yellow pastel (76-99%)
  } else if (progress >= 51) {
    bgColor = "bg-[#FEF3E7]"; // Orange pastel (51-75%)
  }
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={`flex items-center px-3 py-1.5 rounded-full ${bgColor} whitespace-nowrap`}>
            <span className="mr-2">{icon}</span>
            <span className="font-medium text-[12px]">
              {current}/{total}
            </span>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{label} – Target: {total}, Completed: {current}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

interface CompactViewProps {
  onExpand: () => void;
}

export const CompactView: React.FC<CompactViewProps> = ({ onExpand }) => {
  return (
    <div className="bg-white w-full py-3 px-5 rounded-md flex items-center justify-between border border-gray-200">
      <h2 className="text-[#1A1A1A] text-[14px] font-semibold">
        Daily Metrics
      </h2>
      
      <div className="flex-1 overflow-x-auto mx-4">
        <div className="flex items-center gap-3 w-max">
          <MetricItem 
            icon="☎️" 
            label="Calls" 
            current={13} 
            total={15} 
          />
          <MetricItem 
            icon="👁️" 
            label="Profiles Reviewed" 
            current={20} 
            total={20} 
          />
          <MetricItem 
            icon="📄" 
            label="Interviews Scheduled" 
            current={14} 
            total={25} 
          />
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <span className="text-[#666666] text-[12px] whitespace-nowrap">2 More Call for Today</span>
        <button className="bg-[#00A341] text-white text-[12px] font-medium px-4 py-1 rounded-full hover:bg-[#00A341]/90">
          Take
        </button>
        <button 
          onClick={onExpand} 
          className="flex items-center justify-center h-8 w-8 rounded-full hover:bg-gray-100"
        >
          <ChevronDown size={18} />
        </button>
      </div>
    </div>
  );
};
