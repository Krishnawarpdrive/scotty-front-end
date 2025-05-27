
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { InteractiveCardContainer } from "../../../hr/components/animations/InteractiveCardContainer";

export const EnhancedStreakCard: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedDate, setSelectedDate] = useState("12Apr - 19 Apr");
  
  const navigatePeriod = (direction: 'prev' | 'next') => {
    // Navigation logic would go here
    console.log(`Navigate ${direction}`);
  };

  return (
    <InteractiveCardContainer
      hoverEffect="lift"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="bg-white border min-w-60 min-h-[198px] grow shrink w-[312px] pt-[11px] pb-[23px] px-1.5 rounded-xl border-[rgba(246,246,246,1)] border-solid hover:border-[#009933]/30 hover:shadow-lg transition-all duration-300"
    >
      <div className="flex w-full max-w-[352px] flex-col items-stretch">
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
              🔥14
            </motion.div>
          </motion.div>
          
          <div className="self-stretch flex items-center gap-1 text-xs text-black font-normal justify-between w-[110px] my-auto">
            <motion.button 
              aria-label="Previous period"
              onClick={() => navigatePeriod('prev')}
              whileHover={{ scale: 1.2, color: "#009933" }}
              whileTap={{ scale: 0.9 }}
              className="transition-colors duration-200"
            >
              <ChevronLeft className="h-3 w-3" />
            </motion.button>
            
            <motion.div 
              className="self-stretch my-auto"
              animate={{ color: isHovered ? "#009933" : "black" }}
              transition={{ duration: 0.2 }}
            >
              {selectedDate}
            </motion.div>
            
            <motion.button 
              aria-label="Next period"
              onClick={() => navigatePeriod('next')}
              whileHover={{ scale: 1.2, color: "#009933" }}
              whileTap={{ scale: 0.9 }}
              className="transition-colors duration-200"
            >
              <ChevronRight className="h-3 w-3" />
            </motion.button>
          </div>
        </div>
        
        <motion.div 
          className="flex w-full flex-col mt-2 py-5"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="self-stretch gap-[40px_50px] text-[10px] text-[rgba(121,126,133,1)] font-normal whitespace-nowrap px-[35px] max-md:px-5">
            Mar
          </div>
          
          <div className="flex items-center gap-0.5 text-[10px] text-gray-600 font-normal whitespace-nowrap">
            {[12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, "01", "02", "03", "04"].map((day, index) => (
              <motion.div 
                key={index} 
                className="self-stretch w-3 my-auto"
                whileHover={{ scale: 1.2, color: "#009933" }}
                transition={{ duration: 0.2 }}
              >
                {day}
              </motion.div>
            ))}
          </div>
          
          <div className="w-full">
            {/* Row 1 - Calls */}
            <div className="flex w-full items-center gap-0.5 justify-center">
              <motion.div 
                className="self-stretch flex min-h-4 items-center gap-2.5 justify-center w-4 my-auto"
                whileHover={{ scale: 1.1 }}
              >
                <div className="w-3 h-3 bg-green-500 rounded-sm" />
              </motion.div>
              {Array(24).fill(null).map((_, index) => {
                let bgColor = "bg-[rgba(214,236,171,1)]";
                if (index === 1 || index === 7) bgColor = "bg-[rgba(236,236,171,1)]";
                else if (index === 6) bgColor = "bg-[rgba(236,193,171,1)]";
                
                return (
                  <motion.div 
                    key={`row1-${index}`} 
                    className={`${bgColor} self-stretch flex w-3 shrink-0 h-3 my-auto rounded-sm cursor-pointer`}
                    whileHover={{ 
                      scale: 1.2, 
                      boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                      zIndex: 10
                    }}
                    transition={{ duration: 0.2 }}
                  />
                );
              })}
            </div>
            
            {/* Row 2 - Profiles */}
            <div className="flex w-full items-center gap-0.5 justify-center">
              <motion.div 
                className="self-stretch flex min-h-4 items-center gap-2.5 justify-center w-4 my-auto"
                whileHover={{ scale: 1.1 }}
              >
                <div className="w-3 h-3 bg-blue-500 rounded-sm" />
              </motion.div>
              {Array(24).fill(null).map((_, index) => {
                let bgColor = "bg-[rgba(214,236,171,1)]";
                if (index === 1 || index === 7) bgColor = "bg-[rgba(236,236,171,1)]";
                else if (index === 6) bgColor = "bg-[rgba(236,214,171,1)]";
                
                return (
                  <motion.div 
                    key={`row2-${index}`} 
                    className={`${bgColor} self-stretch flex w-3 shrink-0 h-3 my-auto rounded-sm cursor-pointer`}
                    whileHover={{ 
                      scale: 1.2, 
                      boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                      zIndex: 10
                    }}
                    transition={{ duration: 0.2 }}
                  />
                );
              })}
            </div>
            
            {/* Row 3 - Interviews */}
            <div className="flex w-full items-center gap-0.5 justify-center">
              <motion.div 
                className="self-stretch flex min-h-4 items-center gap-2.5 justify-center w-4 my-auto"
                whileHover={{ scale: 1.1 }}
              >
                <div className="w-3 h-3 bg-yellow-500 rounded-sm" />
              </motion.div>
              {Array(24).fill(null).map((_, index) => {
                let bgColor = "bg-[rgba(214,236,171,1)]";
                if (index === 1) bgColor = "bg-[rgba(236,236,171,1)]";
                
                return (
                  <motion.div 
                    key={`row3-${index}`} 
                    className={`${bgColor} self-stretch flex w-3 shrink-0 h-3 my-auto rounded-sm cursor-pointer`}
                    whileHover={{ 
                      scale: 1.2, 
                      boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                      zIndex: 10
                    }}
                    transition={{ duration: 0.2 }}
                  />
                );
              })}
            </div>
          </div>
        </motion.div>
        
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
              {["bg-[rgba(223,115,115,1)]", "bg-[rgba(223,151,115,1)]", "bg-[rgba(223,187,115,1)]", "bg-[rgba(223,223,115,1)]", "bg-[rgba(187,223,115,1)]"].map((color, index) => (
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
      </div>
    </InteractiveCardContainer>
  );
};
