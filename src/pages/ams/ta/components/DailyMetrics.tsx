
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { EnhancedStreakCard } from "./enhanced/EnhancedStreakCard";
import { EnhancedTodaysTargetsCard } from "./enhanced/EnhancedTodaysTargetsCard";
import { EnhancedTimelyTrackCard } from "./enhanced/EnhancedTimelyTrackCard";
import { EnhancedHiringFunnelCard } from "./enhanced/EnhancedHiringFunnelCard";
import { CompactView } from "./CompactView";
import { ChevronUp } from "lucide-react";
import { StreakCelebration } from "./StreakCelebration";
import { triggerGoalCompletionToast, triggerMilestoneToast } from "@/components/GoalCompletionToast";
import { useGamification } from "@/store/hooks/useGamification";
import { StreakCard } from "./StreakCard";
import { TodaysTargetsCard } from "./TodaysTargetsCard";
import { TimelyTrackCard } from "./TimelyTrackCard";
import { HiringFunnelCard } from "./HiringFunnelCard";

export const DailyMetrics: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Default");
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [showStreakCelebration, setShowStreakCelebration] = useState(true);
  const [streakCount, setStreakCount] = useState(7);
  const [dailyGoalsCompleted, setDailyGoalsCompleted] = useState(3);
  
  const { 
    currentUser, 
    streakData, 
    incrementStreak, 
    updateGoal, 
    celebrationQueue,
    processCelebrationQueue 
  } = useGamification();
  
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleMilestone = (milestone: number, metricTitle: string) => {
    triggerMilestoneToast(milestone, metricTitle);
    
    // Simulate daily activity
    incrementStreak();
    
    // Update a daily goal
    setTimeout(() => {
      updateGoal('daily-applications', 3);
    }, 3000);
  };

  useEffect(() => {
    toggleCollapse();
  }, []);

  // Process celebration queue
  useEffect(() => {
    if (celebrationQueue.length > 0) {
      const celebration = processCelebrationQueue();
      if (celebration) {
        console.log('Processing celebration:', celebration);
      }
    }
  }, [celebrationQueue.length]);
  
  React.useEffect(() => {
    toggleCollapse();
    handleMilestone(5, 'Process 5 new applications');
  }, []);
  
  if (isCollapsed) {
    return <CompactView onExpand={toggleCollapse} />;
  }
  
  return (
    <div className="bg-white w-full max-w-[1331px] pt-2.5 pb-5 rounded-md border border-gray-200 max-md:max-w-full">
      <div className="flex w-full items-center gap-[40px_100px] justify-between flex-wrap px-5 max-md:max-w-full">
        <h2 className="text-[rgba(2,8,23,1)] text-base font-medium leading-loose tracking-[0.33px] self-stretch my-auto">
          Daily Metrics
        </h2>
        <div className="self-stretch flex min-w-60 items-center gap-[3px] my-auto">
          <div className="self-stretch flex items-center gap-2 text-sm my-auto">
            <button 
              className={`self-stretch ${activeTab === "Default" ? "bg-[rgba(241,249,244,1)]" : ""} min-h-9 gap-5 text-slate-900 font-medium w-[98px] my-auto px-3 py-2.5 rounded-[7px]`}
              onClick={() => setActiveTab("Default")}
            >
              Default{" "}
            </button>
            <button 
              className={`self-stretch ${activeTab === "Monthly Insights" ? "bg-[rgba(241,249,244,1)]" : ""} min-h-9 gap-5 text-[rgba(2,8,23,1)] font-normal my-auto px-3 py-2.5`}
              onClick={() => setActiveTab("Monthly Insights")}
            >
              Monthly Insights
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button 
              className="flex items-center justify-center h-10 w-10 rounded-full hover:bg-gray-100"
              onClick={toggleCollapse}
              aria-label="Collapse panel"
            >
              <ChevronUp size={18} />
            </button>
          </div>
        </div>
      </div>

      {showStreakCelebration && (
        <StreakCelebration
        streakCount={streakData.currentStreak}
        milestone={streakData.currentStreak % 7 === 0}
        duration={3000}
        onComplete={() => setShowStreakCelebration(false)}
        />
      )}
      
      <div className="flex w-full gap-[11px] flex-wrap mt-[11px] px-5 max-md:max-w-full">
        <EnhancedStreakCard />
        <EnhancedTodaysTargetsCard />
        <TimelyTrackCard />
        <HiringFunnelCard />
      </div>
    </div>
  );
};
