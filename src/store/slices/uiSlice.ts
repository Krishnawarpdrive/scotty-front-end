
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UIState, DrawerState, ModalState, NotificationState } from '../types/uiTypes';

const initialState: UIState = {
  sidebar: {
    isCollapsed: false,
    activeSection: null,
  },
  drawer: {
    isOpen: false,
    type: null,
    data: null,
    size: 'md',
  },
  modal: {
    isOpen: false,
    type: null,
    data: null,
    size: 'md',
  },
  notifications: [],
  globalLoading: false,
  pageLoading: false,
  currentPage: '',
  breadcrumbs: [],
  filters: {},
  searchQuery: '',
  selectedItems: [],
  theme: 'light',
  compactMode: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    // Sidebar actions
    toggleSidebar: (state) => {
      state.sidebar.isCollapsed = !state.sidebar.isCollapsed;
    },
    
    setSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
      state.sidebar.isCollapsed = action.payload;
    },
    
    setActiveSection: (state, action: PayloadAction<string | null>) => {
      state.sidebar.activeSection = action.payload;
    },

    // Drawer actions
    openDrawer: (state, action: PayloadAction<{ type: string; data?: any; size?: 'sm' | 'md' | 'lg' | 'xl' }>) => {
      state.drawer.isOpen = true;
      state.drawer.type = action.payload.type;
      state.drawer.data = action.payload.data || null;
      state.drawer.size = action.payload.size || 'md';
    },
    
    closeDrawer: (state) => {
      state.drawer.isOpen = false;
      state.drawer.type = null;
      state.drawer.data = null;
    },
    
    updateDrawerData: (state, action: PayloadAction<any>) => {
      state.drawer.data = action.payload;
    },

    // Modal actions
    openModal: (state, action: PayloadAction<{ type: string; data?: any; size?: 'sm' | 'md' | 'lg' | 'xl' }>) => {
      state.modal.isOpen = true;
      state.modal.type = action.payload.type;
      state.modal.data = action.payload.data || null;
      state.modal.size = action.payload.size || 'md';
    },
    
    closeModal: (state) => {
      state.modal.isOpen = false;
      state.modal.type = null;
      state.modal.data = null;
    },

    // Notification actions
    addNotification: (state, action: PayloadAction<Omit<NotificationState, 'id' | 'isVisible' | 'createdAt'>>) => {
      const notification: NotificationState = {
        ...action.payload,
        id: `notification-${Date.now()}-${Math.random()}`,
        isVisible: true,
        createdAt: new Date().toISOString(),
      };
      state.notifications.push(notification);
    },
    
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(n => n.id !== action.payload);
    },
    
    hideNotification: (state, action: PayloadAction<string>) => {
      const notification = state.notifications.find(n => n.id === action.payload);
      if (notification) {
        notification.isVisible = false;
      }
    },
    
    clearNotifications: (state) => {
      state.notifications = [];
    },

    // Loading actions
    setGlobalLoading: (state, action: PayloadAction<boolean>) => {
      state.globalLoading = action.payload;
    },
    
    setPageLoading: (state, action: PayloadAction<boolean>) => {
      state.pageLoading = action.payload;
    },

    // Page context actions
    setCurrentPage: (state, action: PayloadAction<string>) => {
      state.currentPage = action.payload;
    },
    
    setBreadcrumbs: (state, action: PayloadAction<Array<{ label: string; path?: string }>>) => {
      state.breadcrumbs = action.payload;
    },

    // Filter and search actions
    setFilters: (state, action: PayloadAction<Record<string, any>>) => {
      state.filters = action.payload;
    },
    
    updateFilter: (state, action: PayloadAction<{ key: string; value: any }>) => {
      state.filters[action.payload.key] = action.payload.value;
    },
    
    clearFilters: (state) => {
      state.filters = {};
    },
    
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },

    // Selection actions
    setSelectedItems: (state, action: PayloadAction<string[]>) => {
      state.selectedItems = action.payload;
    },
    
    toggleItemSelection: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;
      const index = state.selectedItems.indexOf(itemId);
      if (index > -1) {
        state.selectedItems.splice(index, 1);
      } else {
        state.selectedItems.push(itemId);
      }
    },
    
    clearSelection: (state) => {
      state.selectedItems = [];
    },

    // Theme actions
    setTheme: (state, action: PayloadAction<'light' | 'dark' | 'system'>) => {
      state.theme = action.payload;
    },
    
    toggleCompactMode: (state) => {
      state.compactMode = !state.compactMode;
    },
  },
});

export const {
  toggleSidebar,
  setSidebarCollapsed,
  setActiveSection,
  openDrawer,
  closeDrawer,
  updateDrawerData,
  openModal,
  closeModal,
  addNotification,
  removeNotification,
  hideNotification,
  clearNotifications,
  setGlobalLoading,
  setPageLoading,
  setCurrentPage,
  setBreadcrumbs,
  setFilters,
  updateFilter,
  clearFilters,
  setSearchQuery,
  setSelectedItems,
  toggleItemSelection,
  clearSelection,
  setTheme,
  toggleCompactMode,
} = uiSlice.actions;

export default uiSlice.reducer;
