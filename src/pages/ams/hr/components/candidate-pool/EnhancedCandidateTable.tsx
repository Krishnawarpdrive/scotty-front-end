
import React, { useState } from 'react';
import { DataTable } from '@/components/ui/data-table/DataTable';
import { CandidateTableHeader } from './table/CandidateTableHeader';
import { useEnhancedTableColumns } from './table/enhancedTableColumns';
import { EnhancedCandidateProfileDrawer } from './profile-drawer/EnhancedCandidateProfileDrawer';
import { Candidate } from './CandidateTable';

interface EnhancedCandidateTableProps {
  candidates: Candidate[];
  selectedCandidates: string[];
  onCandidateSelect: (candidateId: string, selected: boolean) => void;
  onSelectAll: (selected: boolean) => void;
  onQuickAction: (action: string, candidateId: string) => void;
}

export const EnhancedCandidateTable: React.FC<EnhancedCandidateTableProps> = ({
  candidates,
  selectedCandidates,
  onCandidateSelect,
  onSelectAll,
  onQuickAction,
}) => {
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleCandidateClick = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setIsProfileOpen(true);
  };

  const columns = useEnhancedTableColumns({
    selectedCandidates,
    onCandidateSelect,
    onCandidateClick: handleCandidateClick,
    onQuickAction,
  });

  return (
    <>
      <div className="bg-white rounded-lg border overflow-hidden">
        <CandidateTableHeader
          selectedCount={selectedCandidates.length}
          totalCount={candidates.length}
          onSelectAll={onSelectAll}
        />

        <DataTable
          data={candidates}
          columns={columns}
          onRowClick={handleCandidateClick}
        />
      </div>

      <EnhancedCandidateProfileDrawer
        open={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        candidate={selectedCandidate}
      />
    </>
  );
};
