
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
    if (workloadPercentage >= 90) return "text-red-600";
    if (workloadPercentage >= 70) return "text-orange-600";
    return "text-green-600";
  };

  const getWorkloadBadgeVariant = () => {
    if (workloadPercentage >= 90) return "destructive";
    if (workloadPercentage >= 70) return "outline";
    return "default";
  };

  return (
    <div className={`card-compact hover:shadow-card-hover transition-all duration-200 cursor-pointer ${className}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Avatar className="h-12 w-12 ring-2 ring-slate-100">
            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
              {ta.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <h4 className="font-semibold text-slate-900">{ta.name}</h4>
            <p className="text-xs text-slate-500">{ta.email}</p>
          </div>
        </div>
        <Badge variant={getWorkloadBadgeVariant()} className="font-medium">
          {Math.round(workloadPercentage)}% Load
        </Badge>
      </div>

      {/* Workload Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-slate-600 flex items-center font-medium">
            <Users className="h-4 w-4 mr-2" />
            Workload
          </span>
          <span className={`font-semibold ${getWorkloadColor()}`}>
            {ta.currentLoad} / {ta.maxLoad} roles
          </span>
        </div>
        <Progress value={workloadPercentage} className="h-3" />
      </div>

      {/* Daily Targets */}
      <div className="space-y-3">
        <div className="flex items-center text-sm text-slate-600 mb-3">
          <Target className="h-4 w-4 mr-2" />
          <span className="font-semibold">Today's Targets</span>
        </div>
        
        <TooltipProvider>
          <div className="grid grid-cols-3 gap-3 text-sm">
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="bg-blue-50 rounded-lg px-3 py-2.5 border border-blue-100">
                  <div className="text-blue-700 font-semibold text-xs uppercase tracking-wide mb-1">Interviews</div>
                  <div className="text-blue-900 font-bold text-lg">
                    {ta.dailyTargets.completedInterviews}/{ta.dailyTargets.interviews}
                  </div>
                  <Progress value={interviewProgress} className="h-1.5 mt-2" />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Interviews: {Math.round(interviewProgress)}% complete</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <div className="bg-green-50 rounded-lg px-3 py-2.5 border border-green-100">
                  <div className="text-green-700 font-semibold text-xs uppercase tracking-wide mb-1">Sourcing</div>
                  <div className="text-green-900 font-bold text-lg">
                    {ta.dailyTargets.completedSourcing}/{ta.dailyTargets.sourcing}
                  </div>
                  <Progress value={sourcingProgress} className="h-1.5 mt-2" />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Sourcing: {Math.round(sourcingProgress)}% complete</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <div className="bg-purple-50 rounded-lg px-3 py-2.5 border border-purple-100">
                  <div className="text-purple-700 font-semibold text-xs uppercase tracking-wide mb-1">Offers</div>
                  <div className="text-purple-900 font-bold text-lg">
                    {ta.dailyTargets.completedOffers}/{ta.dailyTargets.offers}
                  </div>
                  <Progress value={offerProgress} className="h-1.5 mt-2" />
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
      <div className="mt-4 pt-4 border-t border-slate-100">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-600 flex items-center font-medium">
            <TrendingUp className="h-4 w-4 mr-2" />
            Efficiency Score
          </span>
          <span className={`font-bold ${ta.efficiency >= 85 ? 'text-green-600' : ta.efficiency >= 70 ? 'text-orange-600' : 'text-red-600'}`}>
            {ta.efficiency}%
          </span>
        </div>
      </div>
    </div>
  );
};
