
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
  onSelectAll
}) => {
  const isAllSelected = selectedCount === totalCount && totalCount > 0;
  const isIndeterminate = selectedCount > 0 && selectedCount < totalCount;

  return (
    <div className="flex items-center justify-between p-4 border-b bg-gray-50">
      <div className="flex items-center gap-3">
        <Checkbox
          checked={isAllSelected}
          // For Radix UI checkbox, we use the checked prop with indeterminate state
          // The indeterminate state is handled by passing "indeterminate" as the checked value
          {...(isIndeterminate && { checked: "indeterminate" })}
          onCheckedChange={(checked) => onSelectAll(!!checked)}
        />
        <span className="text-sm text-gray-600">
          {selectedCount > 0 
            ? `${selectedCount} of ${totalCount} selected`
            : `${totalCount} candidates`
          }
        </span>
      </div>
      {selectedCount > 0 && (
        <div className="text-sm text-blue-600 font-medium">
          Bulk actions available
        </div>
      )}
    </div>
  );
};
