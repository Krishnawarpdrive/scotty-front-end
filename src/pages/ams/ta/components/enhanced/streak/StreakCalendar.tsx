
import React from "react";
import { motion } from "framer-motion";
import { StreakGrid } from "./StreakGrid";
import { calculateLongestStreak } from "./streakUtils";


interface DayData {
  date: string;
  calls: number;
  profiles: number;
  interviews: number;
  callsTarget: number;
  profilesTarget: number;
  interviewsTarget: number;
}

interface StreakCalendarProps {
  streakData: (DayData|null)[];
  totalWeeks: number;
  days?: number;
}

export const StreakCalendar: React.FC<StreakCalendarProps> = ({ streakData, totalWeeks, days }) => {
  const data = (days ? streakData.slice(-days) : streakData).filter((d): d is DayData => d !== null);
  const longestStreak = calculateLongestStreak(data);
  
  // Calculate total contributions
  const totalContributions = data.reduce((total, day) => {
    return total + day.calls + day.profiles + day.interviews;
  }, 0);

  return (
    <motion.div 
      className="flex w-full flex-col mt-2 py-5"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <div className="mb-2">
        <StreakGrid streakData={streakData} totalWeeks={totalWeeks} />
      </div>
      
      {/* Activity legend */}
      <div className="flex items-center justify-between mt-4">
        <div className="text-xs text-gray-600">
          Less
        </div>
        <div className="flex items-center gap-0.5">
          <div className="w-3 h-3 bg-gray-100 rounded-sm border border-gray-200"></div>
          <div className="w-3 h-3 bg-red-200 rounded-sm border border-gray-200"></div>
          <div className="w-3 h-3 bg-yellow-300 rounded-sm border border-gray-200"></div>
          <div className="w-3 h-3 bg-orange-400 rounded-sm border border-gray-200"></div>
          <div className="w-3 h-3 bg-green-500 rounded-sm border border-gray-200"></div>
        </div>
        <div className="text-xs text-gray-600">
          More
        </div>
      </div>
      
      <div className="text-[10px] text-gray-500 mt-2">
        Hover over each day to see detailed activity breakdown
      </div>

      <div className="flex items-center justify-between mt-2">
        <div className="text-gray-600 text-xs font-normal">
          Longest Streak: {longestStreak} days
        </div>

        <div className="text-gray-600 text-xs font-normal">
          Total: {totalContributions} activities
        </div>
      </div>
    </motion.div>
  );
};
