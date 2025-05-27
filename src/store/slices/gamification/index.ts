
import { createSlice } from '@reduxjs/toolkit';
import { initialState } from './initialState';
import { reducers } from './reducers';
import { buildExtraReducers } from './extraReducers';

const gamificationSlice = createSlice({
  name: 'gamification',
  initialState,
  reducers,
  extraReducers: buildExtraReducers,
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

// Re-export async thunks for convenience
export {
  updateMissionProgress,
  completeMission,
  unlockAchievement,
} from './asyncThunks';
