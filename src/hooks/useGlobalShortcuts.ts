
import { useNavigate } from 'react-router-dom';
import { useRegisterShortcuts } from './useRegisterShortcuts';
import { KeyboardShortcut } from '@/contexts/KeyboardShortcutsContext';

export const useGlobalShortcuts = () => {
  const navigate = useNavigate();

  const shortcuts: KeyboardShortcut[] = [
    {
      id: 'nav-dashboard',
      key: 'ctrl+1',
      description: 'Go to Dashboard',
      category: 'navigation',
      action: () => navigate('/ams/dashboard'),
      scope: 'global'
    },
    {
      id: 'nav-hr-dashboard',
      key: 'ctrl+2',
      description: 'Go to HR Dashboard',
      category: 'navigation',
      action: () => navigate('/ams/hr/dashboard'),
      scope: 'global'
    },
    {
      id: 'nav-candidate-pool',
      key: 'ctrl+3',
      description: 'Go to Candidate Pool',
      category: 'navigation',
      action: () => navigate('/ams/hr/candidate-pool'),
      scope: 'global'
    },
    {
      id: 'nav-role-management',
      key: 'ctrl+4',
      description: 'Go to Role Management',
      category: 'navigation',
      action: () => navigate('/ams/hr/role-management'),
      scope: 'global'
    },
    {
      id: 'nav-ta-mission-control',
      key: 'ctrl+5',
      description: 'Go to TA Mission Control',
      category: 'navigation',
      action: () => navigate('/ams/ta/mission-control'),
      scope: 'global'
    },
    {
      id: 'quick-search',
      key: 'ctrl+k',
      description: 'Quick Search',
      category: 'search',
      action: () => {
        // Focus on search input if available
        const searchInput = document.querySelector('input[placeholder*="search" i], input[placeholder*="Search" i]') as HTMLInputElement;
        if (searchInput) {
          searchInput.focus();
          searchInput.select();
        }
      },
      scope: 'global'
    }
  ];

  useRegisterShortcuts(shortcuts);
};
