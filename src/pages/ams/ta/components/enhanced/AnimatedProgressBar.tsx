
import React from "react";
import { motion } from "framer-motion";

interface AnimatedProgressBarProps {
  value: number;
  max: number;
  showValue?: boolean;
  animationDelay?: number;
}

export const AnimatedProgressBar: React.FC<AnimatedProgressBarProps> = ({ 
  value, 
  max, 
  showValue = true, 
  animationDelay = 0 
}) => {
  const percentage = Math.min((value / max) * 100, 100);
  
  return (
    <div className="w-full space-y-2">
      <div className="relative">
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-[#009933]"
            initial={{ width: "0%" }}
            animate={{ width: `${percentage}%` }}
            transition={{ 
              duration: 0.8, 
              ease: "easeOut",
              delay: animationDelay / 1000
            }}
          />
        </div>
      </div>
    </div>
  );
};
