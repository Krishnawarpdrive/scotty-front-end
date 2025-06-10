
export interface DataTableColumn<T> {
  id: string;
  header: string;
  accessorKey: string;
  width?: string;
  sortable?: boolean;
  enableSorting?: boolean;
  enableFiltering?: boolean;
  cell?: (item: T) => React.ReactNode;
}

export interface DataTableProps<T> {
  data: T[];
  columns: DataTableColumn<T>[];
  onRowClick?: (item: T) => void;
  loading?: boolean;
  emptyMessage?: string;
  searchable?: boolean;
  sortable?: boolean;
  filterable?: boolean;
  filters?: Array<{
    id: string;
    label: string;
    options: Array<{ label: string; value: string }>;
  }>;
  actions?: React.ReactNode;
}
