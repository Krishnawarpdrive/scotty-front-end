
import { useRegisterShortcuts } from './useRegisterShortcuts';
import { KeyboardShortcut } from '@/contexts/KeyboardShortcutsContext';

interface UseCandidatePoolShortcutsProps {
  onAddCandidate?: () => void;
  onAdvancedFilters?: () => void;
  onExport?: () => void;
  onImport?: () => void;
}

export const useCandidatePoolShortcuts = ({
  onAddCandidate,
  onAdvancedFilters,
  onExport,
  onImport
}: UseCandidatePoolShortcutsProps) => {
  const shortcuts: KeyboardShortcut[] = [
    {
      id: 'candidate-add',
      key: 'ctrl+n',
      description: 'Add New Candidate',
      category: 'actions',
      action: () => onAddCandidate?.(),
      scope: 'candidate-pool'
    },
    {
      id: 'candidate-filters',
      key: 'ctrl+f',
      description: 'Open Advanced Filters',
      category: 'search',
      action: () => onAdvancedFilters?.(),
      scope: 'candidate-pool'
    },
    {
      id: 'candidate-export',
      key: 'ctrl+e',
      description: 'Export Candidates',
      category: 'actions',
      action: () => onExport?.(),
      scope: 'candidate-pool'
    },
    {
      id: 'candidate-import',
      key: 'ctrl+i',
      description: 'Import Candidates',
      category: 'actions',
      action: () => onImport?.(),
      scope: 'candidate-pool'
    },
    {
      id: 'select-all',
      key: 'ctrl+a',
      description: 'Select All Candidates',
      category: 'actions',
      action: () => {
        // Focus on the select all checkbox if available
        const selectAllCheckbox = document.querySelector('input[type="checkbox"][aria-label*="select" i]') as HTMLInputElement;
        if (selectAllCheckbox) {
          selectAllCheckbox.click();
        }
      },
      scope: 'candidate-pool'
    }
  ];

  useRegisterShortcuts(shortcuts);
};
