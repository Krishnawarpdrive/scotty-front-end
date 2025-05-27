
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { InteractiveCardContainer } from "../../../hr/components/animations/InteractiveCardContainer";

interface TargetItemProps {
  label: string;
  current: number;
  total: number;
  showButton?: boolean;
  buttonText?: string;
  buttonMessage?: string;
  onAction?: () => void;
}

interface BubbleProps {
  id: string;
  x: number;
  y: number;
}

const AnimatedProgressBar: React.FC<{
  current: number;
  total: number;
  delay?: number;
}> = ({ current, total, delay = 0 }) => {
  const [animatedValue, setAnimatedValue] = useState(0);
  const progress = Math.min((animatedValue / total) * 100, 100);
  const isComplete = progress >= 100;

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedValue(current);
    }, delay);
    return () => clearTimeout(timer);
  }, [current, delay]);

  return (
    <div className="w-full mt-[5px] relative overflow-hidden">
      <div className="bg-[rgba(0,0,0,0.1)] flex flex-col rounded-[10px] h-1.5 relative">
        <motion.div 
          className="flex shrink-0 h-1.5 rounded-[10px] relative overflow-hidden"
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1.2, ease: "easeOut", delay: delay / 1000 }}
          style={{
            background: isComplete 
              ? "linear-gradient(90deg, #00cc44, #00ff55, #00cc44)"
              : "linear-gradient(90deg, #009933, #00b33d, #009933)"
          }}
        >
          {/* Moving gradient shimmer effect */}
          <motion.div
            className="absolute inset-0 opacity-60"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
              width: "30%",
            }}
            animate={{ x: ["-100%", "400%"] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
              delay: delay / 1000 + 1.2
            }}
          />
        </motion.div>
      </div>
      
      {/* Completion celebration bubbles */}
      <AnimatePresence>
        {isComplete && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-green-400 rounded-full"
                style={{
                  left: `${20 + i * 15}%`,
                  top: "50%",
                }}
                initial={{ y: 0, opacity: 1, scale: 0 }}
                animate={{ 
                  y: [-5, -15, -25],
                  opacity: [1, 0.8, 0],
                  scale: [0, 1, 0.5]
                }}
                transition={{
                  duration: 1.5,
                  delay: i * 0.1,
                  ease: "easeOut"
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const EnhancedTargetItem: React.FC<TargetItemProps> = ({ 
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

export const EnhancedTodaysTargetsCard: React.FC = () => {
  const [isCardHovered, setIsCardHovered] = useState(false);
  
  const targets = [
    { label: "Calls", current: 13, total: 15, showButton: true, buttonMessage: "Just 2 Calls Away" },
    { label: "Profile Reviewed", current: 20, total: 20 },
    { label: "Interviews Scheduled", current: 14, total: 25 }
  ];

  return (
    <InteractiveCardContainer
      hoverEffect="lift"
      onMouseEnter={() => setIsCardHovered(true)}
      onMouseLeave={() => setIsCardHovered(false)}
      className="bg-white border min-w-60 min-h-[198px] grow shrink w-72 pt-[11px] pb-[19px] px-3.5 rounded-xl border-[rgba(246,246,246,1)] border-solid hover:border-[#009933]/30 hover:shadow-lg transition-all duration-300"
    >
      <div className="flex w-full max-w-[312px] flex-col items-stretch">
        <motion.div 
          className="flex items-center gap-1 text-black font-medium"
          animate={{ scale: isCardHovered ? 1.02 : 1 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div 
            className="text-lg self-stretch my-auto"
            animate={{ rotate: isCardHovered ? [0, -5, 5, 0] : 0 }}
            transition={{ duration: 0.5 }}
          >
            🗓️
          </motion.div>
          <div className="text-sm self-stretch my-auto">
            Today's Targets
          </div>
        </motion.div>
        
        <motion.div 
          className="w-full mt-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          {targets.map((target, index) => (
            <motion.div
              key={target.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + 0.3 }}
            >
              <EnhancedTargetItem 
                {...target}
                onAction={() => console.log(`Taking action for ${target.label}`)}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </InteractiveCardContainer>
  );
};
