
import { useUnifiedToast } from '@/hooks/useUnifiedToast';

// Legacy toast adapter for gradual migration
export const createLegacyToastAdapter = () => {
  const toast = useUnifiedToast();

  return {
    toast: toast.success,
    success: toast.success,
    error: toast.error,
    warning: toast.warning,
    info: toast.info,
    loading: toast.loading,
    promise: toast.promise,
    dismiss: toast.dismiss,
    dismissAll: toast.dismissAll,
  };
};
