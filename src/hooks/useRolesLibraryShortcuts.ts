
import { useRegisterShortcuts } from './useRegisterShortcuts';
import { KeyboardShortcut } from '@/contexts/KeyboardShortcutsContext';

interface UseRolesLibraryShortcutsProps {
  onCreateRole?: () => void;
  onCreateGlobalRole?: () => void;
  onToggleFilters?: () => void;
  onExportRoles?: () => void;
  onImportRoles?: () => void;
  onFocusSearch?: () => void;
}

export const useRolesLibraryShortcuts = ({
  onCreateRole,
  onCreateGlobalRole,
  onToggleFilters,
  onExportRoles,
  onImportRoles,
  onFocusSearch
}: UseRolesLibraryShortcutsProps) => {
  
  const shortcuts: KeyboardShortcut[] = [
    // CRUD Actions
    {
      id: 'roles-lib-create-role',
      key: 'ctrl+shift+r',
      description: 'Create New Role Template',
      category: 'crud',
      action: () => onCreateRole?.(),
      scope: 'roles-library'
    },
    {
      id: 'roles-lib-create-global-role',
      key: 'ctrl+shift+g',
      description: 'Create New Global Role',
      category: 'crud',
      action: () => onCreateGlobalRole?.(),
      scope: 'roles-library'
    },

    // Search and Filters
    {
      id: 'roles-lib-toggle-filters',
      key: 'ctrl+f',
      description: 'Toggle Filters',
      category: 'search',
      action: () => onToggleFilters?.(),
      scope: 'roles-library'
    },

    // Data Operations
    {
      id: 'roles-lib-export',
      key: 'ctrl+e',
      description: 'Export Roles',
      category: 'actions',
      action: () => onExportRoles?.(),
      scope: 'roles-library'
    },
    {
      id: 'roles-lib-import',
      key: 'ctrl+i',
      description: 'Import Roles',
      category: 'actions',
      action: () => onImportRoles?.(),
      scope: 'roles-library'
    },

    // G Mode shortcuts
    {
      id: 'g-roles-lib-create',
      key: 'g+n',
      description: 'Create New Global Role',
      category: 'crud',
      action: () => onCreateGlobalRole?.(),
      scope: 'roles-library',
      hint: 'N'
    },
    {
      id: 'g-roles-lib-search',
      key: 'g+s',
      description: 'Focus Search',
      category: 'search',
      action: () => onFocusSearch?.(),
      scope: 'roles-library',
      hint: 'S'
    },
    {
      id: 'g-roles-lib-filters',
      key: 'g+f',
      description: 'Toggle Filters',
      category: 'search',
      action: () => onToggleFilters?.(),
      scope: 'roles-library',
      hint: 'F'
    }
  ];

  useRegisterShortcuts(shortcuts);
};
