
import React, { useState } from "react";
import { motion } from "framer-motion";
import { EnhancedStreakCard } from "./enhanced/EnhancedStreakCard";
import { EnhancedTodaysTargetsCard } from "./enhanced/EnhancedTodaysTargetsCard";
import { EnhancedTimelyTrackCard } from "./enhanced/EnhancedTimelyTrackCard";
import { EnhancedHiringFunnelCard } from "./enhanced/EnhancedHiringFunnelCard";
import { CompactView } from "./CompactView";
import { ChevronUp } from "lucide-react";
import { StreakCelebration } from "./StreakCelebration";

export const DailyMetrics: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Default");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showStreakCelebration, setShowStreakCelebration] = useState(true);
  const [streakCount, setStreakCount] = useState(7);
  
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
    setShowStreakCelebration(true);
  };
  
  if (isCollapsed) {
    return <CompactView onExpand={toggleCollapse} />;
  }
  
  return (
    <motion.div
      className="bg-white w-full max-w-[1331px] pt-2.5 pb-5 rounded-md border border-gray-200 hover:shadow-lg transition-shadow duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex w-full items-center gap-[40px_100px] justify-between flex-wrap px-5">
        <motion.h2 
          className="text-[rgba(2,8,23,1)] text-base font-medium leading-loose tracking-[0.33px] self-stretch my-auto"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Daily Metrics
        </motion.h2>
        
        <div className="self-stretch flex min-w-60 items-center gap-[3px] my-auto">
          <div className="self-stretch flex items-center gap-2 text-sm my-auto">
            <motion.button 
              className={`self-stretch ${activeTab === "Default" ? "bg-[#009933] text-white" : "bg-gray-100"} min-h-9 gap-5 font-medium w-[98px] my-auto px-3 py-2.5 rounded-[7px] transition-all duration-200 hover:scale-105 active:scale-95`}
              onClick={() => setActiveTab("Default")}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Default
            </motion.button>
            <motion.button 
              className={`self-stretch ${activeTab === "Monthly Insights" ? "bg-[#009933] text-white" : "bg-gray-100"} min-h-9 gap-5 font-normal my-auto px-3 py-2.5 rounded-[7px] transition-all duration-200 hover:scale-105 active:scale-95`}
              onClick={() => setActiveTab("Monthly Insights")}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Monthly Insights
            </motion.button>
          </div>
          
          <motion.button 
            onClick={toggleCollapse}
            className="flex items-center justify-center h-10 w-10 rounded-full hover:bg-gray-100 transition-all duration-200"
            whileHover={{ scale: 1.1, backgroundColor: "rgba(0,153,51,0.1)" }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              animate={{ rotate: 0 }}
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronUp size={18} />
            </motion.div>
          </motion.button>
        </div>
      </div>

      {showStreakCelebration && (
          <StreakCelebration
            streakCount={streakCount}
            milestone={streakCount % 7 === 0}
            duration={3000}
            onComplete={() => setShowStreakCelebration(false)}
          />
        )}
      
      <motion.div 
        className="flex w-full gap-[11px] flex-wrap mt-[11px] px-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <EnhancedStreakCard />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <EnhancedTodaysTargetsCard />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <EnhancedTimelyTrackCard />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <EnhancedHiringFunnelCard />
        </motion.div>
      </motion.div>

    </motion.div>
  );
};
