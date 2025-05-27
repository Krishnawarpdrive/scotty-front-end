
import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Trophy, Star, Zap, Target, Award } from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  type: 'streak' | 'milestone' | 'performance' | 'completion' | 'special';
  level: 'bronze' | 'silver' | 'gold' | 'platinum';
  unlockedAt?: Date;
  progress?: number;
  maxProgress?: number;
}

interface AchievementBadgeProps {
  achievement: Achievement;
  size?: 'sm' | 'md' | 'lg';
  showProgress?: boolean;
  onClick?: () => void;
}

export const AchievementBadge: React.FC<AchievementBadgeProps> = ({
  achievement,
  size = 'md',
  showProgress = true,
  onClick
}) => {
  const getIcon = () => {
    switch (achievement.type) {
      case 'streak': return Zap;
      case 'milestone': return Target;
      case 'performance': return Star;
      case 'completion': return Award;
      case 'special': return Trophy;
      default: return Trophy;
    }
  };

  const getLevelColor = () => {
    switch (achievement.level) {
      case 'bronze': return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'silver': return 'bg-gray-100 text-gray-800 border-gray-300';
      case 'gold': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'platinum': return 'bg-purple-100 text-purple-800 border-purple-300';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm': return 'w-16 h-16';
      case 'md': return 'w-20 h-20';
      case 'lg': return 'w-24 h-24';
    }
  };

  const Icon = getIcon();
  const isUnlocked = !!achievement.unlockedAt;
  const progressPercent = achievement.progress && achievement.maxProgress 
    ? (achievement.progress / achievement.maxProgress) * 100 
    : 0;

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="cursor-pointer"
    >
      <Card className={`p-3 text-center relative overflow-hidden ${getSizeClasses()}`}>
        {/* Background glow for unlocked achievements */}
        {isUnlocked && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-50"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
        
        <div className="relative z-10 flex flex-col items-center justify-center h-full">
          <motion.div
            animate={isUnlocked ? { rotate: [0, 10, -10, 0] } : {}}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            <Icon 
              className={`${size === 'sm' ? 'h-6 w-6' : size === 'md' ? 'h-8 w-8' : 'h-10 w-10'} 
                ${isUnlocked ? 'text-yellow-500' : 'text-gray-400'}`} 
            />
          </motion.div>
          
          {size !== 'sm' && (
            <Badge variant="outline" className={`mt-1 text-xs ${getLevelColor()}`}>
              {achievement.level}
            </Badge>
          )}
        </div>
        
        {/* Progress bar for in-progress achievements */}
        {!isUnlocked && showProgress && achievement.progress && achievement.maxProgress && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
            <motion.div
              className="h-full bg-blue-500"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        )}
        
        {/* Unlock effect */}
        {isUnlocked && (
          <motion.div
            className="absolute inset-0 border-2 border-yellow-400 rounded-lg"
            animate={{ 
              boxShadow: [
                '0 0 0 0 rgba(251, 191, 36, 0.4)',
                '0 0 0 10px rgba(251, 191, 36, 0)',
              ]
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}
      </Card>
    </motion.div>
  );
};
