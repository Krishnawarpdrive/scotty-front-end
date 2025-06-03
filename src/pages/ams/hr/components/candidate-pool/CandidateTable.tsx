
import React, { useState } from 'react';
import { DataTable } from '@/components/ui/data-table/DataTable';
import { CandidateTableHeader } from './table/CandidateTableHeader';
import { useTableColumns } from './table/tableColumns';
import { CandidateDetailDrawer } from './CandidateDetailDrawer';

export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone?: string;
  currentStage: string;
  source: string;
  status: 'Active' | 'On Hold' | 'Rejected' | 'Hired';
  appliedRoles: string[];
  experience?: string;
  experienceYears?: number;
  score?: number;
  assignedTA?: string;
  nextAction?: string;
  actionDueDate?: string;
  lastUpdated: string;
  skills?: string[];
  currentRole?: string;
  currentCompany?: string;
  location?: string;
  appliedDate?: string;
  resumeUrl?: string;
  notes?: string;
}

interface CandidateTableProps {
  candidates: Candidate[];
  selectedCandidates: string[];
  onCandidateSelect: (candidateId: string, selected: boolean) => void;
  onSelectAll: (selected: boolean) => void;
  onQuickAction: (action: string, candidateId: string) => void;
}

export const CandidateTable: React.FC<CandidateTableProps> = ({
  candidates,
  selectedCandidates,
  onCandidateSelect,
  onSelectAll,
  onQuickAction,
}) => {
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const handleCandidateClick = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setIsDetailOpen(true);
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
        onClose={() => setIsDetailOpen(false)}
        candidate={selectedCandidate}
      />
    </>
  );
};
