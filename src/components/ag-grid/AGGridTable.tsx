
import React, { useMemo, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ColDef, GridOptions, SelectionChangedEvent, RowClickedEvent } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import './ag-grid-theme.css';
import { AGGridTableControls } from './AGGridTableControls';
import { motion } from 'framer-motion';

interface AGGridTableProps {
  // Data
  rowData: any[];
  columnDefs: ColDef[];
  
  // Table Controls
  title: string;
  totalCount?: number;
  selectedCount?: number;
  
  // Grid Configuration
  gridOptions?: Partial<GridOptions>;
  height?: string;
  className?: string;
  
  // Event Handlers
  onRowClicked?: (event: RowClickedEvent) => void;
  onSelectionChanged?: (event: SelectionChangedEvent) => void;
  onExport?: () => void;
  
  // Filter Controls
  isFilterOpen?: boolean;
  onToggleFilter?: () => void;
  additionalActions?: React.ReactNode;
  
  // Loading State
  loading?: boolean;
  
  // Pagination
  serverSidePagination?: boolean;
  paginationPageSize?: number;
  paginationPageSizeSelector?: number[];
}

export const AGGridTable: React.FC<AGGridTableProps> = ({
  rowData,
  columnDefs,
  title,
  totalCount = 0,
  selectedCount = 0,
  gridOptions = {},
  height = '600px',
  className = '',
  onRowClicked,
  onSelectionChanged,
  onExport,
  isFilterOpen = false,
  onToggleFilter,
  additionalActions,
  loading = false,
  serverSidePagination = false,
  paginationPageSize = 20,
  paginationPageSizeSelector = [10, 20, 50, 100]
}) => {
  const defaultGridOptions: GridOptions = useMemo(() => ({
    pagination: true,
    paginationPageSize,
    paginationPageSizeSelector,
    rowSelection: 'multiple',
    suppressRowClickSelection: true,
    enableRangeSelection: true,
    animateRows: true,
    suppressCellFocus: true,
    headerHeight: 48,
    rowHeight: 60,
    domLayout: 'normal',
    ...gridOptions
  }), [gridOptions, paginationPageSize, paginationPageSizeSelector]);

  const handleRowClicked = useCallback((event: RowClickedEvent) => {
    onRowClicked?.(event);
  }, [onRowClicked]);

  const handleSelectionChanged = useCallback((event: SelectionChangedEvent) => {
    onSelectionChanged?.(event);
  }, [onSelectionChanged]);

  const handleToggleFilter = useCallback(() => {
    onToggleFilter?.();
  }, [onToggleFilter]);

  return (
    <motion.div 
      className="space-y-0"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <AGGridTableControls
        title={title}
        totalCount={totalCount}
        selectedCount={selectedCount}
        isFilterOpen={isFilterOpen}
        onToggleFilter={handleToggleFilter}
        onExport={onExport}
        additionalActions={additionalActions}
      />
      
      <div 
        className={`ag-theme-rubik ${className}`} 
        style={{ height, width: '100%' }}
      >
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          gridOptions={defaultGridOptions}
          onRowClicked={handleRowClicked}
          onSelectionChanged={handleSelectionChanged}
          loading={loading}
          loadingOverlayComponent={() => (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#009933]"></div>
            </div>
          )}
        />
      </div>
    </motion.div>
  );
};
