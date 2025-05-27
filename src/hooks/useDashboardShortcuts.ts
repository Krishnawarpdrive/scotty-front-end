
import { useNavigate } from 'react-router-dom';
import { useRegisterShortcuts } from './useRegisterShortcuts';
import { KeyboardShortcut } from '@/contexts/KeyboardShortcutsContext';

export const useDashboardShortcuts = () => {
  const navigate = useNavigate();

  const shortcuts: KeyboardShortcut[] = [
    {
      id: 'dashboard-add-client',
      key: 'ctrl+shift+c',
      description: 'Add New Client',
      category: 'actions',
      action: () => navigate('/ams/clients/create'),
      scope: 'dashboard'
    },
    {
      id: 'dashboard-create-role',
      key: 'ctrl+shift+r',
      description: 'Create New Role',
      category: 'actions',
      action: () => navigate('/ams/roles/create'),
      scope: 'dashboard'
    },
    {
      id: 'dashboard-view-approvals',
      key: 'ctrl+shift+a',
      description: 'View Pending Approvals',
      category: 'navigation',
      action: () => {
        // Navigate to approvals or focus on approvals section
        console.log('Navigating to approvals...');
      },
      scope: 'dashboard'
    }
  ];

  useRegisterShortcuts(shortcuts);
};
