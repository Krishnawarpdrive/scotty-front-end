
import { useAppSelector, useAppDispatch } from '../index';
import {
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
  updateMissionProgress,
  completeMission,
  unlockAchievement,
} from '../slices/gamificationSlice';
import { CelebrationType } from '../types/gamificationTypes';
import { triggerGoalCompletionToast, triggerMilestoneToast } from '@/components/GoalCompletionToast';

export const useGamification = () => {
  const dispatch = useAppDispatch();
  const gamificationState = useAppSelector((state) => state.gamification);

  // Selectors
  const currentUser = gamificationState.currentUser;
  const missions = gamificationState.missions;
  const achievements = gamificationState.achievements;
  const goals = gamificationState.goals;
  const streakData = gamificationState.streakData;
  const celebrationQueue = gamificationState.celebrationQueue;
  const settings = gamificationState.settings;

  // Actions
  const addNewMission = (mission: any) => {
    dispatch(addMission(mission));
  };

  const updateMission = async (missionId: string, progress: number) => {
    const result = await dispatch(updateMissionProgress({ missionId, progress }));
    
    // Check if mission was completed and trigger celebration
    if (result.meta.requestStatus === 'fulfilled') {
      const mission = missions.find(m => m.id === missionId);
      if (mission && progress >= mission.target) {
        triggerGoalCompletionToast({
          id: mission.id,
          title: mission.title,
          type: mission.type as 'daily' | 'weekly' | 'monthly',
          value: progress,
          target: mission.target,
        });
      }
    }
  };

  const completeMissionAction = async (missionId: string, xpGained: number) => {
    await dispatch(completeMission({ missionId, xpGained }));
  };

  const updateGoal = (goalId: string, value: number) => {
    dispatch(updateGoalProgress({ goalId, value }));
    
    // Check if goal was completed and trigger celebration
    const goal = goals.find(g => g.id === goalId);
    if (goal && value >= goal.target) {
      triggerGoalCompletionToast({
        id: goal.id,
        title: goal.title,
        type: goal.type as 'daily' | 'weekly' | 'monthly',
        value: value,
        target: goal.target,
      });
    }
  };

  const incrementStreak = () => {
    const newStreak = streakData.currentStreak + 1;
    const isNewRecord = newStreak > streakData.longestStreak;
    
    dispatch(updateStreak({ streak: newStreak, isNewRecord }));
    
    // Trigger milestone celebrations
    if (newStreak % 7 === 0) {
      triggerMilestoneToast(newStreak, 'Daily Streak');
    }
  };

  const awardXP = (amount: number) => {
    dispatch(updateUserXP(amount));
  };

  const unlockNewAchievement = async (achievementId: string) => {
    await dispatch(unlockAchievement({ achievementId }));
  };

  const addCelebrationToQueue = (type: CelebrationType, data: any) => {
    dispatch(addCelebration({ type, data }));
  };

  const processCelebrationQueue = () => {
    if (celebrationQueue.length > 0) {
      const celebration = celebrationQueue[0];
      dispatch(removeCelebration(celebration.id));
      return celebration;
    }
    return null;
  };

  return {
    // State
    currentUser,
    missions,
    achievements,
    goals,
    streakData,
    celebrationQueue,
    settings,
    isLoading: gamificationState.isLoading,
    error: gamificationState.error,
    
    // Actions
    addNewMission,
    updateMission,
    completeMissionAction,
    updateGoal,
    completeGoal: (goalId: string) => dispatch(completeGoal(goalId)),
    incrementStreak,
    resetStreak: () => dispatch(resetStreak()),
    awardXP,
    unlockNewAchievement,
    addCelebrationToQueue,
    processCelebrationQueue,
    clearCelebrations: () => dispatch(clearCelebrationQueue()),
    updateSettings: (settings: any) => dispatch(updateSettings(settings)),
  };
};
