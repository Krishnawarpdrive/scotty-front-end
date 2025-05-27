
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, Trophy, TrendingUp } from 'lucide-react';
import { AchievementBadge } from './AchievementBadge';
import { TAProfileHeader } from './components/TAProfileHeader';
import { MissionsTab } from './components/MissionsTab';
import { TAMissionControlProps } from './types/MissionTypes';

export const TAMissionControl: React.FC<TAMissionControlProps> = ({
  ta,
  onMissionClick,
  onAchievementClick
}) => {
  const [selectedTab, setSelectedTab] = useState('missions');
  const [celebratingMission, setCelebratingMission] = useState<string | null>(null);

  const handleMissionComplete = (missionId: string) => {
    setCelebratingMission(missionId);
    setTimeout(() => setCelebratingMission(null), 3000);
  };

  const activeMissions = ta.currentMissions.filter(m => m.status === 'active');
  const completedMissions = ta.currentMissions.filter(m => m.status === 'completed');

  return (
    <div className="space-y-6">
      <TAProfileHeader ta={ta} />

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

        <TabsContent value="missions">
          <MissionsTab
            activeMissions={activeMissions}
            completedMissions={completedMissions}
            celebratingMission={celebratingMission}
            onMissionClick={onMissionClick}
            onClaimReward={handleMissionComplete}
          />
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
