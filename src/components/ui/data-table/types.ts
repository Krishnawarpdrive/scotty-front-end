
export interface DataTableColumn<T> {
  id: string;
  header: string;
  accessorKey?: keyof T | ((data: T) => any);
  cell?: (data: T) => React.ReactNode;
  enableSorting?: boolean;
  enableFiltering?: boolean;
  sortable?: boolean;
  filterable?: boolean;
  width?: string;
}
