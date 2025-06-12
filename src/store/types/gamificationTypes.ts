
export interface UserStats {
  id: string;
  level: number;
  xp: number;
  totalXP: number;
  rank: string;
  badges: string[];
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly' | 'monthly';
  target: number;
  progress: number;
  xpReward: number;
  status: 'active' | 'completed' | 'failed';
  deadline: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  progress: number;
  maxProgress: number;
}

export interface Goal {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly' | 'monthly';
  target: number;
  current: number;
  status: 'pending' | 'completed' | 'failed';
  deadline: string;
}

export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastActivityDate: string;
}

export type CelebrationType = 'mission_complete' | 'level_up' | 'achievement_unlock' | 'streak_milestone';

export interface Celebration {
  id: string;
  type: CelebrationType;
  data: any;
  timestamp: string;
}

export interface GamificationSettings {
  enabled: boolean;
  showNotifications: boolean;
  autoTrackProgress: boolean;
  celebrationAnimations: boolean;
}

export interface GamificationState {
  currentUser: UserStats | null;
  missions: Mission[];
  achievements: Achievement[];
  goals: Goal[];
  streakData: StreakData;
  celebrationQueue: Celebration[];
  settings: GamificationSettings;
  isLoading: boolean;
  error: string | null;
}
