
import React, { useState, useMemo } from "react";
import { InteractiveCardContainer } from "../../../hr/components/animations/InteractiveCardContainer";
import { StreakHeader } from "./streak/StreakHeader";
import { StreakCalendar } from "./streak/StreakCalendar";
import { StreakLegend } from "./streak/StreakLegend";
import { generateStreakData, getTotalWeeks } from "./streak/streakUtils";
import { useResponsiveDays } from "./streak/useResponsiveDays";

export const EnhancedStreakCard: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedDate, setSelectedDate] = useState("Last 90 days");

  // Responsive: determine how many days to show based on card width
  const [containerRef, days] = useResponsiveDays(30, 120);
  // Responsive grid: calculate number of weeks to fill the grid
  const totalWeeks = getTotalWeeks(days);
  // Memoize the streak data to prevent regeneration
  const streakData = useMemo(() => generateStreakData(days), [days]);

  const navigatePeriod = (direction: 'prev' | 'next') => {
    // Navigation logic would go here
    console.log(`Navigate ${direction}`);
  };

  return (
    <InteractiveCardContainer
      hoverEffect="lift"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="bg-white border min-w-[400px] min-h-[250px] flex-grow flex-shrink rounded-xl pt-[11px] pb-[23px] px-4 border-[rgba(246,246,246,1)] border-solid hover:border-[#009933]/30 hover:shadow-lg transition-all duration-300"
    >
      <div ref={containerRef} className="flex w-full max-w-[500px] flex-col items-stretch">
        <StreakHeader 
          isHovered={isHovered}
          selectedDate={selectedDate}
          onNavigate={navigatePeriod}
          streakData={streakData}
        />
        <StreakCalendar streakData={streakData} totalWeeks={totalWeeks} days={days} />
        {/* <StreakLegend streakData={streakData} days={days} /> */}
      </div>
    </InteractiveCardContainer>
  );
};
