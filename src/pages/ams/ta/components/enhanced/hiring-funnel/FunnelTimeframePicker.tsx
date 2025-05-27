
import React from "react";
import { motion } from "framer-motion";

interface FunnelTimeframePickerProps {
  timeframe: string;
  onTimeframeChange: (timeframe: string) => void;
}

export const FunnelTimeframePicker: React.FC<FunnelTimeframePickerProps> = ({ 
  timeframe, 
  onTimeframeChange 
}) => {
  return (
    <div className="bg-white border self-stretch flex items-center overflow-hidden text-xs text-slate-900 font-normal whitespace-nowrap w-[108px] my-auto rounded-sm border-[rgba(247,247,247,1)] border-solid">
      {["D", "W", "M", "Y"].map((option) => (
        <motion.button
          key={option}
          className={`self-stretch ${timeframe === option ? "bg-[rgba(219,240,227,1)]" : ""} text-slate-900 flex-1 shrink basis-[0%] my-auto py-1 ${option !== "Y" ? "border-[rgba(240,240,240,1)] border-r" : ""} transition-all duration-200`}
          onClick={() => onTimeframeChange(option)}
          whileHover={{ 
            backgroundColor: timeframe === option ? "rgba(219,240,227,1)" : "rgba(0,153,51,0.1)",
            scale: 1.05 
          }}
          whileTap={{ scale: 0.95 }}
        >
          {option}
        </motion.button>
      ))}
    </div>
  );
};
