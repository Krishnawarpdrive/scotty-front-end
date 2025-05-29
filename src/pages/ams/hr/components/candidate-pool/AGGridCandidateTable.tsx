
import React from 'react';
import { Card } from "@/components/ui/card";
import { AGGridTable } from "@/components/ag-grid/AGGridTable";
import { createStandardColumns, commonColumns } from "@/components/ag-grid/utils/columnUtils";
import { candidateColumns } from "@/components/ag-grid/utils/candidateColumnUtils";
import { ColDef } from 'ag-grid-community';
import { Candidate } from './CandidateTable';

interface AGGridCandidateTableProps {
  candidates: Candidate[];
  selectedCandidates: string[];
  onCandidateSelect: (candidateId: string, selected: boolean) => void;
  onSelectAll: (selected: boolean) => void;
  onCandidateClick: (candidate: Candidate) => void;
  onQuickAction: (action: string, candidateId: string) => void;
}

export const AGGridCandidateTable: React.FC<AGGridCandidateTableProps> = ({
  candidates,
  selectedCandidates,
  onCandidateSelect,
  onSelectAll,
  onCandidateClick,
  onQuickAction,
}) => {
  const handleRowAction = (action: string, rowData: any) => {
    switch (action) {
      case 'view':
        onCandidateClick(rowData);
        break;
      case 'email':
        onQuickAction('email', rowData.id);
        break;
      case 'call':
        onQuickAction('call', rowData.id);
        break;
      default:
        console.log(`Action ${action} for candidate:`, rowData);
    }
  };

  const isSelected = (id: string) => selectedCandidates.includes(id);

  // AG Grid column definitions
  const columnDefs: ColDef[] = [
    commonColumns.checkbox(onCandidateSelect, isSelected),
    candidateColumns.candidateInfo(),
    candidateColumns.appliedRoles(),
    ...createStandardColumns([
      { field: 'source', headerName: 'Source', width: 120 },
    ]),
    candidateColumns.experience(),
    ...createStandardColumns([
      { field: 'currentStage', headerName: 'Last Stage', width: 140, type: 'status' },
    ]),
    candidateColumns.score(),
    ...createStandardColumns([
      { field: 'status', headerName: 'Status', width: 120, type: 'status' },
    ]),
    candidateColumns.assignedTA(),
    ...createStandardColumns([
      { 
        field: 'nextAction', 
        headerName: 'Next Action', 
        width: 160,
        cellRenderer: (params: any) => {
          if (!params.value) {
            return <span className="text-gray-400 text-sm">No action required</span>;
          }
          return (
            <div className="space-y-1">
              <div className="text-sm font-medium">{params.value}</div>
              {params.data.actionDueDate && (
                <div className="text-xs text-gray-500">Due: {params.data.actionDueDate}</div>
              )}
            </div>
          );
        }
      },
      { field: 'lastUpdated', headerName: 'Last Updated', width: 140, type: 'date' }
    ]),
    commonColumns.actions(handleRowAction)
  ];

  return (
    <Card className="border shadow-sm">
      <div className="overflow-x-auto">
        <AGGridTable
          title="Candidates"
          rowData={candidates}
          columnDefs={columnDefs}
          totalCount={candidates.length}
          selectedCount={selectedCandidates.length}
          onRowClicked={(event) => onCandidateClick(event.data)}
          height="600px"
        />
      </div>
    </Card>
  );
};
