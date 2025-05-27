
export interface Mission {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly' | 'monthly' | 'special';
  status: 'active' | 'completed' | 'expired';
  progress: number;
  target: number;
  reward: number;
  xpReward: number;
  category: 'screening' | 'interviews' | 'placements' | 'client_relations' | 'general';
  startDate: string;
  endDate: string;
  requirements?: string[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'milestone' | 'streak' | 'performance' | 'special';
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
  unlockedAt?: string;
  isLocked: boolean;
  requirements: {
    type: string;
    value: number;
    description: string;
  }[];
}

export interface Goal {
  id: string;
  title: string;
  type: 'daily' | 'weekly' | 'monthly';
  value: number;
  target: number;
  unit?: string;
  category: string;
  status: 'active' | 'completed' | 'failed';
  dueDate: string;
}

export interface TAProfile {
  id: string;
  name: string;
  email: string;
  level: number;
  xp: number;
  xpToNext: number;
  rank: string;
  streak: number;
  totalMissionsCompleted: number;
  currentMissions: Mission[];
  achievements: Achievement[];
  goals: Goal[];
  stats: {
    totalScreenings: number;
    totalInterviews: number;
    totalPlacements: number;
    averageRating: number;
    efficiency: number;
  };
}

export interface GamificationState {
  currentUser: TAProfile | null;
  missions: Mission[];
  achievements: Achievement[];
  goals: Goal[];
  streakData: {
    currentStreak: number;
    longestStreak: number;
    lastActivityDate: string;
  };
  celebrationQueue: {
    type: 'mission' | 'achievement' | 'goal' | 'streak';
    data: any;
    id: string;
  }[];
  settings: {
    notificationsEnabled: boolean;
    soundEnabled: boolean;
    celebrationsEnabled: boolean;
  };
  isLoading: boolean;
  error: string | null;
}
