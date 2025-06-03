
import React from 'react';
import { DataTableColumn } from '@/components/ui/data-table/types';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Candidate } from '../CandidateTable';
import { CandidateCell } from './CandidateCell';
import { EnhancedAppliedRolesCell } from './EnhancedAppliedRolesCell';
import { ExperienceCell } from './ExperienceCell';
import { ScoreCell } from './ScoreCell';
import { StatusCell } from './StatusCell';
import { AssignedTACell } from './AssignedTACell';
import { NextActionCell } from './NextActionCell';
import { ActionsCell } from './ActionsCell';
import { ReasonCell } from './ReasonCell';

interface UseEnhancedTableColumnsProps {
  selectedCandidates: string[];
  onCandidateSelect: (candidateId: string, selected: boolean) => void;
  onCandidateClick: (candidate: Candidate) => void;
  onQuickAction: (action: string, candidateId: string) => void;
}

export const useEnhancedTableColumns = ({
  selectedCandidates,
  onCandidateSelect,
  onCandidateClick,
  onQuickAction,
}: UseEnhancedTableColumnsProps): DataTableColumn<Candidate>[] => {
  return [
    {
      id: 'select',
      header: '',
      cell: (candidate) => (
        <Checkbox
          checked={selectedCandidates.includes(candidate.id)}
          onCheckedChange={(checked) => onCandidateSelect(candidate.id, !!checked)}
        />
      ),
      width: '50px',
    },
    {
      id: 'candidate',
      header: 'Candidate',
      cell: (candidate) => <CandidateCell candidate={candidate} />,
      enableSorting: true,
      enableFiltering: true,
    },
    {
      id: 'appliedRoles',
      header: 'Applied Roles',
      cell: (candidate) => <EnhancedAppliedRolesCell candidate={candidate} />,
      enableFiltering: true,
    },
    {
      id: 'source',
      header: 'Source',
      accessorKey: 'source',
      enableSorting: true,
      enableFiltering: true,
    },
    {
      id: 'experience',
      header: 'Experience',
      cell: (candidate) => <ExperienceCell candidate={candidate} />,
      enableSorting: true,
      enableFiltering: true,
    },
    {
      id: 'lastStage',
      header: 'Current Stage',
      cell: (candidate) => (
        <Badge variant="outline" className="text-xs">
          {candidate.currentStage}
        </Badge>
      ),
      enableSorting: true,
      enableFiltering: true,
    },
    {
      id: 'score',
      header: 'Score',
      cell: (candidate) => <ScoreCell candidate={candidate} />,
      enableSorting: true,
    },
    {
      id: 'status',
      header: 'Status',
      cell: (candidate) => <StatusCell candidate={candidate} />,
      enableSorting: true,
      enableFiltering: true,
    },
    {
      id: 'assignedTA',
      header: 'Assigned TA',
      cell: (candidate) => <AssignedTACell candidate={candidate} />,
      enableFiltering: true,
    },
    {
      id: 'reason',
      header: 'Reason/Alert',
      cell: (candidate) => <ReasonCell candidate={candidate} />,
      enableFiltering: true,
    },
    {
      id: 'nextAction',
      header: 'Next Action',
      cell: (candidate) => <NextActionCell candidate={candidate} />,
    },
    {
      id: 'lastUpdated',
      header: 'Last Updated',
      cell: (candidate) => (
        <span className="text-sm text-gray-600">{candidate.lastUpdated}</span>
      ),
      enableSorting: true,
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: (candidate) => (
        <ActionsCell
          candidate={candidate}
          onCandidateClick={onCandidateClick}
          onQuickAction={onQuickAction}
        />
      ),
    },
  ];
};
