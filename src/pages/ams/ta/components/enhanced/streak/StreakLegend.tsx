
import React from "react";
import { motion } from "framer-motion";
import { generateStreakData, calculateLongestStreak } from "./streakUtils";

export const StreakLegend: React.FC = () => {
  const streakData = generateStreakData(90);
  const longestStreak = calculateLongestStreak(streakData);

  // Calculate total contributions
  const totalContributions = streakData.reduce((total, day) => {
    return total + day.calls + day.profiles + day.interviews;
  }, 0);

  return (
    <motion.div 
      className="flex w-full items-center gap-[40px_20px] justify-between mt-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <div className="text-gray-600 text-xs font-normal">
        Longest Streak: {longestStreak} days
      </div>
      
      <div className="text-gray-600 text-xs font-normal">
        Total: {totalContributions} activities
      </div>
      
      <div className="flex items-center gap-2">
        <div className="text-gray-600 text-xs font-normal">
          🎯 Daily targets: 5📞 4👤 2🗣️
        </div>
      </div>
    </motion.div>
  );
};
