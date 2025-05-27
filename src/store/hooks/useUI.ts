
import { useAppSelector, useAppDispatch } from '../index';
import {
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
} from '../slices/uiSlice';

export const useUI = () => {
  const dispatch = useAppDispatch();
  const uiState = useAppSelector((state) => state.ui);

  // Notification helpers
  const showNotification = (notification: {
    type: 'success' | 'error' | 'warning' | 'info';
    title: string;
    message?: string;
    duration?: number;
  }) => {
    dispatch(addNotification(notification));
    
    // Auto-remove notification after duration
    if (notification.duration !== 0) {
      setTimeout(() => {
        // Find the notification by timestamp since we don't have the ID yet
        const recentNotification = uiState.notifications[uiState.notifications.length - 1];
        if (recentNotification) {
          dispatch(removeNotification(recentNotification.id));
        }
      }, notification.duration || 5000);
    }
  };

  // Drawer helpers
  const openDrawerWithData = (type: string, data?: any, size?: 'sm' | 'md' | 'lg' | 'xl') => {
    dispatch(openDrawer({ type, data, size }));
  };

  const openModalWithData = (type: string, data?: any, size?: 'sm' | 'md' | 'lg' | 'xl') => {
    dispatch(openModal({ type, data, size }));
  };

  return {
    // State
    sidebar: uiState.sidebar,
    drawer: uiState.drawer,
    modal: uiState.modal,
    notifications: uiState.notifications,
    globalLoading: uiState.globalLoading,
    pageLoading: uiState.pageLoading,
    currentPage: uiState.currentPage,
    breadcrumbs: uiState.breadcrumbs,
    filters: uiState.filters,
    searchQuery: uiState.searchQuery,
    selectedItems: uiState.selectedItems,
    theme: uiState.theme,
    compactMode: uiState.compactMode,

    // Actions
    toggleSidebar: () => dispatch(toggleSidebar()),
    setSidebarCollapsed: (collapsed: boolean) => dispatch(setSidebarCollapsed(collapsed)),
    setActiveSection: (section: string | null) => dispatch(setActiveSection(section)),
    
    openDrawer: openDrawerWithData,
    closeDrawer: () => dispatch(closeDrawer()),
    updateDrawerData: (data: any) => dispatch(updateDrawerData(data)),
    
    openModal: openModalWithData,
    closeModal: () => dispatch(closeModal()),
    
    showNotification,
    removeNotification: (id: string) => dispatch(removeNotification(id)),
    hideNotification: (id: string) => dispatch(hideNotification(id)),
    clearNotifications: () => dispatch(clearNotifications()),
    
    setGlobalLoading: (loading: boolean) => dispatch(setGlobalLoading(loading)),
    setPageLoading: (loading: boolean) => dispatch(setPageLoading(loading)),
    
    setCurrentPage: (page: string) => dispatch(setCurrentPage(page)),
    setBreadcrumbs: (breadcrumbs: Array<{ label: string; path?: string }>) => dispatch(setBreadcrumbs(breadcrumbs)),
    
    setFilters: (filters: Record<string, any>) => dispatch(setFilters(filters)),
    updateFilter: (key: string, value: any) => dispatch(updateFilter({ key, value })),
    clearFilters: () => dispatch(clearFilters()),
    
    setSearchQuery: (query: string) => dispatch(setSearchQuery(query)),
    
    setSelectedItems: (items: string[]) => dispatch(setSelectedItems(items)),
    toggleItemSelection: (itemId: string) => dispatch(toggleItemSelection(itemId)),
    clearSelection: () => dispatch(clearSelection()),
    
    setTheme: (theme: 'light' | 'dark' | 'system') => dispatch(setTheme(theme)),
    toggleCompactMode: () => dispatch(toggleCompactMode()),
  };
};
