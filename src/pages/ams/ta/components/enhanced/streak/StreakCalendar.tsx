
import React from "react";
import { motion } from "framer-motion";
import { StreakGrid } from "./StreakGrid";

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
  streakData: DayData[];
}

export const StreakCalendar: React.FC<StreakCalendarProps> = ({ streakData }) => {
  return (
    <motion.div 
      className="flex w-full flex-col mt-4 py-5"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <div className="mb-4">
        <StreakGrid streakData={streakData} />
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
      
      <div className="text-xs text-gray-500 mt-2 text-center">
        Hover over each day to see detailed activity breakdown
      </div>
    </motion.div>
  );
};
