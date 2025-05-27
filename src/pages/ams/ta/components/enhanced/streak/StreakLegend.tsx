
import React from "react";
import { motion } from "framer-motion";

export const StreakLegend: React.FC = () => {
  const legendColors = [
    "bg-[rgba(223,115,115,1)]",
    "bg-[rgba(223,151,115,1)]", 
    "bg-[rgba(223,187,115,1)]", 
    "bg-[rgba(223,223,115,1)]", 
    "bg-[rgba(187,223,115,1)]"
  ];

  return (
    <motion.div 
      className="flex w-full items-center gap-[40px_86px] justify-between mt-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <div className="text-gray-600 text-xs font-normal self-stretch my-auto">
        Longest Streak: 95 days
      </div>
      <div className="self-stretch flex items-center gap-2 my-auto">
        <div className="text-gray-600 text-xs font-normal self-stretch my-auto">0%</div>
        <div className="self-stretch flex items-center gap-px my-auto">
          {legendColors.map((color, index) => (
            <motion.div 
              key={index}
              className={`${color} self-stretch flex w-3 shrink-0 h-3 my-auto cursor-pointer`}
              whileHover={{ scale: 1.2, y: -2 }}
              transition={{ duration: 0.2 }}
            />
          ))}
        </div>
        <div className="text-gray-600 text-xs font-normal self-stretch my-auto">100%</div>
      </div>
    </motion.div>
  );
};
