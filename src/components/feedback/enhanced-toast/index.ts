
// Main exports
export { ToastProvider, useToast } from './context/ToastContext';
export { EnhancedToastProvider, useEnhancedToast } from './context/EnhancedToastContext';
export { useToastManager } from './hooks/useToastManager';

// Enhanced component exports
export { EnhancedToastContainer } from './components/EnhancedToastContainer';
export { EnhancedToastCard } from './components/EnhancedToastCard';
export { ToastContainer } from './components/ToastContainer';
export { ToastCard } from './components/ToastCard';

// Enhanced hooks
export { useSmartPositioning } from './hooks/useSmartPositioning';

// Type exports
export type {
  ToastType,
  ToastPriority,
  ToastPosition,
  ToastAction,
  ToastOptions,
  ToastPromiseOptions,
  ToastInstance,
  ToastContextType
} from './types/ToastTypes';

// Utility exports
export {
  getToastIcon,
  getToastColors,
  getPriorityOrder,
  sortToastsByPriority,
  getDefaultDuration,
  generateToastId,
  shouldGroupToasts,
  formatToastMessage
} from './utils/ToastUtils';

// Smart timing utilities
export {
  calculateSmartDuration,
  getProgressAnimationDuration,
  shouldPauseOnHover,
  getHoverPauseDuration,
  SmartTimer
} from './utils/SmartTiming';

// Preset exports
export {
  createSuccessToast,
  createErrorToast,
  createWarningToast,
  createInfoToast,
  createLoadingToast,
  createUploadToast,
  createDownloadToast,
  createSaveToast,
  createDeleteToast,
  createUserActionToast,
  createSystemToast
} from './presets';
