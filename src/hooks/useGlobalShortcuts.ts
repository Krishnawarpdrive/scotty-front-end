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
      id: 'g-dashboard',
      key: 'g+d',
      description: 'Go to Dashboard',
      category: 'navigation',
      action: () => navigate('/ams/dashboard'),
      scope: 'global',
      hint: 'D'
    },
    {
      id: 'g-hr-dashboard',
      key: 'g+h',
      description: 'Go to HR Dashboard',
      category: 'navigation',
      action: () => navigate('/ams/hr/dashboard'),
      scope: 'global',
      hint: 'H'
    },
    {
      id: 'g-candidate-pool',
      key: 'g+c',
      description: 'Go to Candidate Pool',
      category: 'navigation',
      action: () => navigate('/ams/hr/candidate-pool'),
      scope: 'global',
      hint: 'C'
    },
    {
      id: 'g-role-management',
      key: 'g+r',
      description: 'Go to Role Management',
      category: 'navigation',
      action: () => navigate('/ams/hr/role-management'),
      scope: 'global',
      hint: 'R'
    },
    {
      id: 'g-ta-mission-control',
      key: 'g+t',
      description: 'Go to TA Mission Control',
      category: 'navigation',
      action: () => navigate('/ams/ta/mission-control'),
      scope: 'global',
      hint: 'T'
    },
    {
      id: 'g-roles-library',
      key: 'g+l',
      description: 'Go to Roles Library',
      category: 'navigation',
      action: () => navigate('/ams/roles'),
      scope: 'global',
      hint: 'L'
    },
    {
      id: 'g-clients',
      key: 'g+x',
      description: 'Go to Clients',
      category: 'navigation',
      action: () => navigate('/ams/clients'),
      scope: 'global',
      hint: 'X'
    },
    {
      id: 'g-skills',
      key: 'g+s',
      description: 'Go to Skills Library',
      category: 'navigation',
      action: () => navigate('/ams/skills'),
      scope: 'global',
      hint: 'S'
    },

    {
      id: 'quick-search',
      key: 'ctrl+k',
      description: 'Quick Search',
      category: 'search',
      action: () => {
        const searchInput = document.querySelector('input[placeholder*="search" i], input[placeholder*="Search" i]') as HTMLInputElement;
        if (searchInput) {
          searchInput.focus();
          searchInput.select();
        }
      },
      scope: 'global'
    },
    {
      id: 'global-search',
      key: '/',
      description: 'Focus Search',
      category: 'search',
      action: () => {
        const searchInput = document.querySelector('input[type="search"], input[placeholder*="search" i]') as HTMLInputElement;
        if (searchInput) {
          searchInput.focus();
          searchInput.select();
        }
      },
      scope: 'global'
    },

    {
      id: 'select-all',
      key: 'ctrl+a',
      description: 'Select All Items',
      category: 'actions',
      action: () => {
        const selectAllCheckbox = document.querySelector('input[type="checkbox"][aria-label*="select all" i]') as HTMLInputElement;
        if (selectAllCheckbox) {
          selectAllCheckbox.click();
        }
      },
      scope: 'global'
    }
  ];

  useRegisterShortcuts(shortcuts);
};
