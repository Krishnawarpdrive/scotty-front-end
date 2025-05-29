
import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ColDef } from 'ag-grid-community';
import { AGGridTheme } from "@/components/ag-grid/AGGridTheme";
import { AGGridTableControls } from "@/components/ag-grid/AGGridTableControls";
import { CheckboxCellRenderer } from "@/components/ag-grid/cell-renderers/CheckboxCellRenderer";
import { CandidateAvatarCellRenderer } from "@/components/ag-grid/cell-renderers/CandidateAvatarCellRenderer";
import { StatusBadgeCellRenderer } from "@/components/ag-grid/cell-renderers/StatusBadgeCellRenderer";
import { ActionsCellRenderer } from "@/components/ag-grid/cell-renderers/ActionsCellRenderer";
import { EnhancedCandidateProfileDrawer } from "../candidate-profile/EnhancedCandidateProfileDrawer";
import { EnhancedTableFilters } from "./EnhancedTableFilters";
import { EnhancedBulkActions } from "./EnhancedBulkActions";
import { candidates } from "../data/candidatesData";
import { Candidate } from "../types/CandidateTypes";

interface TableFilters {
  stage: string;
  priority: string;
  status: string;
}

export const EnhancedAGGridApplicationTable: React.FC = () => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<TableFilters>({
    stage: 'all',
    priority: 'all',
    status: 'all'
  });

  const columnDefs: ColDef[] = useMemo(() => [
    {
      headerName: '',
      field: 'select',
      width: 50,
      checkboxSelection: false,
      headerCheckboxSelection: false,
      cellRenderer: CheckboxCellRenderer,
      cellRendererParams: {
        onSelectionChanged: (id: string, selected: boolean) => {
          const numId = parseInt(id);
          if (selected) {
            setSelectedIds(prev => [...prev, numId]);
          } else {
            setSelectedIds(prev => prev.filter(selectedId => selectedId !== numId));
          }
        },
        isSelected: (params: any) => selectedIds.includes(params.data.id)
      },
      suppressMenu: true,
      sortable: false,
      filter: false,
      pinned: 'left'
    },
    {
      headerName: 'Candidate',
      field: 'candidate',
      flex: 2,
      cellRenderer: CandidateAvatarCellRenderer,
      sortable: true,
      filter: 'agTextColumnFilter'
    },
    {
      headerName: 'Score',
      field: 'score',
      width: 80,
      cellRenderer: (params: any) => (
        <div className="flex items-center justify-center h-full">
          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
            <span className="text-xs font-semibold text-green-700">
              {params.value || 0}
            </span>
          </div>
        </div>
      ),
      sortable: true,
      filter: 'agNumberColumnFilter'
    },
    {
      headerName: 'Role',
      field: 'role',
      flex: 1,
      cellRenderer: (params: any) => (
        <div className="flex flex-col py-2">
          <span className="font-medium text-sm">{params.value}</span>
          <span className="text-xs text-gray-500">{params.data.priority}</span>
        </div>
      ),
      sortable: true,
      filter: 'agTextColumnFilter'
    },
    {
      headerName: 'Stage',
      field: 'currentStage',
      width: 120,
      cellRenderer: (params: any) => {
        const stage = params.value || 1;
        const totalStages = params.data.totalStages || 6;
        return (
          <div className="flex items-center gap-1 h-full">
            {Array.from({ length: totalStages }, (_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full ${
                  i < stage ? 'bg-[#009933]' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        );
      },
      sortable: true,
      filter: 'agNumberColumnFilter'
    },
    {
      headerName: 'Status',
      field: 'status',
      width: 120,
      cellRenderer: StatusBadgeCellRenderer,
      sortable: true,
      filter: 'agSetColumnFilter'
    },
    {
      headerName: 'Time in Stage',
      field: 'timeInStage',
      width: 120,
      cellRenderer: (params: any) => (
        <div className="flex items-center text-sm text-gray-600 h-full">
          {params.value || '0d'}
        </div>
      ),
      sortable: true,
      filter: 'agTextColumnFilter'
    },
    {
      headerName: 'Actions',
      field: 'actions',
      width: 100,
      cellRenderer: ActionsCellRenderer,
      cellRendererParams: {
        onRowAction: (action: string, rowData: any) => {
          if (action === 'view') {
            handleCandidateClick(rowData);
          }
        }
      },
      suppressMenu: true,
      sortable: false,
      filter: false,
      pinned: 'right'
    }
  ], [selectedIds]);

  const handleCandidateClick = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setIsDetailsOpen(true);
  };

  const handleBulkAction = (action: string) => {
    console.log(`Bulk action: ${action} for candidates:`, selectedIds);
  };

  const handleExport = () => {
    console.log('Exporting data...');
  };

  return (
    <motion.div 
      className="w-full mt-1"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Enhanced Header Controls */}
      <AGGridTableControls
        title="Applications"
        totalCount={candidates.length}
        selectedCount={selectedIds.length}
        isFilterOpen={isFilterOpen}
        onToggleFilter={() => setIsFilterOpen(!isFilterOpen)}
        onExport={handleExport}
        additionalActions={
          <EnhancedBulkActions 
            selectedCount={selectedIds.length}
            onBulkAction={handleBulkAction}
          />
        }
      />

      {/* Filters Panel */}
      <EnhancedTableFilters
        isOpen={isFilterOpen}
        filters={filters}
        onFiltersChange={setFilters}
      />

      {/* AG Grid Table */}
      <div className="bg-white rounded-b-md shadow-sm border border-gray-200 overflow-hidden">
        <AGGridTheme
          rowData={candidates}
          columnDefs={columnDefs}
          onRowClicked={(event) => handleCandidateClick(event.data)}
          className="ag-theme-rubik"
        />
      </div>

      <EnhancedCandidateProfileDrawer 
        open={isDetailsOpen} 
        onClose={() => setIsDetailsOpen(false)}
        candidate={selectedCandidate}
      />
    </motion.div>
  );
};
