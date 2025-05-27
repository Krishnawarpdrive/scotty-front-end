
import { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { GamificationState, CelebrationType } from '../../types/gamificationTypes';
import { updateMissionProgress, completeMission, unlockAchievement } from './asyncThunks';

export const buildExtraReducers = (builder: ActionReducerMapBuilder<GamificationState>) => {
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
            type: 'mission' as CelebrationType,
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
          type: 'achievement' as CelebrationType,
          data: achievement,
          id: `achievement-${achievementId}-${Date.now()}`,
        });
      }
    });
};
