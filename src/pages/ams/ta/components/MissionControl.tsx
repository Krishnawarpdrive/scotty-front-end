
import React from "react";
import { motion } from "framer-motion";
import { DailyMetrics } from "./DailyMetrics";
import { ApplicationStages } from "./ApplicationStages";
import { ApplicationActions } from "./ApplicationActions";
import { EnhancedApplicationTable } from "./enhanced/EnhancedApplicationTable";
import { InterviewDashboard } from "./interview-management/InterviewDashboard";
import { CompactInterviewDashboard } from "./interview-management/CompactInterviewDashboard";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

export const MissionControl: React.FC = () => {
  const { hasRole } = useAuth();
  const isInterviewer = hasRole('interviewer');

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
      
      {/* Interviewer Dashboard Access */}
      {isInterviewer && (
        <motion.div
          className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg border border-purple-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-purple-900">Interviewer Dashboard</h3>
              <p className="text-purple-700">Access your gamification dashboard, achievements, and interview schedule.</p>
            </div>
            <Button asChild className="bg-purple-600 hover:bg-purple-700">
              <a href="/ams/interviewer/dashboard" className="flex items-center gap-2">
                <ExternalLink className="h-4 w-4" />
                Open Dashboard
              </a>
            </Button>
          </div>
        </motion.div>
      )}
      
      {/* Interview Management Section */}
      {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
      </div> */}
      
      <EnhancedApplicationTable />
    </motion.div>
  );
};
