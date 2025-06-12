
export interface DataTableColumn<T> {
  id: string;
  header: string;
  accessorKey?: keyof T;
  enableSorting?: boolean;
  enableFiltering?: boolean;
  cell?: (value: T) => React.ReactNode;
  width?: string;
}

export interface DataTableProps<T> {
  data: T[];
  columns: DataTableColumn<T>[];
  onRowClick?: (item: T) => void;
  loading?: boolean;
  emptyMessage?: string;
  searchable?: boolean;
  actions?: React.ReactNode;
}
