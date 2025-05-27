
import React, { useState } from "react";
import { InteractiveCardContainer } from "../../../hr/components/animations/InteractiveCardContainer";
import { StreakHeader } from "./streak/StreakHeader";
import { StreakCalendar } from "./streak/StreakCalendar";
import { StreakLegend } from "./streak/StreakLegend";

export const EnhancedStreakCard: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedDate, setSelectedDate] = useState("12Apr - 19 Apr");
  
  const navigatePeriod = (direction: 'prev' | 'next') => {
    // Navigation logic would go here
    console.log(`Navigate ${direction}`);
  };

  return (
    <InteractiveCardContainer
      hoverEffect="lift"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="bg-white border min-w-60 min-h-[198px] grow shrink w-[312px] pt-[11px] pb-[23px] px-1.5 rounded-xl border-[rgba(246,246,246,1)] border-solid hover:border-[#009933]/30 hover:shadow-lg transition-all duration-300"
    >
      <div className="flex w-full max-w-[352px] flex-col items-stretch">
        <StreakHeader 
          isHovered={isHovered}
          selectedDate={selectedDate}
          onNavigate={navigatePeriod}
        />
        
        <StreakCalendar />
        
        <StreakLegend />
      </div>
    </InteractiveCardContainer>
  );
};
