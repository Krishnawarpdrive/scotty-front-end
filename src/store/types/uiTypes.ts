
export interface DrawerState {
  isOpen: boolean;
  type: string | null;
  data: any;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export interface ModalState {
  isOpen: boolean;
  type: string | null;
  data: any;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export interface SidebarState {
  isCollapsed: boolean;
  activeSection: string | null;
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
  // Layout state
  sidebar: SidebarState;
  
  // Drawer state
  drawer: DrawerState;
  
  // Modal state
  modal: ModalState;
  
  // Notifications
  notifications: NotificationState[];
  
  // Loading states
  globalLoading: boolean;
  pageLoading: boolean;
  
  // Current page context
  currentPage: string;
  breadcrumbs: Array<{ label: string; path?: string }>;
  
  // Filter and search states
  filters: Record<string, any>;
  searchQuery: string;
  
  // Table states
  selectedItems: string[];
  
  // Theme and preferences
  theme: 'light' | 'dark' | 'system';
  compactMode: boolean;
}
