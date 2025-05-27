
import React, { useState, useMemo } from "react";
import { InteractiveCardContainer } from "../../../hr/components/animations/InteractiveCardContainer";
import { StreakHeader } from "./streak/StreakHeader";
import { StreakCalendar } from "./streak/StreakCalendar";
import { StreakLegend } from "./streak/StreakLegend";
import { generateStreakData } from "./streak/streakUtils";

export const EnhancedStreakCard: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedDate, setSelectedDate] = useState("Last 90 days");
  
  // Memoize the streak data to prevent regeneration
  const streakData = useMemo(() => generateStreakData(90), []);
  
  const navigatePeriod = (direction: 'prev' | 'next') => {
    // Navigation logic would go here
    console.log(`Navigate ${direction}`);
  };

  return (
    <InteractiveCardContainer
      hoverEffect="lift"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="bg-white border min-w-80 min-h-[350px] grow shrink w-[450px] pt-[11px] pb-[23px] px-4 rounded-xl border-[rgba(246,246,246,1)] border-solid hover:border-[#009933]/30 hover:shadow-lg transition-all duration-300"
    >
      <div className="flex w-full max-w-[500px] flex-col items-stretch">
        <StreakHeader 
          isHovered={isHovered}
          selectedDate={selectedDate}
          onNavigate={navigatePeriod}
          streakData={streakData}
        />
        
        <StreakCalendar streakData={streakData} />
        
        <StreakLegend streakData={streakData} />
      </div>
    </InteractiveCardContainer>
  );
};
