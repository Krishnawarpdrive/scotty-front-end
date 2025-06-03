
import React, { useState } from 'react';
import { DataTable } from '@/components/ui/data-table/DataTable';
import { CandidateTableHeader } from './table/CandidateTableHeader';
import { useTableColumns } from './table/tableColumns';
import { CandidateDetailDrawer } from './CandidateDetailDrawer';
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
  const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const handleCandidateClick = (candidate: Candidate) => {
    setSelectedCandidateId(candidate.id);
    setIsDetailOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDetailOpen(false);
    setSelectedCandidateId(null);
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

      <CandidateDetailDrawer
        open={isDetailOpen}
        onClose={handleCloseDrawer}
        candidateId={selectedCandidateId}
      />
    </>
  );
};
