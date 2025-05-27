
import React, { useState } from "react";
import { motion } from "framer-motion";
import { StreakDay } from "./StreakDay";
import { StreakTooltip } from "./StreakTooltip";

interface DayData {
  date: string;
  calls: number;
  profiles: number;
  interviews: number;
  callsTarget: number;
  profilesTarget: number;
  interviewsTarget: number;
}

interface StreakGridProps {
  streakData: DayData[];
}

export const StreakGrid: React.FC<StreakGridProps> = ({ streakData }) => {
  const [hoveredDay, setHoveredDay] = useState<DayData | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [showTooltip, setShowTooltip] = useState(false);

  const handleDayHover = (dayData: DayData, position: { x: number; y: number }) => {
    setHoveredDay(dayData);
    setTooltipPosition(position);
    setShowTooltip(true);
  };

  const handleDayLeave = () => {
    setShowTooltip(false);
    setTimeout(() => {
      setHoveredDay(null);
    }, 150);
  };

  // Group days by weeks (7 days each)
  const weeks = [];
  for (let i = 0; i < streakData.length; i += 7) {
    weeks.push(streakData.slice(i, i + 7));
  }

  const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  return (
    <motion.div 
      className="flex flex-col gap-1"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      {/* Weekday labels */}
      <div className="flex gap-1 mb-2">
        <div className="w-3"></div> {/* Spacer for alignment */}
        {weekDays.map((day, index) => (
          <div key={index} className="w-3 text-xs text-gray-500 text-center">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-[repeat(13,1fr)] gap-1">
        {weeks.map((week, weekIndex) => (
          <React.Fragment key={weekIndex}>
            {week.map((day, dayIndex) => (
              <StreakDay
                key={`${weekIndex}-${dayIndex}`}
                dayData={day}
                onHover={handleDayHover}
                onLeave={handleDayLeave}
              />
            ))}
          </React.Fragment>
        ))}
      </div>

      {/* Month labels */}
      <div className="flex justify-between text-xs text-gray-500 mt-2">
        <span>3 months ago</span>
        <span>2 months ago</span>
        <span>1 month ago</span>
        <span>Today</span>
      </div>

      <StreakTooltip
        dayData={hoveredDay}
        position={tooltipPosition}
        isVisible={showTooltip}
      />
    </motion.div>
  );
};
