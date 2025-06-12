
export interface SidebarState {
  isCollapsed: boolean;
  activeSection: string | null;
}

export interface DrawerState {
  isOpen: boolean;
  type: string | null;
  data: any;
  size: 'sm' | 'md' | 'lg' | 'xl';
}

export interface ModalState {
  isOpen: boolean;
  type: string | null;
  data: any;
  size: 'sm' | 'md' | 'lg' | 'xl';
}

export interface NotificationState {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
  isVisible: boolean;
  createdAt: string;
}

export interface UIState {
  sidebar: SidebarState;
  drawer: DrawerState;
  modal: ModalState;
  notifications: NotificationState[];
  globalLoading: boolean;
  pageLoading: boolean;
  currentPage: string;
  breadcrumbs: Array<{ label: string; path?: string }>;
  filters: Record<string, any>;
  searchQuery: string;
  selectedItems: string[];
  theme: 'light' | 'dark' | 'system';
  compactMode: boolean;
}
