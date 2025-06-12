
import { useSuperEnhancedToast } from '@/components/feedback/super-enhanced-toast';

/**
 * Unified Toast Hook - Single entry point for all toast functionality
 * 
 * This hook provides a standardized interface for all toast operations
 * across the application, ensuring consistency in behavior and styling.
 */
export const useUnifiedToast = () => {
  const toast = useSuperEnhancedToast();

  return {
    // Core toast methods
    success: toast.success,
    error: toast.error,
    warning: toast.warning,
    info: toast.info,
    loading: toast.loading,
    
    // Specialized methods
    upload: toast.upload,
    download: toast.download,
    save: toast.save,
    remove: toast.remove,
    userAction: toast.userAction,
    system: toast.system,
    
    // Promise handling
    promise: toast.promise,
    
    // Control methods
    dismiss: toast.dismiss,
    dismissAll: toast.dismissAll,
    update: toast.update,

    // Legacy compatibility (for gradual migration)
    toast: toast.success, // Default to success for basic toast() calls
    showToast: toast.success,
  };
};

// Export as default for convenience
export default useUnifiedToast;

// Re-export types for convenience
export type {
  SuperEnhancedToastOptions,
  PromiseToastOptions
} from '@/components/feedback/super-enhanced-toast';
