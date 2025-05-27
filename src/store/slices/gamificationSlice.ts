
// Re-export everything from the refactored gamification slice
export {
  default,
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
  updateMissionProgress,
  completeMission,
  unlockAchievement,
} from './gamification';
