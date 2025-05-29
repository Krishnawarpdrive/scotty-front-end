
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AnimatedProgressBarProps {
  value?: number;
  max?: number;
  current?: number;
  total?: number;
  showValue?: boolean;
  animationDelay?: number;
  delay?: number;
}

export const AnimatedProgressBar: React.FC<AnimatedProgressBarProps> = ({ 
  value, 
  max, 
  current,
  total,
  showValue = true, 
  animationDelay = 0,
  delay = 0
}) => {
  // Support both prop styles for backwards compatibility
  const currentValue = current ?? value ?? 0;
  const totalValue = total ?? max ?? 100;
  const actualDelay = delay ?? animationDelay;
  
  const [animatedValue, setAnimatedValue] = useState(0);
  const progress = Math.min((animatedValue / totalValue) * 100, 100);
  const isComplete = progress >= 100;

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedValue(currentValue);
    }, actualDelay);
    return () => clearTimeout(timer);
  }, [currentValue, actualDelay]);
  
  return (
    <div className="w-full space-y-2">
      <div className="relative">
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <motion.div
            className="h-full rounded-full relative overflow-hidden"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ 
              duration: 1.2, 
              ease: "easeOut",
              delay: actualDelay / 1000
            }}
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
                delay: actualDelay / 1000 + 1.2
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
    </div>
  );
};
