
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { AGGridTable } from "@/components/ag-grid/AGGridTable";
import { createStandardColumns, commonColumns } from "@/components/ag-grid/utils/columnUtils";
import { candidateColumns } from "@/components/ag-grid/utils/candidateColumnUtils";
import { ColDef } from 'ag-grid-community';
import { EnhancedCandidateProfileDrawer } from "./candidate-profile/EnhancedCandidateProfileDrawer";
import { candidates } from "./data/candidatesData";
import { Candidate } from "./types/CandidateTypes";

export const StandardizedApplicationTable: React.FC = () => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const handleCandidateSelect = (candidateId: string, selected: boolean) => {
    if (selected) {
      setSelectedIds([...selectedIds, candidateId]);
    } else {
      setSelectedIds(selectedIds.filter(id => id !== candidateId));
    }
  };

  const handleSelectAll = (selected: boolean) => {
    if (selected) {
      setSelectedIds(candidates.map(candidate => candidate.id.toString()));
    } else {
      setSelectedIds([]);
    }
  };

  const handleCandidateClick = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setIsDetailsOpen(true);
  };

  const handleRowAction = (action: string, rowData: any) => {
    switch (action) {
      case 'view':
        handleCandidateClick(rowData);
        break;
      default:
        console.log(`Action ${action} for candidate:`, rowData);
    }
  };

  const isSelected = (id: string) => selectedIds.includes(id);

  // Transform candidate data to match AG Grid format
  const transformedCandidates = candidates.map(candidate => ({
    ...candidate,
    id: candidate.id.toString(),
    candidateId: `CND-${candidate.id.toString().padStart(4, '0')}`,
    appliedRoles: [candidate.role],
    experience: {
      years: Math.floor(Math.random() * 10),
      months: Math.floor(Math.random() * 12)
    },
    score: candidate.score || Math.floor(Math.random() * 100),
    assignedTA: {
      name: 'Current User',
      avatar: undefined
    },
    lastUpdated: new Date().toLocaleDateString(),
    nextAction: candidate.stage === 'Phone Screening' ? 'Schedule call' : undefined,
    actionDueDate: candidate.stage === 'Phone Screening' ? 'Today' : undefined
  }));

  // AG Grid column definitions
  const columnDefs: ColDef[] = [
    commonColumns.checkbox(handleCandidateSelect, isSelected),
    candidateColumns.candidateInfo(),
    candidateColumns.appliedRoles(),
    ...createStandardColumns([
      { field: 'source', headerName: 'Source', width: 120 },
    ]),
    candidateColumns.experience(),
    ...createStandardColumns([
      { field: 'stage', headerName: 'Current Stage', width: 140, type: 'status' },
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
    <div className="w-full mt-1">
      <Card className="border shadow-sm">
        <div className="overflow-x-auto">
          <AGGridTable
            title="Applications"
            rowData={transformedCandidates}
            columnDefs={columnDefs}
            totalCount={transformedCandidates.length}
            selectedCount={selectedIds.length}
            onRowClicked={(event) => handleCandidateClick(event.data)}
            height="600px"
          />
        </div>
      </Card>

      <EnhancedCandidateProfileDrawer
        open={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        candidate={selectedCandidate}
      />
    </div>
  );
};
