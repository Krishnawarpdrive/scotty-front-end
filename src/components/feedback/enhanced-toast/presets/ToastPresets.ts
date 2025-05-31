
import { ToastOptions } from '../types/ToastTypes';
import { CheckCircle, AlertTriangle, XCircle, Info, Upload, Download, Save, Trash2, User, Settings } from 'lucide-react';

export const createSuccessToast = (title: string, description?: string): ToastOptions => ({
  title,
  description,
  type: 'success',
  icon: <CheckCircle className="h-4 w-4" />,
  priority: 'medium',
  duration: 4000
});

export const createErrorToast = (title: string, description?: string): ToastOptions => ({
  title,
  description,
  type: 'error',
  icon: <XCircle className="h-4 w-4" />,
  priority: 'high',
  duration: 6000
});

export const createWarningToast = (title: string, description?: string): ToastOptions => ({
  title,
  description,
  type: 'warning',
  icon: <AlertTriangle className="h-4 w-4" />,
  priority: 'medium',
  duration: 5000
});

export const createInfoToast = (title: string, description?: string): ToastOptions => ({
  title,
  description,
  type: 'info',
  icon: <Info className="h-4 w-4" />,
  priority: 'low',
  duration: 4000
});

export const createLoadingToast = (title: string, description?: string): ToastOptions => ({
  title,
  description,
  type: 'loading',
  persistent: true,
  dismissible: false
});

// Action-specific presets
export const createUploadToast = (filename: string, progress?: number): ToastOptions => ({
  title: 'Uploading file',
  description: `${filename}${progress !== undefined ? ` (${progress}%)` : ''}`,
  type: 'loading',
  icon: <Upload className="h-4 w-4" />,
  persistent: true,
  data: { filename, progress }
});

export const createDownloadToast = (filename: string): ToastOptions => ({
  title: 'Download started',
  description: `Downloading ${filename}`,
  type: 'info',
  icon: <Download className="h-4 w-4" />,
  actions: [{
    label: 'Cancel',
    onClick: () => console.log('Download cancelled'),
    variant: 'outline'
  }]
});

export const createSaveToast = (itemName: string): ToastOptions => ({
  title: 'Saved successfully',
  description: `${itemName} has been saved`,
  type: 'success',
  icon: <Save className="h-4 w-4" />,
  actions: [{
    label: 'Undo',
    onClick: () => console.log('Undo save'),
    variant: 'outline'
  }]
});

export const createDeleteToast = (itemName: string, onUndo?: () => void): ToastOptions => ({
  title: 'Item deleted',
  description: `${itemName} has been deleted`,
  type: 'warning',
  icon: <Trash2 className="h-4 w-4" />,
  duration: 8000,
  actions: onUndo ? [{
    label: 'Undo',
    onClick: onUndo,
    variant: 'outline'
  }] : undefined
});

export const createUserActionToast = (action: string, userName: string): ToastOptions => ({
  title: `User ${action}`,
  description: `${userName} has been ${action.toLowerCase()}`,
  type: 'success',
  icon: <User className="h-4 w-4" />,
  group: 'user-actions'
});

export const createSystemToast = (message: string, isError = false): ToastOptions => ({
  title: isError ? 'System Error' : 'System Update',
  description: message,
  type: isError ? 'error' : 'info',
  icon: <Settings className="h-4 w-4" />,
  priority: isError ? 'critical' : 'medium',
  group: 'system'
});
