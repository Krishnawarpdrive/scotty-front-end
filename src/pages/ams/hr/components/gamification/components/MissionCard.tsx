
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Target, Trophy, Star } from 'lucide-react';
import { AnimatedProgressBar } from '../../animations/AnimatedProgressBar';
import { InteractiveCardContainer } from '../../animations/InteractiveCardContainer';
import { Mission } from '../types/MissionTypes';

interface MissionCardProps {
  mission: Mission;
  index: number;
  celebratingMission: string | null;
  onMissionClick?: (mission: Mission) => void;
  onClaimReward: (missionId: string) => void;
}

export const MissionCard: React.FC<MissionCardProps> = ({
  mission,
  index,
  celebratingMission,
  onMissionClick,
  onClaimReward
}) => {
  const getMissionStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'active': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'failed': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getMissionIcon = (type: string) => {
    switch (type) {
      case 'daily': return Clock;
      case 'weekly': return Target;
      case 'monthly': return Trophy;
      default: return Star;
    }
  };

  const Icon = getMissionIcon(mission.type);
  const daysLeft = Math.ceil((mission.dueDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  return (
    <motion.div
      key={mission.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <InteractiveCardContainer 
        hoverEffect="lift"
        onCardClick={() => onMissionClick?.(mission)}
      >
        <div className="relative">
          {/* Celebration Effect */}
          <AnimatePresence>
            {celebratingMission === mission.id && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 opacity-20 rounded-lg"
                initial={{ scale: 0 }}
                animate={{ scale: 1.1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.5 }}
              />
            )}
          </AnimatePresence>
          
          <div className="p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <Icon className="h-5 w-5 text-blue-500" />
                <div>
                  <h4 className="font-medium">{mission.title}</h4>
                  <p className="text-sm text-gray-600">{mission.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className={getMissionStatusColor(mission.status)}>
                  {mission.status}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {daysLeft}d left
                </Badge>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span className="font-medium">{mission.progress}/{mission.target}</span>
              </div>
              <AnimatedProgressBar
                value={mission.progress}
                max={mission.target}
                showValue={false}
                animationDelay={index * 100}
              />
            </div>
            
            <div className="flex items-center justify-between pt-2">
              <div className="text-sm text-gray-600">
                Reward: <span className="font-medium text-green-600">{mission.reward}</span>
              </div>
              {mission.progress >= mission.target && (
                <Button 
                  size="sm" 
                  onClick={() => onClaimReward(mission.id)}
                  className="bg-green-500 hover:bg-green-600"
                >
                  Claim Reward
                </Button>
              )}
            </div>
          </div>
        </div>
      </InteractiveCardContainer>
    </motion.div>
  );
};
