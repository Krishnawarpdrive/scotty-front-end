
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  value: number;
  max: number;
  color?: string;
  height?: number;
  label?: string;
  showValue?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max,
  color = '#0088FE',
  height = 6,
  label,
  showValue = true
}) => {
  const [currentValue, setCurrentValue] = useState(0);
  const percentage = (value / max) * 100;
  
  useEffect(() => {
    // Animate the progress bar on mount
    const timer = setTimeout(() => {
      setCurrentValue(value);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [value]);

  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm text-gray-600">{label}</span>
          {showValue && <span className="text-sm text-gray-600">{value}/{max}</span>}
        </div>
      )}
      <div className="w-full bg-gray-200 rounded-full overflow-hidden" style={{ height: `${height}px` }}>
        <motion.div
          className="h-full rounded-full"
          style={{ 
            backgroundColor: color,
            width: '0%'
          }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};
