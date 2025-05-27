
import React, { useState } from "react";
import { motion } from "framer-motion";

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
  const [isHovered, setIsHovered] = useState(false);

  const getIntensityLevel = () => {
    const totalAchieved = [
      dayData.calls >= dayData.callsTarget,
      dayData.profiles >= dayData.profilesTarget,
      dayData.interviews >= dayData.interviewsTarget
    ].filter(Boolean).length;

    const totalActivity = dayData.calls + dayData.profiles + dayData.interviews;

    if (totalActivity === 0) return 0;
    if (totalAchieved === 3) return 4; // All targets met
    if (totalAchieved === 2) return 3; // 2 targets met
    if (totalAchieved === 1) return 2; // 1 target met
    return 1; // Activity but no targets met
  };

  const getBackgroundColor = () => {
    const level = getIntensityLevel();
    switch (level) {
      case 0: return "bg-gray-100"; // No activity
      case 1: return "bg-red-200"; // Activity but no targets
      case 2: return "bg-yellow-300"; // 1 target met
      case 3: return "bg-orange-400"; // 2 targets met
      case 4: return "bg-green-500"; // All targets met
      default: return "bg-gray-100";
    }
  };

  const handleMouseEnter = (e: React.MouseEvent) => {
    setIsHovered(true);
    const rect = e.currentTarget.getBoundingClientRect();
    onHover(dayData, {
      x: rect.left + rect.width / 2,
      y: rect.top
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    onLeave();
  };

  return (
    <motion.div
      className={`w-3 h-3 rounded-sm cursor-pointer border border-gray-200 ${getBackgroundColor()}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileHover={{ 
        scale: 1.3,
        zIndex: 10,
        boxShadow: "0 2px 8px rgba(0,0,0,0.2)"
      }}
      transition={{ duration: 0.15 }}
      style={{
        filter: isHovered ? 'brightness(1.2)' : 'none'
      }}
    />
  );
};
