
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedProgressBar } from "./AnimatedProgressBar";

interface EnhancedTargetItemProps {
  label: string;
  current: number;
  total: number;
  showButton?: boolean;
  buttonText?: string;
  buttonMessage?: string;
  onAction?: () => void;
}

export const EnhancedTargetItem: React.FC<EnhancedTargetItemProps> = ({ 
  label, 
  current, 
  total, 
  showButton = false, 
  buttonText = "Take", 
  buttonMessage = "",
  onAction
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const progress = (current / total) * 100;
  const isComplete = progress >= 100;
  
  return (
    <motion.div 
      className="w-full mt-3 first:mt-0"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex w-full items-center gap-[40px_100px] text-[11px] font-medium text-center justify-between">
        <motion.div 
          className="text-[rgba(2,8,23,1)] self-stretch my-auto"
          animate={{ color: isHovered ? "#009933" : "rgba(2,8,23,1)" }}
          transition={{ duration: 0.2 }}
        >
          {label}
        </motion.div>
        <motion.div 
          className="text-black self-stretch my-auto font-bold"
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.2 }}
        >
          {current}/{total}
        </motion.div>
      </div>
      
      <AnimatedProgressBar current={current} total={total} delay={0} />
      
      {showButton && !isComplete && (
        <motion.div 
          className="flex items-center gap-[5px] font-medium text-center mt-[9px]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="text-[rgba(102,102,102,1)] text-[11px] self-stretch my-auto">
            {buttonMessage}
          </div>
          <motion.button 
            className="bg-[rgba(0,153,51,1)] self-stretch flex min-h-[22px] flex-col overflow-hidden items-stretch text-[13px] text-white whitespace-nowrap tracking-[0.1px] leading-loose justify-center w-[59px] my-auto rounded-md transition-all duration-200"
            whileHover={{ 
              scale: 1.05, 
              backgroundColor: "rgba(0,133,41,1)",
              boxShadow: "0 4px 12px rgba(0,153,51,0.3)"
            }}
            whileTap={{ scale: 0.95 }}
            onClick={onAction}
          >
            <motion.div 
              className="leading-[20px]"
              animate={{ x: isHovered ? 2 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {buttonText}
            </motion.div>
          </motion.button>
        </motion.div>
      )}
      
      {isComplete && (
        <motion.div
          className="flex items-center justify-center mt-2"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
        >
          <div className="text-green-600 text-xs font-medium flex items-center gap-1">
            ✅ Completed!
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};
