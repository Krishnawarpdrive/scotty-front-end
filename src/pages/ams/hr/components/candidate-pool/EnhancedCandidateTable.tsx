
import React, { useState } from 'react';
import { DataTable } from '@/components/ui/data-table/DataTable';
import { CandidateTableHeader } from './table/CandidateTableHeader';
import { useTableColumns } from './table/tableColumns';
import { EnhancedCandidateProfileDrawer } from './EnhancedCandidateProfileDrawer';
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
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const handleCandidateClick = (candidate: Candidate) => {
    console.log('Opening enhanced candidate profile drawer for:', candidate.name);
    setSelectedCandidate(candidate);
    setIsDetailOpen(true);
  };

  const handleCloseDrawer = () => {
    console.log('Closing enhanced candidate profile drawer');
    setIsDetailOpen(false);
    setSelectedCandidate(null);
  };

  const columns = useTableColumns({
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
        open={isDetailOpen}
        onClose={handleCloseDrawer}
        candidate={selectedCandidate}
      />
    </>
  );
};
