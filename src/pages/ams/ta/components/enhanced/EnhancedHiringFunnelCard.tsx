
import React, { useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";
import { InteractiveCardContainer } from "../../../hr/components/animations/InteractiveCardContainer";

interface FunnelStageProps {
  name: string;
  status: "On Track" | "Delayed";
  current: number;
  target: number;
  trend: "up" | "down";
  index: number;
}

const EnhancedFunnelStage: React.FC<FunnelStageProps> = ({ name, status, current, target, trend, index }) => {
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

export const EnhancedHiringFunnelCard: React.FC = () => {
  const [timeframe, setTimeframe] = useState("D");
  const [isCardHovered, setIsCardHovered] = useState(false);
  
  const handleTimeframeChange = (newTimeframe: string) => {
    setTimeframe(newTimeframe);
  };
  
  const funnelStages = [
    { name: "Open", status: "On Track" as const, current: 23, target: 56, trend: "up" as const },
    { name: "Interviewing", status: "On Track" as const, current: 16, target: 25, trend: "up" as const },
    { name: "Offers", status: "On Track" as const, current: 2, target: 12, trend: "up" as const },
    { name: "Hired", status: "Delayed" as const, current: 1, target: 5, trend: "down" as const }
  ];
  
  return (
    <InteractiveCardContainer
      hoverEffect="lift"
      onMouseEnter={() => setIsCardHovered(true)}
      onMouseLeave={() => setIsCardHovered(false)}
      className="border self-stretch flex min-w-60 flex-col items-stretch justify-center grow shrink w-[206px] px-[5px] py-[7px] rounded-lg border-[rgba(246,246,246,1)] border-solid hover:border-[#009933]/30 hover:shadow-lg transition-all duration-300"
    >
      <div className="w-full">
        <div className="flex min-h-[22px] w-full items-center justify-between">
          <motion.div 
            className="self-stretch flex items-center gap-1.5 my-auto"
            animate={{ scale: isCardHovered ? 1.02 : 1 }}
            transition={{ duration: 0.2 }}
          >
            <div className="self-stretch flex items-center gap-1 text-black font-medium my-auto">
              <motion.div 
                className="text-lg self-stretch my-auto"
                animate={{ rotate: isCardHovered ? [0, -5, 5, 0] : 0 }}
                transition={{ duration: 0.5 }}
              >
                🗓️
              </motion.div>
              <div className="text-sm self-stretch my-auto">Hiring Funnel</div>
            </div>
            
            <div className="self-stretch flex items-center gap-1 my-auto">
              {[
                "bg-[rgba(184,218,174,1)]", 
                "bg-[rgba(170,180,213,1)]", 
                "bg-[rgba(218,215,174,1)]"
              ].map((color, index) => (
                <motion.div 
                  key={index}
                  className="self-stretch flex items-center gap-px justify-center my-auto"
                  whileHover={{ scale: 1.2, y: -1 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className={`${color} self-stretch flex min-h-[9px] w-[9px] h-[9px] my-auto rounded-[50%]`} />
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          <div className="bg-white border self-stretch flex items-center overflow-hidden text-xs text-slate-900 font-normal whitespace-nowrap w-[108px] my-auto rounded-sm border-[rgba(247,247,247,1)] border-solid">
            {["D", "W", "M", "Y"].map((option) => (
              <motion.button
                key={option}
                className={`self-stretch ${timeframe === option ? "bg-[rgba(219,240,227,1)]" : ""} text-slate-900 flex-1 shrink basis-[0%] my-auto py-1 ${option !== "Y" ? "border-[rgba(240,240,240,1)] border-r" : ""} transition-all duration-200`}
                onClick={() => handleTimeframeChange(option)}
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
        </div>
        
        <motion.div 
          className="flex w-full flex-col items-stretch text-center mt-[19px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {funnelStages.map((stage, index) => (
            <EnhancedFunnelStage 
              key={stage.name}
              {...stage}
              index={index}
            />
          ))}
        </motion.div>
      </div>
    </InteractiveCardContainer>
  );
};
