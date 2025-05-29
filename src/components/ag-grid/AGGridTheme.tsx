
import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { ColDef, GridOptions } from 'ag-grid-community';

interface AGGridThemeProps {
  rowData: any[];
  columnDefs: ColDef[];
  gridOptions?: GridOptions;
  onRowClicked?: (event: any) => void;
  onSelectionChanged?: (event: any) => void;
  className?: string;
}

export const AGGridTheme: React.FC<AGGridThemeProps> = ({
  rowData,
  columnDefs,
  gridOptions = {},
  onRowClicked,
  onSelectionChanged,
  className = ""
}) => {
  const defaultGridOptions: GridOptions = {
    pagination: true,
    paginationPageSize: 20,
    paginationPageSizeSelector: [10, 20, 50, 100],
    rowSelection: 'multiple',
    suppressRowClickSelection: true,
    enableRangeSelection: true,
    animateRows: true,
    ...gridOptions
  };

  return (
    <div className={`ag-theme-alpine ${className}`} style={{ height: '600px', width: '100%' }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        gridOptions={defaultGridOptions}
        onRowClicked={onRowClicked}
        onSelectionChanged={onSelectionChanged}
        domLayout="normal"
      />
    </div>
  );
};
