
export interface Mission {
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

export interface TAProfile {
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

export interface TAMissionControlProps {
  ta: TAProfile;
  onMissionClick?: (mission: Mission) => void;
  onAchievementClick?: (achievement: any) => void;
}
