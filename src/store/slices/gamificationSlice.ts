
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GamificationState, Mission, Achievement, Goal, UserStats, Celebration, CelebrationType, GamificationSettings } from '../types/gamificationTypes';

const initialState: GamificationState = {
  currentUser: null,
  missions: [],
  achievements: [],
  goals: [],
  streakData: {
    currentStreak: 0,
    longestStreak: 0,
    lastActivityDate: '',
  },
  celebrationQueue: [],
  settings: {
    enabled: true,
    showNotifications: true,
    autoTrackProgress: true,
    celebrationAnimations: true,
  },
  isLoading: false,
  error: null,
};

const gamificationSlice = createSlice({
  name: 'gamification',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<UserStats>) => {
      state.currentUser = action.payload;
    },

    updateUserXP: (state, action: PayloadAction<number>) => {
      if (state.currentUser) {
        state.currentUser.xp += action.payload;
        state.currentUser.totalXP += action.payload;
      }
    },

    addMission: (state, action: PayloadAction<Mission>) => {
      state.missions.push(action.payload);
    },

    removeMission: (state, action: PayloadAction<string>) => {
      state.missions = state.missions.filter(mission => mission.id !== action.payload);
    },

    updateMissionProgress: (state, action: PayloadAction<{ missionId: string; progress: number }>) => {
      const mission = state.missions.find(m => m.id === action.payload.missionId);
      if (mission) {
        mission.progress = action.payload.progress;
        if (mission.progress >= mission.target && mission.status === 'active') {
          mission.status = 'completed';
        }
      }
    },

    completeMission: (state, action: PayloadAction<{ missionId: string; xpGained: number }>) => {
      const mission = state.missions.find(m => m.id === action.payload.missionId);
      if (mission) {
        mission.status = 'completed';
        if (state.currentUser) {
          state.currentUser.xp += action.payload.xpGained;
          state.currentUser.totalXP += action.payload.xpGained;
        }
      }
    },

    updateGoalProgress: (state, action: PayloadAction<{ goalId: string; value: number }>) => {
      const goal = state.goals.find(g => g.id === action.payload.goalId);
      if (goal) {
        goal.current = action.payload.value;
        if (goal.current >= goal.target && goal.status === 'pending') {
          goal.status = 'completed';
        }
      }
    },

    completeGoal: (state, action: PayloadAction<string>) => {
      const goal = state.goals.find(g => g.id === action.payload);
      if (goal) {
        goal.status = 'completed';
      }
    },

    updateStreak: (state, action: PayloadAction<{ streak: number; isNewRecord: boolean }>) => {
      state.streakData.currentStreak = action.payload.streak;
      if (action.payload.isNewRecord) {
        state.streakData.longestStreak = action.payload.streak;
      }
      state.streakData.lastActivityDate = new Date().toISOString();
    },

    resetStreak: (state) => {
      state.streakData.currentStreak = 0;
    },

    unlockAchievement: (state, action: PayloadAction<{ achievementId: string }>) => {
      const achievement = state.achievements.find(a => a.id === action.payload.achievementId);
      if (achievement && !achievement.unlockedAt) {
        achievement.unlockedAt = new Date().toISOString();
        achievement.progress = achievement.maxProgress;
      }
    },

    addCelebration: (state, action: PayloadAction<{ type: CelebrationType; data: any }>) => {
      const celebration: Celebration = {
        id: `celebration-${Date.now()}`,
        type: action.payload.type,
        data: action.payload.data,
        timestamp: new Date().toISOString(),
      };
      state.celebrationQueue.push(celebration);
    },

    removeCelebration: (state, action: PayloadAction<string>) => {
      state.celebrationQueue = state.celebrationQueue.filter(c => c.id !== action.payload);
    },

    clearCelebrationQueue: (state) => {
      state.celebrationQueue = [];
    },

    updateSettings: (state, action: PayloadAction<Partial<GamificationSettings>>) => {
      state.settings = { ...state.settings, ...action.payload };
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setCurrentUser,
  updateUserXP,
  addMission,
  removeMission,
  updateMissionProgress,
  completeMission,
  updateGoalProgress,
  completeGoal,
  updateStreak,
  resetStreak,
  unlockAchievement,
  addCelebration,
  removeCelebration,
  clearCelebrationQueue,
  updateSettings,
  setLoading,
  setError,
} = gamificationSlice.actions;

export default gamificationSlice.reducer;
