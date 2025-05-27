
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Target, Zap, Trophy, Star, TrendingUp, Clock } from 'lucide-react';
import { AchievementBadge } from './AchievementBadge';
import { AnimatedProgressBar } from '../animations/AnimatedProgressBar';
import { InteractiveCardContainer } from '../animations/InteractiveCardContainer';

interface Mission {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly' | 'monthly';
  progress: number;
  target: number;
  reward: string;
  dueDate: Date;
  status: 'active' | 'completed' | 'failed';
}

interface TAProfile {
  id: string;
  name: string;
  email: string;
  level: number;
  xp: number;
  xpToNext: number;
  streak: number;
  totalMissionsCompleted: number;
  rank: string;
  achievements: any[];
  currentMissions: Mission[];
}

interface TAMissionControlProps {
  ta: TAProfile;
  onMissionClick?: (mission: Mission) => void;
  onAchievementClick?: (achievement: any) => void;
}

export const TAMissionControl: React.FC<TAMissionControlProps> = ({
  ta,
  onMissionClick,
  onAchievementClick
}) => {
  const [selectedTab, setSelectedTab] = useState('missions');
  const [celebratingMission, setCelebratingMission] = useState<string | null>(null);

  const levelProgress = (ta.xp / ta.xpToNext) * 100;

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

  const handleMissionComplete = (missionId: string) => {
    setCelebratingMission(missionId);
    setTimeout(() => setCelebratingMission(null), 3000);
  };

  const activeMissions = ta.currentMissions.filter(m => m.status === 'active');
  const completedMissions = ta.currentMissions.filter(m => m.status === 'completed');

  return (
    <div className="space-y-6">
      {/* TA Profile Header */}
      <InteractiveCardContainer hoverEffect="glow">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="text-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                  {ta.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xl font-bold">{ta.name}</h3>
                  <Badge variant="outline" className="bg-purple-100 text-purple-800">
                    Level {ta.level}
                  </Badge>
                  <Badge variant="outline" className="bg-orange-100 text-orange-800">
                    {ta.rank}
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">XP Progress</span>
                    <span className="font-medium">{ta.xp} / {ta.xpToNext} XP</span>
                  </div>
                  <Progress value={levelProgress} className="h-2" />
                </div>
                
                <div className="flex items-center gap-4 mt-3 text-sm">
                  <div className="flex items-center gap-1">
                    <Zap className="h-4 w-4 text-orange-500" />
                    <span className="font-medium">{ta.streak}</span>
                    <span className="text-gray-600">day streak</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Trophy className="h-4 w-4 text-yellow-500" />
                    <span className="font-medium">{ta.totalMissionsCompleted}</span>
                    <span className="text-gray-600">missions completed</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </InteractiveCardContainer>

      {/* Mission Control Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="missions" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            Missions
          </TabsTrigger>
          <TabsTrigger value="achievements" className="flex items-center gap-2">
            <Trophy className="h-4 w-4" />
            Achievements
          </TabsTrigger>
          <TabsTrigger value="leaderboard" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Leaderboard
          </TabsTrigger>
        </TabsList>

        <TabsContent value="missions" className="space-y-4">
          {/* Active Missions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-blue-500" />
                Active Missions ({activeMissions.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {activeMissions.map((mission, index) => {
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
                                onClick={() => handleMissionComplete(mission.id)}
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
              })}
            </CardContent>
          </Card>

          {/* Recently Completed */}
          {completedMissions.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-green-500" />
                  Recently Completed ({completedMissions.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {completedMissions.slice(0, 3).map((mission) => (
                  <div key={mission.id} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Trophy className="h-4 w-4 text-green-500" />
                      <span className="font-medium">{mission.title}</span>
                    </div>
                    <Badge variant="outline" className="bg-green-100 text-green-800">
                      +{mission.reward}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="achievements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                {ta.achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <AchievementBadge
                      achievement={achievement}
                      size="md"
                      onClick={() => onAchievementClick?.(achievement)}
                    />
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leaderboard" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Team Leaderboard</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Leaderboard coming soon...</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
