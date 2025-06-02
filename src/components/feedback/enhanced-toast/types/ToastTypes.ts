
export type ToastType = 'success' | 'error' | 'warning' | 'info' | 'loading' | 'custom';

export type ToastPriority = 'low' | 'medium' | 'high' | 'critical';

export type ToastPosition = 
  | 'top-left' | 'top-center' | 'top-right'
  | 'bottom-left' | 'bottom-center' | 'bottom-right';

export interface ToastAction {
  label: string;
  onClick: () => void;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost';
  icon?: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
}

export interface ToastOptions {
  title: string;
  description?: string;
  type?: ToastType;
  priority?: ToastPriority;
  duration?: number;
  persistent?: boolean;
  dismissible?: boolean;
  position?: ToastPosition;
  icon?: React.ReactNode;
  actions?: ToastAction[];
  data?: Record<string, any>;
  group?: string;
  onDismiss?: () => void;
  onShow?: () => void;
  className?: string;
}

export interface ToastPromiseOptions<T> {
  loading: string | ToastOptions;
  success: string | ((data: T) => string) | ((data: T) => ToastOptions);
  error: string | ((error: any) => string) | ((error: any) => ToastOptions);
  finally?: () => void;
}

export interface ToastInstance extends ToastOptions {
  id: string;
  createdAt: Date;
  isVisible: boolean;
  progress?: number;
}

export interface ToastContextType {
  toasts: ToastInstance[];
  showToast: (options: ToastOptions) => string;
  dismissToast: (id: string) => void;
  dismissAll: () => void;
  updateToast: (id: string, updates: Partial<ToastOptions>) => void;
  pauseToast: (id: string) => void;
  resumeToast: (id: string) => void;
  promise: <T>(promise: Promise<T>, options: ToastPromiseOptions<T>) => Promise<T>;
}
