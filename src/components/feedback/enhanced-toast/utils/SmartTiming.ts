
import { ToastType, ToastPriority } from '../types/ToastTypes';

export interface SmartTimingConfig {
  baseTime?: number;
  readingSpeed?: number; // ms per character
  minTime?: number;
  maxTime?: number;
  typeMultipliers?: Partial<Record<ToastType, number>>;
  priorityMultipliers?: Partial<Record<ToastPriority, number>>;
}

const defaultConfig: Required<SmartTimingConfig> = {
  baseTime: 4000,
  readingSpeed: 50,
  minTime: 1000,
  maxTime: 10000,
  typeMultipliers: {
    'success': 1.0,
    'info': 1.0,
    'warning': 1.3,
    'error': 1.5,
    'loading': 0, // Never auto-dismiss
    'custom': 1.0,
  },
  priorityMultipliers: {
    'low': 0.8,
    'medium': 1.0,
    'high': 1.3,
    'critical': 2.0,
  },
};

export const calculateSmartDuration = (
  title: string,
  description?: string,
  type: ToastType = 'info',
  priority: ToastPriority = 'medium',
  config: SmartTimingConfig = {}
): number => {
  const mergedConfig = { ...defaultConfig, ...config };

  // For loading and persistent types, return 0 (no auto-dismiss)
  if (type === 'loading') return 0;

  // Calculate content-based duration
  const contentLength = title.length + (description?.length || 0);
  const readingTime = Math.max(contentLength * mergedConfig.readingSpeed, mergedConfig.minTime);

  // Apply base time
  let duration = mergedConfig.baseTime + readingTime;

  // Apply type multiplier
  const typeMultiplier = mergedConfig.typeMultipliers[type] || 1.0;
  duration *= typeMultiplier;

  // Apply priority multiplier
  const priorityMultiplier = mergedConfig.priorityMultipliers[priority] || 1.0;
  duration *= priorityMultiplier;

  // Ensure within bounds
  return Math.min(Math.max(duration, mergedConfig.minTime), mergedConfig.maxTime);
};

export const getProgressAnimationDuration = (totalDuration: number): number => {
  // Smooth progress animation that feels natural
  return Math.min(totalDuration * 0.02, 100);
};

export const shouldPauseOnHover = (type: ToastType, priority: ToastPriority): boolean => {
  // Don't pause loading toasts or low priority toasts
  if (type === 'loading') return false;
  if (priority === 'low') return false;
  
  return true;
};

export const getHoverPauseDuration = (remainingTime: number): number => {
  // Add extra time when user hovers (shows interest)
  return Math.min(remainingTime + 2000, 8000);
};

export class SmartTimer {
  private timerId?: NodeJS.Timeout;
  private startTime: number = 0;
  private pausedTime: number = 0;
  private isPaused: boolean = false;
  private onComplete?: () => void;
  private onProgress?: (progress: number, timeRemaining: number) => void;

  constructor(
    private duration: number,
    onComplete?: () => void,
    onProgress?: (progress: number, timeRemaining: number) => void
  ) {
    this.onComplete = onComplete;
    this.onProgress = onProgress;
  }

  start(): void {
    if (this.duration <= 0) return;

    this.startTime = Date.now();
    this.isPaused = false;
    this.tick();
  }

  pause(): void {
    if (this.isPaused || !this.timerId) return;

    this.isPaused = true;
    this.pausedTime = Date.now();
    clearTimeout(this.timerId);
  }

  resume(): void {
    if (!this.isPaused) return;

    const pauseDuration = Date.now() - this.pausedTime;
    this.startTime += pauseDuration;
    this.isPaused = false;
    this.tick();
  }

  restart(): void {
    this.stop();
    this.start();
  }

  stop(): void {
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = undefined;
    }
    this.isPaused = false;
  }

  private tick(): void {
    if (this.isPaused) return;

    const elapsed = Date.now() - this.startTime;
    const remaining = Math.max(this.duration - elapsed, 0);
    const progress = ((this.duration - remaining) / this.duration) * 100;

    this.onProgress?.(progress, Math.ceil(remaining / 1000));

    if (remaining <= 0) {
      this.onComplete?.();
      return;
    }

    this.timerId = setTimeout(() => this.tick(), 50);
  }

  getTimeRemaining(): number {
    if (this.isPaused) {
      return Math.max(this.duration - (this.pausedTime - this.startTime), 0);
    }
    return Math.max(this.duration - (Date.now() - this.startTime), 0);
  }

  getProgress(): number {
    const elapsed = this.isPaused 
      ? this.pausedTime - this.startTime
      : Date.now() - this.startTime;
    return Math.min((elapsed / this.duration) * 100, 100);
  }
}
