
import { useState, useEffect, useCallback, useRef } from 'react';

export interface TimerState {
  isRunning: boolean;
  isPaused: boolean;
  elapsedTime: number;
  remainingTime: number;
  totalDuration: number;
  stage: 'not-started' | 'running' | 'paused' | 'completed' | 'overtime';
}

export interface UseSmartTimerProps {
  duration: number; // in minutes
  onComplete?: () => void;
  onWarning?: (minutesLeft: number) => void;
  warningThresholds?: number[]; // minutes before end to trigger warnings
}

export const useSmartTimer = ({ 
  duration, 
  onComplete, 
  onWarning,
  warningThresholds = [15, 10, 5, 1]
}: UseSmartTimerProps) => {
  const [timerState, setTimerState] = useState<TimerState>({
    isRunning: false,
    isPaused: false,
    elapsedTime: 0,
    remainingTime: duration * 60, // convert to seconds
    totalDuration: duration * 60,
    stage: 'not-started'
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const warningsTriggeredRef = useRef<Set<number>>(new Set());

  const updateTimer = useCallback(() => {
    setTimerState(prev => {
      const newElapsedTime = prev.elapsedTime + 1;
      const newRemainingTime = prev.totalDuration - newElapsedTime;
      
      // Check for warnings
      const minutesLeft = Math.ceil(newRemainingTime / 60);
      warningThresholds.forEach(threshold => {
        if (minutesLeft === threshold && !warningsTriggeredRef.current.has(threshold)) {
          warningsTriggeredRef.current.add(threshold);
          onWarning?.(threshold);
        }
      });

      // Determine stage
      let stage: TimerState['stage'] = 'running';
      if (newRemainingTime <= 0) {
        stage = 'overtime';
        if (newElapsedTime === prev.totalDuration + 1) {
          onComplete?.();
        }
      }

      return {
        ...prev,
        elapsedTime: newElapsedTime,
        remainingTime: Math.max(0, newRemainingTime),
        stage
      };
    });
  }, [onComplete, onWarning, warningThresholds]);

  const startTimer = useCallback(() => {
    if (!intervalRef.current) {
      intervalRef.current = setInterval(updateTimer, 1000);
    }
    setTimerState(prev => ({
      ...prev,
      isRunning: true,
      isPaused: false,
      stage: prev.stage === 'not-started' ? 'running' : prev.stage
    }));
  }, [updateTimer]);

  const pauseTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setTimerState(prev => ({
      ...prev,
      isRunning: false,
      isPaused: true,
      stage: 'paused'
    }));
  }, []);

  const resetTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    warningsTriggeredRef.current.clear();
    setTimerState({
      isRunning: false,
      isPaused: false,
      elapsedTime: 0,
      remainingTime: duration * 60,
      totalDuration: duration * 60,
      stage: 'not-started'
    });
  }, [duration]);

  const addTime = useCallback((minutes: number) => {
    setTimerState(prev => ({
      ...prev,
      totalDuration: prev.totalDuration + (minutes * 60),
      remainingTime: prev.remainingTime + (minutes * 60)
    }));
  }, []);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const formatTime = useCallback((seconds: number) => {
    const mins = Math.floor(Math.abs(seconds) / 60);
    const secs = Math.abs(seconds) % 60;
    const sign = seconds < 0 ? '-' : '';
    return `${sign}${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);

  return {
    timerState,
    startTimer,
    pauseTimer,
    resetTimer,
    addTime,
    formatTime
  };
};
