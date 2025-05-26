
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';

interface CandidateTableHeaderProps {
  selectedCount: number;
  totalCount: number;
  onSelectAll: (selected: boolean) => void;
}

export const CandidateTableHeader: React.FC<CandidateTableHeaderProps> = ({
  selectedCount,
  totalCount,
  onSelectAll,
}) => {
  return (
    <div className="px-4 py-3 border-b bg-gray-50 flex items-center gap-3">
      <Checkbox
        checked={selectedCount === totalCount && totalCount > 0}
        onCheckedChange={onSelectAll}
      />
      <span className="text-sm font-medium text-gray-700">
        Select All ({totalCount} candidates)
      </span>
    </div>
  );
};
