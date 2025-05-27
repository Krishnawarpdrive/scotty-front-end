
import React from "react";
import { motion } from "framer-motion";
import { EnhancedDailyMetrics } from "./enhanced/EnhancedDailyMetrics";
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
      <EnhancedDailyMetrics />
      <ApplicationStages />
      <ApplicationActions />
      <EnhancedApplicationTable />
    </motion.div>
  );
};
