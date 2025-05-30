
import { useState, useEffect } from 'react';
import { interviewSchedulingService, InterviewSchedule } from '../InterviewSchedulingService';

export const useInterviewScheduling = () => {
  const [schedules, setSchedules] = useState<InterviewSchedule[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadSchedules = async (filters?: any) => {
    setLoading(true);
    setError(null);
    try {
      const data = await interviewSchedulingService.getInterviewSchedules(filters);
      setSchedules(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load schedules');
    } finally {
      setLoading(false);
    }
  };

  const createSchedule = async (schedule: Omit<InterviewSchedule, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const newSchedule = await interviewSchedulingService.createInterviewSchedule(schedule);
      setSchedules(prev => [newSchedule, ...prev]);
      return newSchedule;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create schedule');
      throw err;
    }
  };

  const updateSchedule = async (id: string, updates: Partial<InterviewSchedule>) => {
    try {
      const updatedSchedule = await interviewSchedulingService.updateInterviewSchedule(id, updates);
      setSchedules(prev => prev.map(s => s.id === id ? updatedSchedule : s));
      return updatedSchedule;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update schedule');
      throw err;
    }
  };

  const deleteSchedule = async (id: string) => {
    try {
      await interviewSchedulingService.deleteInterviewSchedule(id);
      setSchedules(prev => prev.filter(s => s.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete schedule');
      throw err;
    }
  };

  useEffect(() => {
    loadSchedules();
  }, []);

  return {
    schedules,
    loading,
    error,
    loadSchedules,
    createSchedule,
    updateSchedule,
    deleteSchedule
  };
};
