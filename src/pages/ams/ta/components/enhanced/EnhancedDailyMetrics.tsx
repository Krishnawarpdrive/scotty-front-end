
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronUp, Phone, Eye, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MetricCard } from "./MetricCard";
import { CompactMetricsView } from "./CompactMetricsView";

export const EnhancedDailyMetrics: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Default");
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const metrics = [
    {
      icon: <Phone className="h-4 w-4 text-[#009933]" />,
      title: "Calls",
      current: 13,
      total: 15,
      trend: 'up' as const,
      trendValue: 8,
      actionText: "Make Call",
      onAction: () => console.log("Making call...")
    },
    {
      icon: <Eye className="h-4 w-4 text-blue-500" />,
      title: "Profiles Reviewed",
      current: 20,
      total: 20,
      trend: 'stable' as const,
      trendValue: 0
    },
    {
      icon: <Calendar className="h-4 w-4 text-purple-500" />,
      title: "Interviews Scheduled",
      current: 14,
      total: 25,
      trend: 'up' as const,
      trendValue: 12,
      actionText: "Schedule Interview",
      onAction: () => console.log("Scheduling interview...")
    }
  ];
  
  if (isCollapsed) {
    return <CompactMetricsView onExpand={toggleCollapse} />;
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white w-full max-w-[1331px] pt-2.5 pb-5 rounded-md border border-gray-200 hover:shadow-lg transition-shadow duration-300"
    >
      <div className="flex w-full items-center gap-[40px_100px] justify-between flex-wrap px-5">
        <motion.h2 
          className="text-[rgba(2,8,23,1)] text-base font-medium leading-loose tracking-[0.33px] self-stretch my-auto"
          animate={{ x: 0 }}
          initial={{ x: -10 }}
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
          <Button 
            onClick={toggleCollapse}
            variant="ghost"
            size="sm"
            className="flex items-center justify-center h-10 w-10 rounded-full hover:bg-gray-100 transition-all duration-200"
          >
            <ChevronUp size={18} />
          </Button>
        </div>
      </div>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-[11px] px-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 + 0.3 }}
          >
            <MetricCard {...metric} />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};
