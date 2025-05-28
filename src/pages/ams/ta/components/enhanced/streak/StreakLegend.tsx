
import React from "react";
import { motion } from "framer-motion";
import { calculateLongestStreak } from "./streakUtils";


import type { DayData } from "./streakUtils";

interface StreakLegendProps {
  streakData: (DayData|null)[];
  days?: number;
}

export const StreakLegend: React.FC<StreakLegendProps> = ({ streakData, days }) => {
  // Only use the last N days if days prop is provided
  const data = (days ? streakData.slice(-days) : streakData).filter((d): d is DayData => d !== null);
  const longestStreak = calculateLongestStreak(data);

  // Calculate total contributions
  const totalContributions = data.reduce((total, day) => {
    return total + day.calls + day.profiles + day.interviews;
  }, 0);

  // Calculate target achievement percentages
  const targetMetrics = data.reduce((acc, day) => {
    acc.calls += day.calls >= day.callsTarget ? 1 : 0;
    acc.profiles += day.profiles >= day.profilesTarget ? 1 : 0;
    acc.interviews += day.interviews >= day.interviewsTarget ? 1 : 0;
    return acc;
  }, { calls: 0, profiles: 0, interviews: 0 });

  const callsPercentage = Math.round((targetMetrics.calls / data.length) * 100);
  const profilesPercentage = Math.round((targetMetrics.profiles / data.length) * 100);
  const interviewsPercentage = Math.round((targetMetrics.interviews / data.length) * 100);

  const getPercentageColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <motion.div 
      className="flex w-full flex-col gap-3 mt-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <div className="flex items-center justify-between">
        <div className="text-gray-600 text-xs font-normal">
          Longest Streak: {longestStreak} days
        </div>
        
        <div className="text-gray-600 text-xs font-normal">
          Total: {totalContributions} activities
        </div>
      </div>
      
      <div className="flex items-center justify-between text-xs">
        <span className="text-gray-600">Target Achievement:</span>
        <div className="flex items-center gap-4">
          <span className={`${getPercentageColor(callsPercentage)}`}>
            📞 {callsPercentage}%
          </span>
          <span className={`${getPercentageColor(profilesPercentage)}`}>
            👤 {profilesPercentage}%
          </span>
          <span className={`${getPercentageColor(interviewsPercentage)}`}>
            🗣️ {interviewsPercentage}%
          </span>
        </div>
      </div>
    </motion.div>
  );
};
