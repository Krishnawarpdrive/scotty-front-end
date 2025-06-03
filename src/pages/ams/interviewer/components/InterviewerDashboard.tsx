
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DashboardHeader } from './DashboardHeader';
import { GamificationOverview } from './gamification/GamificationOverview';
import { PerformanceMetrics } from './metrics/PerformanceMetrics';
import { AchievementsList } from './achievements/AchievementsList';
import { LeaderboardView } from './leaderboard/LeaderboardView';
import { InterviewSchedule } from './schedule/InterviewSchedule';
import { useInterviewerData } from '../hooks/useInterviewerData';

export const InterviewerDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { interviewer, metrics, achievements, leaderboard, isLoading } = useInterviewerData();

  if (isLoading) {
    return <div className="flex items-center justify-center h-96">Loading dashboard...</div>;
  }

  return (
    <motion.div 
      className="min-h-screen bg-gray-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 py-6">
        <DashboardHeader interviewer={interviewer} />
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="metrics">Metrics</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <GamificationOverview 
              interviewer={interviewer}
              metrics={metrics}
              achievements={achievements}
            />
          </TabsContent>

          <TabsContent value="metrics" className="mt-6">
            <PerformanceMetrics metrics={metrics} />
          </TabsContent>

          <TabsContent value="achievements" className="mt-6">
            <AchievementsList achievements={achievements} />
          </TabsContent>

          <TabsContent value="leaderboard" className="mt-6">
            <LeaderboardView leaderboard={leaderboard} currentPanelist={interviewer} />
          </TabsContent>

          <TabsContent value="schedule" className="mt-6">
            <InterviewSchedule panelistId={interviewer?.id} />
          </TabsContent>
        </Tabs>
      </div>
    </motion.div>
  );
};
