
import { GamificationState, TAProfile } from '../../types/gamificationTypes';

// Mock data for initial state
export const mockTAProfile: TAProfile = {
  id: 'ta-001',
  name: 'John Doe',
  email: 'john.doe@company.com',
  level: 5,
  xp: 1250,
  xpToNext: 1500,
  rank: 'Senior TA',
  streak: 7,
  totalMissionsCompleted: 24,
  currentMissions: [],
  achievements: [],
  goals: [],
  stats: {
    totalScreenings: 45,
    totalInterviews: 32,
    totalPlacements: 8,
    averageRating: 4.6,
    efficiency: 85,
  },
};

export const initialState: GamificationState = {
  currentUser: mockTAProfile,
  missions: [],
  achievements: [],
  goals: [],
  streakData: {
    currentStreak: 7,
    longestStreak: 14,
    lastActivityDate: new Date().toISOString(),
  },
  celebrationQueue: [],
  settings: {
    notificationsEnabled: true,
    soundEnabled: true,
    celebrationsEnabled: true,
  },
  isLoading: false,
  error: null,
};
