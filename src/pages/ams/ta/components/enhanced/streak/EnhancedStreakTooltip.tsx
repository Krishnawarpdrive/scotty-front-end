
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface DayData {
  date: string;
  calls: number;
  profiles: number;
  interviews: number;
  callsTarget: number;
  profilesTarget: number;
  interviewsTarget: number;
}

interface EnhancedStreakTooltipProps {
  children: React.ReactNode;
  dayData: DayData;
}

export const EnhancedStreakTooltip: React.FC<EnhancedStreakTooltipProps> = ({
  children,
  dayData
}) => {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getAchievementStatus = (actual: number, target: number) => {
    if (actual >= target) {
      return { icon: '✅', color: 'text-green-600' };
    }
    return { icon: '❌', color: 'text-red-600' };
  };

  const getPercentageColor = (actual: number, target: number) => {
    const percentage = target > 0 ? (actual / target) * 100 : 0;
    if (percentage >= 100) return 'text-green-600';
    if (percentage >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const callsStatus = getAchievementStatus(dayData.calls, dayData.callsTarget);
  const profilesStatus = getAchievementStatus(dayData.profiles, dayData.profilesTarget);
  const interviewsStatus = getAchievementStatus(dayData.interviews, dayData.interviewsTarget);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent 
          side="top" 
          className="bg-white border border-gray-200 shadow-lg rounded-lg p-3 min-w-[220px] z-50"
        >
          <div className="space-y-3">
            <div className="font-medium text-gray-900 text-sm">
              {formatDate(dayData.date)}
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-sm"></div>
                  Calls:
                </span>
                <span className={`flex items-center gap-1 ${getPercentageColor(dayData.calls, dayData.callsTarget)}`}>
                  {dayData.calls}/{dayData.callsTarget}
                  <span className={callsStatus.color}>{callsStatus.icon}</span>
                </span>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-sm"></div>
                  Profiles:
                </span>
                <span className={`flex items-center gap-1 ${getPercentageColor(dayData.profiles, dayData.profilesTarget)}`}>
                  {dayData.profiles}/{dayData.profilesTarget}
                  <span className={profilesStatus.color}>{profilesStatus.icon}</span>
                </span>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-sm"></div>
                  Interviews:
                </span>
                <span className={`flex items-center gap-1 ${getPercentageColor(dayData.interviews, dayData.interviewsTarget)}`}>
                  {dayData.interviews}/{dayData.interviewsTarget}
                  <span className={interviewsStatus.color}>{interviewsStatus.icon}</span>
                </span>
              </div>
            </div>
            
            <div className="pt-2 border-t border-gray-100 text-xs text-gray-500">
              {dayData.calls + dayData.profiles + dayData.interviews === 0 
                ? "No activity recorded" 
                : `${dayData.calls + dayData.profiles + dayData.interviews} total activities`}
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
