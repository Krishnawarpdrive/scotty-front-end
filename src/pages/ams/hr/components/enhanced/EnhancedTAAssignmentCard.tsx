
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AnimatedProgressBar } from '../animations/AnimatedProgressBar';
import { InteractiveCardContainer } from '../animations/InteractiveCardContainer';

interface EnhancedTAAssignmentCardProps {
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
}

export const EnhancedTAAssignmentCard: React.FC<EnhancedTAAssignmentCardProps> = ({ ta }) => {
  const getLoadStatus = () => {
    const percentage = (ta.currentLoad / ta.maxLoad) * 100;
    if (percentage >= 100) return { color: 'destructive', label: 'Overloaded' };
    if (percentage >= 80) return { color: 'warning', label: 'High Load' };
    if (percentage >= 60) return { color: 'default', label: 'Good Load' };
    return { color: 'secondary', label: 'Available' };
  };

  const getEfficiencyColor = () => {
    if (ta.efficiency >= 90) return 'text-green-600';
    if (ta.efficiency >= 75) return 'text-blue-600';
    if (ta.efficiency >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const loadStatus = getLoadStatus();

  return (
    <InteractiveCardContainer hoverEffect="lift">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarFallback>
                {ta.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-sm font-semibold">{ta.name}</CardTitle>
              <p className="text-xs text-muted-foreground">{ta.email}</p>
            </div>
          </div>
          <Badge variant={loadStatus.color as any}>{loadStatus.label}</Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Workload */}
        <div className="space-y-2">
          <AnimatedProgressBar
            value={ta.currentLoad}
            max={ta.maxLoad}
            label="Current Workload"
            animationDelay={100}
          />
        </div>

        {/* Daily Targets */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium">Daily Targets</h4>
          
          <div className="space-y-2">
            <AnimatedProgressBar
              value={ta.dailyTargets.completedInterviews}
              max={ta.dailyTargets.interviews}
              label="Interviews"
              showValue={true}
              animationDelay={200}
            />
            
            <AnimatedProgressBar
              value={ta.dailyTargets.completedSourcing}
              max={ta.dailyTargets.sourcing}
              label="Sourcing"
              showValue={true}
              animationDelay={300}
            />
            
            <AnimatedProgressBar
              value={ta.dailyTargets.completedOffers}
              max={ta.dailyTargets.offers}
              label="Offers"
              showValue={true}
              animationDelay={400}
            />
          </div>
        </div>

        {/* Efficiency Score */}
        <div className="flex justify-between items-center pt-3 border-t">
          <span className="text-sm text-muted-foreground">Efficiency</span>
          <motion.span 
            className={`text-lg font-bold ${getEfficiencyColor()}`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}
          >
            {ta.efficiency}%
          </motion.span>
        </div>

        {/* Assigned Roles */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Assigned Roles</span>
          <motion.span 
            className="text-sm font-medium"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.3 }}
          >
            {ta.assignedRoles}
          </motion.span>
        </div>
      </CardContent>
    </InteractiveCardContainer>
  );
};
