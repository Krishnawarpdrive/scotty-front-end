
import React from "react";
import { motion } from "framer-motion";
import { DailyMetrics } from "./DailyMetrics";
import { ApplicationStages } from "./ApplicationStages";
import { ApplicationActions } from "./ApplicationActions";
import { EnhancedApplicationTable } from "./enhanced/EnhancedApplicationTable";
import { InterviewDashboard } from "./interview-management/InterviewDashboard";
import { CompactInterviewDashboard } from "./interview-management/CompactInterviewDashboard";

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
      
      {/* Interview Management Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <InterviewDashboard />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <CompactInterviewDashboard />
        </motion.div>
      </div>
      
      <EnhancedApplicationTable />
    </motion.div>
  );
};
