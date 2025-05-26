
import React from 'react';
import { CandidateFilters } from './CandidateFilters';
import { BulkActions } from './BulkActions';
import { CandidateTable, Candidate } from './CandidateTable';
import { FilterState } from './CandidateFilters';

interface CandidatePoolContentProps {
  candidates: Candidate[];
  selectedCandidates: string[];
  showFilters: boolean;
  filters: FilterState;
  onCandidateSelect: (candidateId: string, selected: boolean) => void;
  onSelectAll: (selected: boolean) => void;
  onCandidateClick: (candidate: Candidate) => void;
  onQuickAction: (action: string, candidateId: string) => void;
  onFilterChange: (key: keyof FilterState, value: string[] | string) => void;
  onClearFilter: (key: keyof FilterState) => void;
  onClearAllFilters: () => void;
  onBulkAction: (action: string, options?: any) => void;
  setSelectedCandidates: (candidates: string[]) => void;
}

export const CandidatePoolContent: React.FC<CandidatePoolContentProps> = ({
  candidates,
  selectedCandidates,
  showFilters,
  filters,
  onCandidateSelect,
  onSelectAll,
  onCandidateClick,
  onQuickAction,
  onFilterChange,
  onClearFilter,
  onClearAllFilters,
  onBulkAction,
  setSelectedCandidates,
}) => {
  return (
    <div className="flex-1 overflow-auto">
      <div className="p-6 space-y-6">
        {showFilters && (
          <CandidateFilters
            filters={filters}
            onFilterChange={onFilterChange}
            onClearFilter={onClearFilter}
            onClearAll={onClearAllFilters}
          />
        )}

        <BulkActions
          selectedCount={selectedCandidates.length}
          onAction={onBulkAction}
          onClearSelection={() => setSelectedCandidates([])}
        />

        <CandidateTable
          candidates={candidates}
          selectedCandidates={selectedCandidates}
          onCandidateSelect={onCandidateSelect}
          onSelectAll={onSelectAll}
          onCandidateClick={onCandidateClick}
          onQuickAction={onQuickAction}
        />
      </div>
    </div>
  );
};
