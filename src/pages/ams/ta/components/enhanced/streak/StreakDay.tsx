
import React from "react";
import { motion } from "framer-motion";
import { getIntensityLevel, getBackgroundColor } from "./streakUtils";
import { EnhancedStreakTooltip } from "./EnhancedStreakTooltip";

interface DayData {
  date: string;
  calls: number;
  profiles: number;
  interviews: number;
  callsTarget: number;
  profilesTarget: number;
  interviewsTarget: number;
}

interface StreakDayProps {
  dayData: DayData;
  onHover: (dayData: DayData, position: { x: number; y: number }) => void;
  onLeave: () => void;
}

export const StreakDay: React.FC<StreakDayProps> = ({
  dayData,
  onHover,
  onLeave
}) => {
  const level = getIntensityLevel(dayData);
  const bgColor = getBackgroundColor(level);

  return (
    <EnhancedStreakTooltip dayData={dayData}>
      <motion.div
        className={`w-3 h-3 rounded-sm cursor-pointer border border-gray-200 ${bgColor}`}
        whileHover={{ 
          scale: 1.2,
          zIndex: 10
        }}
        transition={{ duration: 0.15 }}
      />
    </EnhancedStreakTooltip>
  );
};
