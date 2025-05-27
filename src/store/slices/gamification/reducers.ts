
import { PayloadAction } from '@reduxjs/toolkit';
import { GamificationState, Mission, CelebrationType } from '../../types/gamificationTypes';

export const reducers = {
  // Mission actions
  addMission: (state: GamificationState, action: PayloadAction<Mission>) => {
    state.missions.push(action.payload);
    if (state.currentUser) {
      state.currentUser.currentMissions.push(action.payload);
    }
  },
  
  removeMission: (state: GamificationState, action: PayloadAction<string>) => {
    state.missions = state.missions.filter(m => m.id !== action.payload);
    if (state.currentUser) {
      state.currentUser.currentMissions = state.currentUser.currentMissions.filter(m => m.id !== action.payload);
    }
  },

  // Goal actions
  updateGoalProgress: (state: GamificationState, action: PayloadAction<{ goalId: string; value: number }>) => {
    const { goalId, value } = action.payload;
    const goal = state.goals.find(g => g.id === goalId);
    if (goal) {
      goal.value = value;
      if (value >= goal.target) {
        goal.status = 'completed';
        // Add celebration to queue
        state.celebrationQueue.push({
          type: 'goal' as CelebrationType,
          data: goal,
          id: `goal-${goalId}-${Date.now()}`,
        });
      }
    }
  },

  completeGoal: (state: GamificationState, action: PayloadAction<string>) => {
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
  updateStreak: (state: GamificationState, action: PayloadAction<{ streak: number; isNewRecord?: boolean }>) => {
    const { streak, isNewRecord } = action.payload;
    state.streakData.currentStreak = streak;
    state.streakData.lastActivityDate = new Date().toISOString();
    
    if (isNewRecord) {
      state.streakData.longestStreak = streak;
      state.celebrationQueue.push({
        type: 'streak' as CelebrationType,
        data: { streak, isNewRecord: true },
        id: `streak-${Date.now()}`,
      });
    }
  },

  resetStreak: (state: GamificationState) => {
    state.streakData.currentStreak = 0;
    state.streakData.lastActivityDate = new Date().toISOString();
  },

  // Celebration queue actions
  addCelebration: (state: GamificationState, action: PayloadAction<{ type: CelebrationType; data: any }>) => {
    state.celebrationQueue.push({
      type: action.payload.type,
      data: action.payload.data,
      id: `celebration-${Date.now()}`,
    });
  },

  removeCelebration: (state: GamificationState, action: PayloadAction<string>) => {
    state.celebrationQueue = state.celebrationQueue.filter(c => c.id !== action.payload);
  },

  clearCelebrationQueue: (state: GamificationState) => {
    state.celebrationQueue = [];
  },

  // Settings actions
  updateSettings: (state: GamificationState, action: PayloadAction<Partial<GamificationState['settings']>>) => {
    state.settings = { ...state.settings, ...action.payload };
  },

  // User actions
  updateUserXP: (state: GamificationState, action: PayloadAction<number>) => {
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
          type: 'achievement' as CelebrationType,
          data: { type: 'levelUp', newLevel: state.currentUser.level },
          id: `levelup-${Date.now()}`,
        });
      }
    }
  },

  // Error handling
  setError: (state: GamificationState, action: PayloadAction<string>) => {
    state.error = action.payload;
    state.isLoading = false;
  },

  clearError: (state: GamificationState) => {
    state.error = null;
  },
};
