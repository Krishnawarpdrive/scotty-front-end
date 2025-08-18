
import { toast } from 'sonner';

export interface PromiseToastOptions {
  loading?: string;
  success?: string;
  error?: string;
  description?: string;
  duration?: number;
}

export const createPromiseToast = <T>(
  promise: Promise<T>,
  options: PromiseToastOptions = {}
) => {
  const {
    loading = 'Loading...',
    success = 'Success!',
    error = 'Something went wrong',
    description,
    duration = 4000
  } = options;

  return toast.promise(promise, {
    loading: {
      title: loading,
      description
    },
    success: (data) => ({
      title: success,
      description,
      duration
    }),
    error: (err) => ({
      title: error,
      description: err?.message || description,
      duration
    })
  });
};

export const handleAsyncOperation = async <T>(
  operation: () => Promise<T>,
  options: PromiseToastOptions = {}
): Promise<T | null> => {
  try {
    const promise = operation();
    await createPromiseToast(promise, options);
    return await promise;
  } catch (error) {
    console.error('Async operation failed:', error);
    return null;
  }
};
