
import { ToastType, ToastPriority, ToastInstance } from '../types/ToastTypes';

export const getToastIcon = (type: ToastType) => {
  const icons = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ',
    loading: '⟳',
    custom: ''
  };
  return icons[type] || '';
};

export const getToastColors = (type: ToastType) => {
  const colors = {
    success: {
      bg: 'bg-green-50 border-green-200',
      text: 'text-green-800',
      icon: 'text-green-600',
      progress: 'bg-green-500'
    },
    error: {
      bg: 'bg-red-50 border-red-200',
      text: 'text-red-800',
      icon: 'text-red-600',
      progress: 'bg-red-500'
    },
    warning: {
      bg: 'bg-yellow-50 border-yellow-200',
      text: 'text-yellow-800',
      icon: 'text-yellow-600',
      progress: 'bg-yellow-500'
    },
    info: {
      bg: 'bg-blue-50 border-blue-200',
      text: 'text-blue-800',
      icon: 'text-blue-600',
      progress: 'bg-blue-500'
    },
    loading: {
      bg: 'bg-gray-50 border-gray-200',
      text: 'text-gray-800',
      icon: 'text-gray-600',
      progress: 'bg-gray-500'
    },
    custom: {
      bg: 'bg-white border-gray-200',
      text: 'text-gray-800',
      icon: 'text-gray-600',
      progress: 'bg-gray-500'
    }
  };
  return colors[type] || colors.custom;
};

export const getPriorityOrder = (priority: ToastPriority): number => {
  const order = {
    critical: 1,
    high: 2,
    medium: 3,
    low: 4
  };
  return order[priority] || 3;
};

export const sortToastsByPriority = (toasts: ToastInstance[]): ToastInstance[] => {
  return [...toasts].sort((a, b) => {
    const priorityA = getPriorityOrder(a.priority || 'medium');
    const priorityB = getPriorityOrder(b.priority || 'medium');
    
    if (priorityA !== priorityB) {
      return priorityA - priorityB;
    }
    
    return b.createdAt.getTime() - a.createdAt.getTime();
  });
};

export const getDefaultDuration = (type: ToastType, priority: ToastPriority): number => {
  const baseDurations = {
    success: 4000,
    error: 6000,
    warning: 5000,
    info: 4000,
    loading: 0, // No auto-dismiss for loading
    custom: 4000
  };

  const priorityMultipliers = {
    critical: 2,
    high: 1.5,
    medium: 1,
    low: 0.8
  };

  const baseDuration = baseDurations[type] || 4000;
  const multiplier = priorityMultipliers[priority] || 1;
  
  return Math.round(baseDuration * multiplier);
};

export const generateToastId = (): string => {
  return `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const shouldGroupToasts = (toast1: ToastInstance, toast2: ToastInstance): boolean => {
  return !!(
    toast1.group &&
    toast2.group &&
    toast1.group === toast2.group &&
    toast1.type === toast2.type
  );
};

export const formatToastMessage = (message: string, data?: Record<string, any>): string => {
  if (!data) return message;
  
  return message.replace(/\{(\w+)\}/g, (match, key) => {
    return data[key]?.toString() || match;
  });
};
