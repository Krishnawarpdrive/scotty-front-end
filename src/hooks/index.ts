
// Unified Toast System - Single source of truth for all toast functionality
export { useUnifiedToast, useUnifiedToast as default } from './useUnifiedToast';
export { UnifiedToastProvider } from '../providers/UnifiedToastProvider';

// Legacy compatibility exports (for gradual migration)
export { createLegacyToastAdapter } from '../utils/toastMigration';

// Re-export enhanced toast types
export type {
  SuperEnhancedToastOptions,
  PromiseToastOptions
} from '@/components/feedback/super-enhanced-toast';

// Goal-specific toast utilities
export { useGoalToasts, triggerGoalCompletionToast, triggerMilestoneToast } from '../components/GoalCompletionToast';
