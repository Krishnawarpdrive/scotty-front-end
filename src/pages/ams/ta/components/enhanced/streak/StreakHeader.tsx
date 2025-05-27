
import React from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { generateStreakData, calculateCurrentStreak } from "./streakUtils";

interface StreakHeaderProps {
  isHovered: boolean;
  selectedDate: string;
  onNavigate: (direction: 'prev' | 'next') => void;
}

export const StreakHeader: React.FC<StreakHeaderProps> = ({
  isHovered,
  selectedDate,
  onNavigate
}) => {
  const streakData = generateStreakData(90);
  const currentStreak = calculateCurrentStreak(streakData);

  return (
    <div className="flex w-full items-center gap-[40px_100px] justify-between pl-3 py-[3px]">
      <motion.div 
        className="self-stretch flex items-center gap-1.5 font-medium whitespace-nowrap my-auto"
        animate={{ scale: isHovered ? 1.05 : 1 }}
        transition={{ duration: 0.2 }}
      >
        <div className="text-[rgba(2,8,23,1)] text-sm self-stretch my-auto">
          Streak
        </div>
        <motion.div 
          className="text-black text-lg leading-none self-stretch my-auto"
          animate={{ 
            scale: isHovered ? 1.1 : 1,
            rotate: isHovered ? [0, -2, 2, 0] : 0
          }}
          transition={{ duration: 0.3 }}
        >
          🔥{currentStreak}
        </motion.div>
      </motion.div>
      
      <div className="self-stretch flex items-center gap-1 text-xs text-black font-normal justify-between w-[110px] my-auto">
        <motion.button 
          aria-label="Previous period"
          onClick={() => onNavigate('prev')}
          whileHover={{ scale: 1.2, color: "#009933" }}
          whileTap={{ scale: 0.9 }}
          className="transition-colors duration-200"
        >
          <ChevronLeft className="h-3 w-3" />
        </motion.button>
        
        <motion.div 
          className="self-stretch my-auto text-center"
          animate={{ color: isHovered ? "#009933" : "black" }}
          transition={{ duration: 0.2 }}
        >
          Last 90 days
        </motion.div>
        
        <motion.button 
          aria-label="Next period"
          onClick={() => onNavigate('next')}
          whileHover={{ scale: 1.2, color: "#009933" }}
          whileTap={{ scale: 0.9 }}
          className="transition-colors duration-200"
        >
          <ChevronRight className="h-3 w-3" />
        </motion.button>
      </div>
    </div>
  );
};
