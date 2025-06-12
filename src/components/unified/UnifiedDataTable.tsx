
import React, { useState, useMemo } from 'react';
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
  const [searchQuery, setSearchQuery] = useState('');

  // Filter data based on search query
  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return data;
    
    return data.filter(item => {
      return columns.some(column => {
        if (column.accessorKey) {
          const value = item[column.accessorKey as keyof T];
          return String(value).toLowerCase().includes(searchQuery.toLowerCase());
        }
        return false;
      });
    });
  }, [data, searchQuery, columns]);

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
