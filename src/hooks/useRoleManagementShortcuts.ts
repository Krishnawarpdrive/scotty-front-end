
import { useRegisterShortcuts } from './useRegisterShortcuts';
import { KeyboardShortcut } from '@/contexts/KeyboardShortcutsContext';

interface UseRoleManagementShortcutsProps {
  onCreateRole?: () => void;
  onCreateClient?: () => void;
  onExportData?: () => void;
  onImportData?: () => void;
  onSwitchToRoles?: () => void;
  onSwitchToClients?: () => void;
  onSwitchToRequirements?: () => void;
  onSwitchToTAs?: () => void;
}

export const useRoleManagementShortcuts = ({
  onCreateRole,
  onCreateClient,
  onExportData,
  onImportData,
  onSwitchToRoles,
  onSwitchToClients,
  onSwitchToRequirements,
  onSwitchToTAs
}: UseRoleManagementShortcutsProps) => {
  
  const shortcuts: KeyboardShortcut[] = [
    // CRUD Actions
    {
      id: 'role-mgmt-create-role',
      key: 'ctrl+shift+r',
      description: 'Create New Role',
      category: 'crud',
      action: () => onCreateRole?.(),
      scope: 'role-management'
    },
    {
      id: 'role-mgmt-create-client',
      key: 'ctrl+shift+c',
      description: 'Create New Client',
      category: 'crud',
      action: () => onCreateClient?.(),
      scope: 'role-management'
    },

    // Tab Navigation
    {
      id: 'role-mgmt-tab-roles',
      key: '1',
      description: 'Switch to Roles Tab',
      category: 'navigation',
      action: () => onSwitchToRoles?.(),
      scope: 'role-management'
    },
    {
      id: 'role-mgmt-tab-clients',
      key: '2',
      description: 'Switch to Clients Tab',
      category: 'navigation',
      action: () => onSwitchToClients?.(),
      scope: 'role-management'
    },
    {
      id: 'role-mgmt-tab-requirements',
      key: '3',
      description: 'Switch to Requirements Tab',
      category: 'navigation',
      action: () => onSwitchToRequirements?.(),
      scope: 'role-management'
    },
    {
      id: 'role-mgmt-tab-tas',
      key: '4',
      description: 'Switch to TAs Tab',
      category: 'navigation',
      action: () => onSwitchToTAs?.(),
      scope: 'role-management'
    },

    // Data Operations
    {
      id: 'role-mgmt-export',
      key: 'ctrl+e',
      description: 'Export Data',
      category: 'actions',
      action: () => onExportData?.(),
      scope: 'role-management'
    },
    {
      id: 'role-mgmt-import',
      key: 'ctrl+i',
      description: 'Import Data',
      category: 'actions',
      action: () => onImportData?.(),
      scope: 'role-management'
    },

    // G Mode shortcuts for role management
    {
      id: 'g-role-mgmt-create-role',
      key: 'g+n',
      description: 'Create New Role',
      category: 'crud',
      action: () => onCreateRole?.(),
      scope: 'role-management',
      hint: 'N'
    },
    {
      id: 'g-role-mgmt-export',
      key: 'g+e',
      description: 'Export Current Tab Data',
      category: 'actions',
      action: () => onExportData?.(),
      scope: 'role-management',
      hint: 'E'
    },
    {
      id: 'g-role-mgmt-refresh',
      key: 'g+f',
      description: 'Refresh Data',
      category: 'actions',
      action: () => window.location.reload(),
      scope: 'role-management',
      hint: 'F'
    }
  ];

  useRegisterShortcuts(shortcuts);
};
