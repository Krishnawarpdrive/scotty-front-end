
import { ToastOptions } from '../types/ToastTypes';

// Success Toast Presets
export const createSuccessToast = (message: string, options?: Partial<ToastOptions>): ToastOptions => ({
  title: 'Success',
  description: message,
  type: 'success',
  duration: 4000,
  ...options
});

// Error Toast Presets  
export const createErrorToast = (message: string, options?: Partial<ToastOptions>): ToastOptions => ({
  title: 'Error',
  description: message,
  type: 'error',
  duration: 6000,
  ...options
});

// Warning Toast Presets
export const createWarningToast = (message: string, options?: Partial<ToastOptions>): ToastOptions => ({
  title: 'Warning',
  description: message,
  type: 'warning',
  duration: 5000,
  ...options
});

// Info Toast Presets
export const createInfoToast = (message: string, options?: Partial<ToastOptions>): ToastOptions => ({
  title: 'Information',
  description: message,
  type: 'info',
  duration: 4000,
  ...options
});

// Loading Toast Presets
export const createLoadingToast = (message: string, options?: Partial<ToastOptions>): ToastOptions => ({
  title: 'Loading',
  description: message,
  type: 'loading',
  persistent: true,
  dismissible: false,
  ...options
});

// Upload Toast Presets
export const createUploadToast = (message: string, options?: Partial<ToastOptions>): ToastOptions => ({
  title: 'Upload',
  description: message,
  type: 'loading',
  group: 'upload',
  ...options
});

// Download Toast Presets
export const createDownloadToast = (message: string, options?: Partial<ToastOptions>): ToastOptions => ({
  title: 'Download',
  description: message,
  type: 'info',
  group: 'download',
  ...options
});

// Save Toast Presets
export const createSaveToast = (message: string, options?: Partial<ToastOptions>): ToastOptions => ({
  title: 'Save',
  description: message,
  type: 'success',
  ...options
});

// Delete Toast Presets
export const createDeleteToast = (message: string, options?: Partial<ToastOptions>): ToastOptions => ({
  title: 'Delete',
  description: message,
  type: 'warning',
  priority: 'high',
  ...options
});

// User Action Toast Presets
export const createUserActionToast = (action: string, message: string, options?: Partial<ToastOptions>): ToastOptions => ({
  title: action,
  description: message,
  type: 'info',
  ...options
});

// System Toast Presets
export const createSystemToast = (message: string, options?: Partial<ToastOptions>): ToastOptions => ({
  title: 'System',
  description: message,
  type: 'info',
  priority: 'low',
  ...options
});
