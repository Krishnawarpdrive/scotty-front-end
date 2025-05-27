
import React from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Clock, Target, TrendingUp, Users } from 'lucide-react';

interface TAAssignmentCardProps {
  ta: {
    name: string;
    email: string;
    currentLoad: number;
    maxLoad: number;
    dailyTargets: {
      interviews: number;
      completedInterviews: number;
      sourcing: number;
      completedSourcing: number;
      offers: number;
      completedOffers: number;
    };
    assignedRoles: number;
    efficiency: number;
  };
  className?: string;
}

export const TAAssignmentCard: React.FC<TAAssignmentCardProps> = ({ ta, className = "" }) => {
  const workloadPercentage = (ta.currentLoad / ta.maxLoad) * 100;
  const interviewProgress = (ta.dailyTargets.completedInterviews / ta.dailyTargets.interviews) * 100;
  const sourcingProgress = (ta.dailyTargets.completedSourcing / ta.dailyTargets.sourcing) * 100;
  const offerProgress = (ta.dailyTargets.completedOffers / ta.dailyTargets.offers) * 100;

  const getWorkloadColor = () => {
    if (workloadPercentage >= 90) return "text-red-500";
    if (workloadPercentage >= 70) return "text-orange-500";
    return "text-green-500";
  };

  return (
    <div className={`bg-white rounded-lg border p-4 hover:shadow-md transition-shadow ${className}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-primary/10 text-primary">
              {ta.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <h4 className="font-medium text-gray-900">{ta.name}</h4>
            <p className="text-xs text-gray-500">{ta.email}</p>
          </div>
        </div>
        <Badge variant={workloadPercentage >= 90 ? "destructive" : workloadPercentage >= 70 ? "outline" : "default"}>
          {Math.round(workloadPercentage)}% Load
        </Badge>
      </div>

      {/* Workload Progress */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-xs mb-1">
          <span className="text-gray-600 flex items-center">
            <Users className="h-3 w-3 mr-1" />
            Workload
          </span>
          <span className={`font-medium ${getWorkloadColor()}`}>
            {ta.currentLoad} / {ta.maxLoad} roles
          </span>
        </div>
        <Progress value={workloadPercentage} className="h-2" />
      </div>

      {/* Daily Targets */}
      <div className="space-y-2">
        <div className="flex items-center text-xs text-gray-600 mb-2">
          <Target className="h-3 w-3 mr-1" />
          <span className="font-medium">Today's Targets</span>
        </div>
        
        <TooltipProvider>
          <div className="grid grid-cols-3 gap-2 text-xs">
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="bg-blue-50 rounded px-2 py-1">
                  <div className="text-blue-700 font-medium">Interviews</div>
                  <div className="text-blue-600">
                    {ta.dailyTargets.completedInterviews}/{ta.dailyTargets.interviews}
                  </div>
                  <Progress value={interviewProgress} className="h-1 mt-1" />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Interviews: {Math.round(interviewProgress)}% complete</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <div className="bg-green-50 rounded px-2 py-1">
                  <div className="text-green-700 font-medium">Sourcing</div>
                  <div className="text-green-600">
                    {ta.dailyTargets.completedSourcing}/{ta.dailyTargets.sourcing}
                  </div>
                  <Progress value={sourcingProgress} className="h-1 mt-1" />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Sourcing: {Math.round(sourcingProgress)}% complete</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <div className="bg-purple-50 rounded px-2 py-1">
                  <div className="text-purple-700 font-medium">Offers</div>
                  <div className="text-purple-600">
                    {ta.dailyTargets.completedOffers}/{ta.dailyTargets.offers}
                  </div>
                  <Progress value={offerProgress} className="h-1 mt-1" />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Offers: {Math.round(offerProgress)}% complete</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      </div>

      {/* Efficiency Score */}
      <div className="mt-3 pt-3 border-t border-gray-100">
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-600 flex items-center">
            <TrendingUp className="h-3 w-3 mr-1" />
            Efficiency Score
          </span>
          <span className={`font-medium ${ta.efficiency >= 85 ? 'text-green-600' : ta.efficiency >= 70 ? 'text-orange-600' : 'text-red-600'}`}>
            {ta.efficiency}%
          </span>
        </div>
      </div>
    </div>
  );
};
