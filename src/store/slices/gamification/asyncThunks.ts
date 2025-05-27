
import { createAsyncThunk } from '@reduxjs/toolkit';

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
