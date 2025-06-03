
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Star, Award, Target, Zap } from 'lucide-react';
import type { InterviewerAchievement } from '../../types/InterviewerTypes';

interface AchievementsListProps {
  achievements: InterviewerAchievement[];
}

const getAchievementIcon = (type: string) => {
  switch (type) {
    case 'interview_count':
      return Target;
    case 'quality_score':
      return Star;
    case 'streak':
      return Zap;
    default:
      return Award;
  }
};

const getTierColor = (tier: string) => {
  switch (tier) {
    case 'bronze':
      return 'text-orange-600 bg-orange-100';
    case 'silver':
      return 'text-gray-600 bg-gray-100';
    case 'gold':
      return 'text-yellow-600 bg-yellow-100';
    case 'platinum':
      return 'text-purple-600 bg-purple-100';
    default:
      return 'text-blue-600 bg-blue-100';
  }
};

export const AchievementsList: React.FC<AchievementsListProps> = ({ achievements }) => {
  const groupedAchievements = achievements.reduce((groups, achievement) => {
    const type = achievement.achievement_type;
    if (!groups[type]) {
      groups[type] = [];
    }
    groups[type].push(achievement);
    return groups;
  }, {} as Record<string, InterviewerAchievement[]>);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Achievements</h2>
        <div className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-yellow-500" />
          <span className="text-lg font-semibold">{achievements.length} Unlocked</span>
        </div>
      </div>

      {Object.entries(groupedAchievements).map(([type, typeAchievements]) => {
        const IconComponent = getAchievementIcon(type);
        
        return (
          <Card key={type}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 capitalize">
                <IconComponent className="h-5 w-5" />
                {type.replace('_', ' ')} Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {typeAchievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 border rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <Trophy className={`h-6 w-6 ${
                        achievement.tier === 'gold' ? 'text-yellow-500' :
                        achievement.tier === 'silver' ? 'text-gray-400' :
                        achievement.tier === 'bronze' ? 'text-orange-600' :
                        'text-purple-500'
                      }`} />
                      <Badge variant="outline" className={getTierColor(achievement.tier)}>
                        {achievement.tier}
                      </Badge>
                    </div>
                    
                    <h3 className="font-semibold mb-1">{achievement.achievement_name}</h3>
                    {achievement.description && (
                      <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
                    )}
                    
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-green-600 font-medium">+{achievement.points_awarded} XP</span>
                      <span className="text-gray-500">
                        {new Date(achievement.unlocked_at).toLocaleDateString()}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        );
      })}

      {achievements.length === 0 && (
        <Card>
          <CardContent className="py-8 text-center">
            <Trophy className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No Achievements Yet</h3>
            <p className="text-gray-500">Complete interviews and provide feedback to earn your first achievement!</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
