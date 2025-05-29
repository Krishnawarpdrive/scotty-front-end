import { ColDef } from 'ag-grid-community';
import { StatusBadgeCellRenderer } from '../cell-renderers/StatusBadgeCellRenderer';
import { ActionsCellRenderer } from '../cell-renderers/ActionsCellRenderer';
import { CheckboxCellRenderer } from '../cell-renderers/CheckboxCellRenderer';

export interface ColumnConfig {
  field: string;
  headerName: string;
  width?: number;
  minWidth?: number;
  maxWidth?: number;
  type?: 'text' | 'number' | 'date' | 'status' | 'actions' | 'checkbox';
  sortable?: boolean;
  filter?: boolean;
  resizable?: boolean;
  pinned?: 'left' | 'right';
  cellRenderer?: any;
  cellRendererParams?: any;
  valueFormatter?: (params: any) => string;
  comparator?: (valueA: any, valueB: any) => number;
}

export const createColumnDef = (config: ColumnConfig): ColDef => {
  const {
    field,
    headerName,
    width = 150,
    minWidth = 100,
    maxWidth,
    type = 'text',
    sortable = true,
    filter = true,
    resizable = true,
    pinned,
    cellRenderer,
    cellRendererParams,
    valueFormatter,
    comparator
  } = config;

  const baseColDef: ColDef = {
    field,
    headerName,
    width,
    minWidth,
    maxWidth,
    sortable,
    filter,
    resizable,
    pinned,
    valueFormatter,
    comparator
  };

  // Apply type-specific configurations
  switch (type) {
    case 'status':
      return {
        ...baseColDef,
        cellRenderer: StatusBadgeCellRenderer,
        width: 120,
        ...cellRendererParams && { cellRendererParams }
      };
    
    case 'actions':
      return {
        ...baseColDef,
        cellRenderer: ActionsCellRenderer,
        width: 100,
        sortable: false,
        filter: false,
        pinned: 'right',
        ...cellRendererParams && { cellRendererParams }
      };
    
    case 'checkbox':
      return {
        ...baseColDef,
        cellRenderer: CheckboxCellRenderer,
        width: 60,
        sortable: false,
        filter: false,
        pinned: 'left',
        headerCheckboxSelection: false,
        checkboxSelection: false,
        ...cellRendererParams && { cellRendererParams }
      };
    
    case 'number':
      return {
        ...baseColDef,
        filter: 'agNumberColumnFilter',
        type: 'numericColumn'
      };
    
    case 'date':
      return {
        ...baseColDef,
        filter: 'agDateColumnFilter',
        valueFormatter: (params) => {
          if (!params.value) return '';
          return new Date(params.value).toLocaleDateString();
        }
      };
    
    default:
      return {
        ...baseColDef,
        filter: 'agTextColumnFilter'
      };
  }
};

export const createStandardColumns = (configs: ColumnConfig[]): ColDef[] => {
  return configs.map(createColumnDef);
};

// Common column templates
export const commonColumns = {
  checkbox: (onSelectionChanged: (id: string, selected: boolean) => void, isSelected: (id: string) => boolean): ColDef => 
    createColumnDef({
      field: 'select',
      headerName: '',
      type: 'checkbox',
      cellRendererParams: { onSelectionChanged, isSelected }
    }),
  
  actions: (onRowAction: (action: string, rowData: any) => void): ColDef =>
    createColumnDef({
      field: 'actions',
      headerName: 'Actions',
      type: 'actions',
      cellRendererParams: { onRowAction }
    }),
  
  status: (field: string = 'status', headerName: string = 'Status'): ColDef =>
    createColumnDef({
      field,
      headerName,
      type: 'status'
    }),
  
  name: (field: string = 'name', headerName: string = 'Name', width: number = 200): ColDef =>
    createColumnDef({
      field,
      headerName,
      width,
      pinned: 'left'
    }),
  
  date: (field: string, headerName: string, width: number = 150): ColDef =>
    createColumnDef({
      field,
      headerName,
      type: 'date',
      width
    })
};
