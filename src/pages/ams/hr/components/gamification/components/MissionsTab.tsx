
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, Trophy } from 'lucide-react';
import { MissionCard } from './MissionCard';
import { Mission } from '../types/MissionTypes';

interface MissionsTabProps {
  activeMissions: Mission[];
  completedMissions: Mission[];
  celebratingMission: string | null;
  onMissionClick?: (mission: Mission) => void;
  onClaimReward: (missionId: string) => void;
}

export const MissionsTab: React.FC<MissionsTabProps> = ({
  activeMissions,
  completedMissions,
  celebratingMission,
  onMissionClick,
  onClaimReward
}) => {
  return (
    <div className="space-y-4">
      {/* Active Missions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-blue-500" />
            Active Missions ({activeMissions.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {activeMissions.map((mission, index) => (
            <MissionCard
              key={mission.id}
              mission={mission}
              index={index}
              celebratingMission={celebratingMission}
              onMissionClick={onMissionClick}
              onClaimReward={onClaimReward}
            />
          ))}
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
                <span className="text-sm font-medium text-green-600">+{mission.reward}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
};
