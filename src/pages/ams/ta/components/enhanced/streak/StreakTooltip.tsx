
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface DayData {
  date: string;
  calls: number;
  profiles: number;
  interviews: number;
  callsTarget: number;
  profilesTarget: number;
  interviewsTarget: number;
}

interface StreakTooltipProps {
  dayData: DayData | null;
  position: { x: number; y: number };
  isVisible: boolean;
}

export const StreakTooltip: React.FC<StreakTooltipProps> = ({
  dayData,
  position,
  isVisible
}) => {
  if (!dayData) return null;

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getAchievementStatus = (actual: number, target: number) => {
    return actual >= target ? '✅' : '❌';
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.15 }}
          className="fixed z-50 bg-gray-900 text-white text-xs rounded-lg p-3 shadow-lg border border-gray-700 min-w-[200px]"
          style={{
            left: position.x,
            top: position.y - 10,
            transform: 'translateY(-100%)'
          }}
        >
          <div className="font-semibold mb-2 text-gray-200">
            {formatDate(dayData.date)}
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-sm"></div>
                Calls:
              </span>
              <span className="flex items-center gap-1">
                {dayData.calls}/{dayData.callsTarget}
                {getAchievementStatus(dayData.calls, dayData.callsTarget)}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-blue-500 rounded-sm"></div>
                Profiles:
              </span>
              <span className="flex items-center gap-1">
                {dayData.profiles}/{dayData.profilesTarget}
                {getAchievementStatus(dayData.profiles, dayData.profilesTarget)}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-yellow-500 rounded-sm"></div>
                Interviews:
              </span>
              <span className="flex items-center gap-1">
                {dayData.interviews}/{dayData.interviewsTarget}
                {getAchievementStatus(dayData.interviews, dayData.interviewsTarget)}
              </span>
            </div>
          </div>
          
          <div className="mt-2 pt-2 border-t border-gray-700 text-gray-400">
            {dayData.calls + dayData.profiles + dayData.interviews === 0 
              ? "No activity" 
              : "Activity recorded"}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
