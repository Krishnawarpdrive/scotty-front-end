
import React, { useMemo } from 'react';
import { DataTable } from '@/components/ui/data-table';
import { DataTableColumn } from '@/components/ui/data-table/types';

interface UnifiedDataTableProps<T> {
  data: T[];
  columns: DataTableColumn<T>[];
  onRowClick?: (item: T) => void;
  loading?: boolean;
  emptyMessage?: string;
  searchable?: boolean;
  actions?: React.ReactNode;
}

export function UnifiedDataTable<T extends { id: string }>({
  data,
  columns,
  onRowClick,
  loading = false,
  emptyMessage = "No data available",
  searchable = true,
  actions
}: UnifiedDataTableProps<T>) {
  // For now, we'll just pass the data through without filtering
  // Search functionality can be added later when needed
  const filteredData = useMemo(() => {
    return data;
  }, [data]);

  const handleRowClick = (item: T) => {
    onRowClick?.(item);
  };

  return (
    <DataTable
      data={filteredData}
      columns={columns}
      onRowClick={handleRowClick}
      loading={loading}
      emptyMessage={emptyMessage}
      searchable={searchable}
      actions={actions}
    />
  );
}
