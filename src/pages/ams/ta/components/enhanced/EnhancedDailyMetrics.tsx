
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp, ChevronDown, Phone, Eye, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AnimatedProgressBar } from "../animations/AnimatedProgressBar";
import { InteractiveCardContainer } from "../animations/InteractiveCardContainer";

interface MetricCardProps {
  icon: React.ReactNode;
  title: string;
  current: number;
  total: number;
  trend: 'up' | 'down' | 'stable';
  trendValue: number;
  actionText?: string;
  onAction?: () => void;
}

const MetricCard: React.FC<MetricCardProps> = ({
  icon,
  title,
  current,
  total,
  trend,
  trendValue,
  actionText,
  onAction
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const progress = (current / total) * 100;
  
  const getTrendColor = () => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      case 'stable': return 'text-gray-600';
    }
  };

  const getTrendIcon = () => {
    switch (trend) {
      case 'up': return '↗️';
      case 'down': return '↘️';
      case 'stable': return '→';
    }
  };

  return (
    <InteractiveCardContainer 
      hoverEffect="lift"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card className="h-full border-2 transition-all duration-300 hover:border-[#009933]/30 hover:shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              {icon}
              <span className="font-medium">{title}</span>
            </div>
            <Badge variant="outline" className={`${getTrendColor()} border-current`}>
              {getTrendIcon()} {trendValue > 0 ? '+' : ''}{trendValue}%
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0 space-y-4">
          <div className="flex items-end justify-between">
            <motion.div 
              className="text-2xl font-bold text-gray-900"
              animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              {current}
            </motion.div>
            <div className="text-sm text-gray-500">/ {total}</div>
          </div>
          
          <div className="space-y-2">
            <AnimatedProgressBar
              value={current}
              max={total}
              showValue={false}
              animationDelay={0}
            />
            <div className="flex justify-between text-xs text-gray-600">
              <span>Progress: {Math.round(progress)}%</span>
              <span>{total - current} remaining</span>
            </div>
          </div>

          <AnimatePresence>
            {actionText && onAction && (current < total) && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <Button 
                  onClick={onAction}
                  className="w-full bg-[#009933] hover:bg-[#00a341] text-white transition-all duration-200 hover:scale-105 active:scale-95"
                  size="sm"
                >
                  <motion.span
                    animate={{ x: isHovered ? 2 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {actionText}
                  </motion.span>
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

          {progress >= 100 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center justify-center py-2"
            >
              <Badge className="bg-green-100 text-green-800 border-green-200">
                ✅ Completed!
              </Badge>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </InteractiveCardContainer>
  );
};

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
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white w-full py-3 px-5 rounded-md flex items-center justify-between border border-gray-200 hover:shadow-md transition-shadow duration-200"
      >
        <h2 className="text-[#1A1A1A] text-[14px] font-semibold">
          Daily Metrics
        </h2>
        
        <div className="flex-1 overflow-x-auto mx-4">
          <div className="flex items-center gap-3 w-max">
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center px-3 py-1.5 rounded-full bg-green-50 whitespace-nowrap hover:bg-green-100 transition-colors duration-200"
              >
                {metric.icon}
                <span className="ml-2 font-medium text-[12px]">
                  {metric.current}/{metric.total}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <span className="text-[#666666] text-[12px] whitespace-nowrap">2 More Calls Today</span>
          <Button 
            className="bg-[#009933] hover:bg-[#00a341] text-white text-[12px] font-medium px-4 py-1 rounded-full transition-all duration-200 hover:scale-105 active:scale-95"
          >
            Take Action
          </Button>
          <Button 
            onClick={toggleCollapse} 
            variant="ghost"
            size="sm"
            className="flex items-center justify-center h-8 w-8 rounded-full hover:bg-gray-100 transition-all duration-200"
          >
            <ChevronDown size={18} />
          </Button>
        </div>
      </motion.div>
    );
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
