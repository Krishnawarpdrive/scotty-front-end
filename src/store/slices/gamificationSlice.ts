
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { GamificationState, Mission, Achievement, Goal, TAProfile } from '../types/gamificationTypes';

// Mock data for initial state
const mockTAProfile: TAProfile = {
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

const initialState: GamificationState = {
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

// Async thunks
export const updateMissionProgress = createAsyncThunk(
  'gamification/updateMissionProgress',
  async ({ missionId, progress }: { missionId: string; progress: number }) => {
    // In a real app, this would make an API call
    await new Promise(resolve => setTimeout(resolve, 500));
    return { missionId, progress };
  }
);

export const completeMission = createAsyncThunk(
  'gamification/completeMission',
  async ({ missionId, xpGained }: { missionId: string; xpGained: number }) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { missionId, xpGained };
  }
);

export const unlockAchievement = createAsyncThunk(
  'gamification/unlockAchievement',
  async ({ achievementId }: { achievementId: string }) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { achievementId, unlockedAt: new Date().toISOString() };
  }
);

const gamificationSlice = createSlice({
  name: 'gamification',
  initialState,
  reducers: {
    // Mission actions
    addMission: (state, action: PayloadAction<Mission>) => {
      state.missions.push(action.payload);
      if (state.currentUser) {
        state.currentUser.currentMissions.push(action.payload);
      }
    },
    
    removeMission: (state, action: PayloadAction<string>) => {
      state.missions = state.missions.filter(m => m.id !== action.payload);
      if (state.currentUser) {
        state.currentUser.currentMissions = state.currentUser.currentMissions.filter(m => m.id !== action.payload);
      }
    },

    // Goal actions
    updateGoalProgress: (state, action: PayloadAction<{ goalId: string; value: number }>) => {
      const { goalId, value } = action.payload;
      const goal = state.goals.find(g => g.id === goalId);
      if (goal) {
        goal.value = value;
        if (value >= goal.target) {
          goal.status = 'completed';
          // Add celebration to queue
          state.celebrationQueue.push({
            type: 'goal',
            data: goal,
            id: `goal-${goalId}-${Date.now()}`,
          });
        }
      }
    },

    completeGoal: (state, action: PayloadAction<string>) => {
      const goal = state.goals.find(g => g.id === action.payload);
      if (goal) {
        goal.status = 'completed';
        // Award XP for goal completion
        if (state.currentUser) {
          state.currentUser.xp += 100; // Base goal completion XP
        }
      }
    },

    // Streak actions
    updateStreak: (state, action: PayloadAction<{ streak: number; isNewRecord?: boolean }>) => {
      const { streak, isNewRecord } = action.payload;
      state.streakData.currentStreak = streak;
      state.streakData.lastActivityDate = new Date().toISOString();
      
      if (isNewRecord) {
        state.streakData.longestStreak = streak;
        state.celebrationQueue.push({
          type: 'streak',
          data: { streak, isNewRecord: true },
          id: `streak-${Date.now()}`,
        });
      }
    },

    resetStreak: (state) => {
      state.streakData.currentStreak = 0;
      state.streakData.lastActivityDate = new Date().toISOString();
    },

    // Celebration queue actions
    addCelebration: (state, action: PayloadAction<{ type: string; data: any }>) => {
      state.celebrationQueue.push({
        ...action.payload,
        id: `celebration-${Date.now()}`,
      });
    },

    removeCelebration: (state, action: PayloadAction<string>) => {
      state.celebrationQueue = state.celebrationQueue.filter(c => c.id !== action.payload);
    },

    clearCelebrationQueue: (state) => {
      state.celebrationQueue = [];
    },

    // Settings actions
    updateSettings: (state, action: PayloadAction<Partial<GamificationState['settings']>>) => {
      state.settings = { ...state.settings, ...action.payload };
    },

    // User actions
    updateUserXP: (state, action: PayloadAction<number>) => {
      if (state.currentUser) {
        const oldLevel = state.currentUser.level;
        state.currentUser.xp += action.payload;
        
        // Check for level up
        while (state.currentUser.xp >= state.currentUser.xpToNext) {
          state.currentUser.level++;
          state.currentUser.xp -= state.currentUser.xpToNext;
          state.currentUser.xpToNext = Math.floor(state.currentUser.xpToNext * 1.2); // Increase XP requirement
          
          // Add level up celebration
          state.celebrationQueue.push({
            type: 'achievement',
            data: { type: 'levelUp', newLevel: state.currentUser.level },
            id: `levelup-${Date.now()}`,
          });
        }
      }
    },

    // Error handling
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },

    clearError: (state) => {
      state.error = null;
    },
  },
  
  extraReducers: (builder) => {
    builder
      // Update mission progress
      .addCase(updateMissionProgress.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateMissionProgress.fulfilled, (state, action) => {
        state.isLoading = false;
        const { missionId, progress } = action.payload;
        const mission = state.missions.find(m => m.id === missionId);
        if (mission) {
          mission.progress = progress;
          if (progress >= mission.target && mission.status !== 'completed') {
            mission.status = 'completed';
            state.celebrationQueue.push({
              type: 'mission',
              data: mission,
              id: `mission-${missionId}-${Date.now()}`,
            });
          }
        }
      })
      .addCase(updateMissionProgress.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to update mission progress';
      })
      
      // Complete mission
      .addCase(completeMission.fulfilled, (state, action) => {
        const { missionId, xpGained } = action.payload;
        const mission = state.missions.find(m => m.id === missionId);
        if (mission) {
          mission.status = 'completed';
          if (state.currentUser) {
            state.currentUser.xp += xpGained;
            state.currentUser.totalMissionsCompleted++;
          }
        }
      })
      
      // Unlock achievement
      .addCase(unlockAchievement.fulfilled, (state, action) => {
        const { achievementId, unlockedAt } = action.payload;
        const achievement = state.achievements.find(a => a.id === achievementId);
        if (achievement) {
          achievement.isLocked = false;
          achievement.unlockedAt = unlockedAt;
          state.celebrationQueue.push({
            type: 'achievement',
            data: achievement,
            id: `achievement-${achievementId}-${Date.now()}`,
          });
        }
      });
  },
});

export const {
  addMission,
  removeMission,
  updateGoalProgress,
  completeGoal,
  updateStreak,
  resetStreak,
  addCelebration,
  removeCelebration,
  clearCelebrationQueue,
  updateSettings,
  updateUserXP,
  setError,
  clearError,
} = gamificationSlice.actions;

export default gamificationSlice.reducer;
