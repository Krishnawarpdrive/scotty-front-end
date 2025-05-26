
import React from 'react';
import { DataTable } from '@/components/ui/data-table/DataTable';
import { CandidateTableHeader } from './table/CandidateTableHeader';
import { useTableColumns } from './table/tableColumns';

export interface Candidate {
  id: string;
  name: string;
  candidateId: string;
  avatar?: string;
  email: string;
  phone: string;
  type: 'Fresher' | 'Experienced';
  source: string;
  appliedRoles: string[];
  currentStage: string;
  score: number;
  status: 'Active' | 'On Hold' | 'Rejected' | 'Hired' | 'Withdrawn';
  assignedTA: {
    name: string;
    avatar?: string;
  };
  lastUpdated: string;
  priority: 'High' | 'Medium' | 'Low';
  nextAction?: string;
  actionDueDate?: string;
  experience: {
    years: number;
    months: number;
  };
}

interface CandidateTableProps {
  candidates: Candidate[];
  selectedCandidates: string[];
  onCandidateSelect: (candidateId: string, selected: boolean) => void;
  onSelectAll: (selected: boolean) => void;
  onCandidateClick: (candidate: Candidate) => void;
  onQuickAction: (action: string, candidateId: string) => void;
}

export const CandidateTable: React.FC<CandidateTableProps> = ({
  candidates,
  selectedCandidates,
  onCandidateSelect,
  onSelectAll,
  onCandidateClick,
  onQuickAction,
}) => {
  const columns = useTableColumns({
    selectedCandidates,
    onCandidateSelect,
    onCandidateClick,
    onQuickAction,
  });

  return (
    <div className="bg-white rounded-lg border overflow-hidden">
      <CandidateTableHeader
        selectedCount={selectedCandidates.length}
        totalCount={candidates.length}
        onSelectAll={onSelectAll}
      />

      <DataTable
        data={candidates}
        columns={columns}
        onRowClick={onCandidateClick}
      />
    </div>
  );
};
