
import React from "react";
import { motion } from "framer-motion";
import { StreakDay } from "./StreakDay";

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
  streakData: (DayData|null)[];
  totalWeeks: number;
}

export const StreakGrid: React.FC<StreakGridProps> = ({ streakData, totalWeeks }) => {
  // Always create a grid with totalWeeks columns (weeks) and 7 rows (days)
  const weeks = [];
  for (let i = 0; i < totalWeeks; i++) {
    const weekData = [];
    for (let j = 0; j < 7; j++) {
      const dataIndex = i * 7 + j;
      weekData.push(streakData[dataIndex] || null);
    }
    weeks.push(weekData);
  }

  const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const handleDayHover = () => {
    // No longer needed with Radix tooltip
  };

  const handleDayLeave = () => {
    // No longer needed with Radix tooltip
  };

  return (
    <motion.div 
      className="flex flex-col gap-1"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <div className="flex">
        {/* Weekday labels column */}
        <div className="flex flex-col gap-0.5 mr-2">
          <div className="h-3 mb-2"></div> {/* Spacer for month labels */}
          {weekDays.map((day, index) => (
            <div key={index} className="h-3 text-xs text-gray-500 flex items-center">
              {index % 2 === 1 ? day : ''} {/* Show only alternate labels for space */}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="flex flex-col">
          {/* Month labels */}
          <div className="flex justify-between text-xs text-gray-500 mb-2 h-3">
            <span>3 months ago</span>
            <span>2 months ago</span>
            <span>1 month ago</span>
            <span>Today</span>
          </div>
          
          {/* Grid of weeks */}
          <div className="flex gap-0.5">
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-0.5">
                {week.map((day, dayIndex) => (
                  <div key={`${weekIndex}-${dayIndex}`} className="w-3 h-3">
                    {day ? (
                      <StreakDay
                        dayData={day}
                        onHover={handleDayHover}
                        onLeave={handleDayLeave}
                      />
                    ) : (
                      <div className="w-3 h-3"></div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
