
import React from "react";
import { motion } from "framer-motion";
import { EnhancedFunnelStage } from "./EnhancedFunnelStage";

interface FunnelStage {
  name: string;
  status: "On Track" | "Delayed";
  current: number;
  target: number;
  trend: "up" | "down";
}

interface FunnelStagesListProps {
  stages: FunnelStage[];
}

export const FunnelStagesList: React.FC<FunnelStagesListProps> = ({ stages }) => {
  return (
    <motion.div 
      className="flex w-full flex-col items-stretch text-center mt-[19px]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      {stages.map((stage, index) => (
        <EnhancedFunnelStage 
          key={stage.name}
          {...stage}
          index={index}
        />
      ))}
    </motion.div>
  );
};
