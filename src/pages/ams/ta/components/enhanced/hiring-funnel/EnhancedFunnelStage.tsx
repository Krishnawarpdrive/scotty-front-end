
import React, { useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";

interface EnhancedFunnelStageProps {
  name: string;
  status: "On Track" | "Delayed";
  current: number;
  target: number;
  trend: "up" | "down";
  index: number;
}

export const EnhancedFunnelStage: React.FC<EnhancedFunnelStageProps> = ({ 
  name, 
  status, 
  current, 
  target, 
  trend, 
  index 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const isDelayed = status === "Delayed";
  
  const statusBgColor = isDelayed 
    ? "bg-[rgba(255,45,61,0.4)]" 
    : name === "Interviewing" 
      ? "bg-[rgba(249,249,230,1)]" 
      : "bg-[rgba(243,249,230,1)]";
  
  const statusBorderColor = isDelayed 
    ? "border-[rgba(255,45,61,0)]" 
    : name === "Interviewing" 
      ? "border-[rgba(227,227,130,0.3)]" 
      : "border-[rgba(194,227,130,0.3)]";
  
  const statusTextColor = isDelayed ? "text-white" : "text-gray-600";
  const trendColor = trend === "up" ? "text-[rgba(0,153,51,1)]" : "text-[rgba(249,102,111,1)]";
  
  const bgColor = name === "Interviewing" 
    ? "bg-[rgba(236,236,171,0.1)]" 
    : name === "Hired" 
      ? "bg-[rgba(236,193,171,0.1)]" 
      : "bg-[rgba(214,236,171,0.1)]";

  return (
    <motion.div 
      className={`${bgColor} flex items-center gap-[40px_49px] justify-between mt-1.5 px-1.5 py-[5px] rounded-[3px] first:mt-0 cursor-pointer transition-all duration-200`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ 
        scale: 1.02, 
        backgroundColor: isDelayed ? "rgba(255,45,61,0.1)" : "rgba(0,153,51,0.05)" 
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="self-stretch flex items-center gap-[5px] font-normal my-auto">
        <motion.div 
          className="text-black text-[13px] self-stretch my-auto"
          animate={{ color: isHovered ? "#009933" : "black" }}
          transition={{ duration: 0.2 }}
        >
          {name}
        </motion.div>
        <motion.div 
          className={`self-stretch ${statusBgColor} border gap-2.5 text-[11px] ${statusTextColor} my-auto px-1.5 py-[3px] rounded-[20px] ${statusBorderColor} border-solid`}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          {status}
        </motion.div>
      </div>
      
      <div className="self-stretch flex items-center gap-[7px] whitespace-nowrap my-auto">
        <motion.div 
          className="text-gray-600 text-[13px] font-medium self-stretch my-auto"
          animate={{ scale: isHovered ? 1.1 : 1, color: isHovered ? "#009933" : "#6B7280" }}
          transition={{ duration: 0.2 }}
        >
          {current}
        </motion.div>
        <motion.div 
          className={`self-stretch flex items-center text-[11px] ${trendColor} font-normal my-auto`}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.2 }}
        >
          <div className="self-stretch my-auto">{target}</div>
          <motion.div
            animate={{ 
              y: trend === "up" ? [0, -2, 0] : [0, 2, 0],
              scale: isHovered ? 1.2 : 1 
            }}
            transition={{ duration: 0.5, repeat: Infinity }}
          >
            {trend === "up" ? (
              <TrendingUp className="w-2.5 h-2.5 ml-1" />
            ) : (
              <TrendingDown className="w-2.5 h-2.5 ml-1" />
            )}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};
