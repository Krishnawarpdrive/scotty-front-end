
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Progress } from '@/components/ui/progress';

interface AnimatedProgressBarProps {
  value: number;
  max: number;
  label?: string;
  color?: string;
  showValue?: boolean;
  animationDelay?: number;
  onMilestone?: (milestone: number) => void;
}

export const AnimatedProgressBar: React.FC<AnimatedProgressBarProps> = ({
  value,
  max,
  label,
  color = 'bg-blue-500',
  showValue = true,
  animationDelay = 0,
  onMilestone
}) => {
  const [currentValue, setCurrentValue] = useState(0);
  const [previousValue, setPreviousValue] = useState(0);
  const percentage = Math.min((currentValue / max) * 100, 100);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setPreviousValue(currentValue);
      setCurrentValue(value);
      
      // Check for milestones (25%, 50%, 75%, 100%)
      const milestones = [25, 50, 75, 100];
      const currentPercentage = (value / max) * 100;
      const previousPercentage = (previousValue / max) * 100;
      
      milestones.forEach(milestone => {
        if (previousPercentage < milestone && currentPercentage >= milestone) {
          onMilestone?.(milestone);
        }
      });
    }, animationDelay);
    
    return () => clearTimeout(timer);
  }, [value, max, animationDelay, currentValue, previousValue, onMilestone]);

  const getColorClass = () => {
    if (percentage >= 100) return 'bg-green-500';
    if (percentage >= 75) return 'bg-blue-500';
    if (percentage >= 50) return 'bg-yellow-500';
    return 'bg-gray-400';
  };

  return (
    <div className="w-full space-y-2">
      {label && (
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-700">{label}</span>
          {showValue && (
            <motion.span 
              className="text-sm text-gray-600"
              key={currentValue}
              initial={{ scale: 1.2, color: '#059669' }}
              animate={{ scale: 1, color: '#6B7280' }}
              transition={{ duration: 0.3 }}
            >
              {currentValue}/{max}
            </motion.span>
          )}
        </div>
      )}
      
      <div className="relative">
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <motion.div
            className={`h-full rounded-full ${getColorClass()}`}
            initial={{ width: `${(previousValue / max) * 100}%` }}
            animate={{ width: `${percentage}%` }}
            transition={{ 
              duration: 0.8, 
              ease: "easeOut",
              delay: animationDelay / 1000
            }}
          />
        </div>
        
        {/* Pulse effect on milestone */}
        {percentage >= 100 && (
          <motion.div
            className="absolute inset-0 bg-green-400 rounded-full opacity-30"
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.3, 0, 0.3]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity
            }}
          />
        )}
      </div>
    </div>
  );
};
