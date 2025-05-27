
import React from "react";
import { motion } from "framer-motion";
import { ChevronDown, Phone, Eye, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CompactMetricsViewProps {
  onExpand: () => void;
}

export const CompactMetricsView: React.FC<CompactMetricsViewProps> = ({ onExpand }) => {
  const metrics = [
    {
      icon: <Phone className="h-4 w-4 text-[#009933]" />,
      title: "Calls",
      current: 13,
      total: 15
    },
    {
      icon: <Eye className="h-4 w-4 text-blue-500" />,
      title: "Profiles Reviewed",
      current: 20,
      total: 20
    },
    {
      icon: <Calendar className="h-4 w-4 text-purple-500" />,
      title: "Interviews Scheduled",
      current: 14,
      total: 25
    }
  ];

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
          onClick={onExpand} 
          variant="ghost"
          size="sm"
          className="flex items-center justify-center h-8 w-8 rounded-full hover:bg-gray-100 transition-all duration-200"
        >
          <ChevronDown size={18} />
        </Button>
      </div>
    </motion.div>
  );
};
