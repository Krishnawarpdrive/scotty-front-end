
import React from "react";
import { motion } from "framer-motion";
import { DailyMetrics } from "./DailyMetrics";
import { ApplicationStages } from "./ApplicationStages";
import { ApplicationActions } from "./ApplicationActions";
import { EnhancedApplicationTable } from "./enhanced/EnhancedApplicationTable";

export const MissionControl: React.FC = () => {
  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <DailyMetrics />
      <ApplicationStages />
      <ApplicationActions />
      <EnhancedApplicationTable />
    </motion.div>
  );
};
