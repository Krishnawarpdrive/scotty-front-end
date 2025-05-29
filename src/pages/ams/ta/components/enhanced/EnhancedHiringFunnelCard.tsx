
import React, { useState } from "react";
import { InteractiveCardContainer } from "../../../hr/components/animations/InteractiveCardContainer";
import { FunnelHeader } from "./hiring-funnel/FunnelHeader";
import { FunnelTimeframePicker } from "./hiring-funnel/FunnelTimeframePicker";
import { FunnelStagesList } from "./hiring-funnel/FunnelStagesList";

export const EnhancedHiringFunnelCard: React.FC = () => {
  const [timeframe, setTimeframe] = useState("D");
  const [isCardHovered, setIsCardHovered] = useState(false);
  
  const handleTimeframeChange = (newTimeframe: string) => {
    setTimeframe(newTimeframe);
  };
  
  const funnelStages = [
    { name: "Open", status: "On Track" as const, current: 23, target: 56, trend: "up" as const },
    { name: "Interviewing", status: "On Track" as const, current: 16, target: 25, trend: "up" as const },
    { name: "Offers", status: "On Track" as const, current: 2, target: 12, trend: "up" as const },
    { name: "Hired", status: "Delayed" as const, current: 1, target: 5, trend: "down" as const }
  ];
  
  return (
    <InteractiveCardContainer
      hoverEffect="lift"
      onMouseEnter={() => setIsCardHovered(true)}
      onMouseLeave={() => setIsCardHovered(false)}
      className="border self-stretch flex min-w-60 flex-col items-stretch justify-center grow shrink w-[206px] px-[5px] py-[7px] rounded-lg border-[rgba(246,246,246,1)] border-solid hover:border-[#009933]/30 hover:shadow-lg transition-all duration-300"
    >
      <div className="w-full">
        <div className="flex min-h-[22px] w-full items-center justify-between">
          <FunnelHeader isCardHovered={isCardHovered} />
          <FunnelTimeframePicker 
            timeframe={timeframe} 
            onTimeframeChange={handleTimeframeChange} 
          />
        </div>
        
        <FunnelStagesList stages={funnelStages} />
      </div>
    </InteractiveCardContainer>
  );
};
