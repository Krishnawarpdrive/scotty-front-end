
import React from 'react';
import { DataTable, DataTableColumn } from '@/design-system/components/DataTable/DataTable';
import { SearchFilter } from '@/design-system/components/SearchFilter/SearchFilter';
import { useSearchFilter, useTableSelection } from '@/design-system/hooks/useDesignSystem';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface UnifiedDataTableProps<T extends { id: string }> {
  data: T[];
  columns: DataTableColumn<T>[];
  searchPlaceholder?: string;
  filterOptions?: Array<{
    key: string;
    label: string;
    type: 'select' | 'multiselect';
    options?: Array<{ value: string; label: string }>;
  }>;
  onRowClick?: (item: T) => void;
  onBulkAction?: (action: string, items: T[]) => void;
  bulkActions?: Array<{ key: string; label: string; variant?: 'default' | 'destructive' }>;
  className?: string;
}

export function UnifiedDataTable<T extends { id: string }>({
  data,
  columns,
  searchPlaceholder = 'Search...',
  filterOptions = [],
  onRowClick,
  onBulkAction,
  bulkActions = [],
  className,
}: UnifiedDataTableProps<T>) {
  const { searchParams, updateSearch, updateFilters } = useSearchFilter();
  const { selectedItems, toggleItem, toggleAll, isSelected, isAllSelected, isPartiallySelected, selectedCount } = useTableSelection(data);

  // Filter data based on search and filters
  const filteredData = React.useMemo(() => {
    let result = data;

    // Apply search filter
    if (searchParams.query) {
      result = result.filter(item =>
        Object.values(item).some(value =>
          String(value).toLowerCase().includes(searchParams.query!.toLowerCase())
        )
      );
    }

    // Apply other filters
    if (searchParams.filters) {
      Object.entries(searchParams.filters).forEach(([key, value]) => {
        if (value) {
          result = result.filter(item => {
            const itemValue = (item as any)[key];
            return String(itemValue).toLowerCase().includes(String(value).toLowerCase());
          });
        }
      });
    }

    return result;
  }, [data, searchParams]);

  // Enhanced columns with selection
  const enhancedColumns: DataTableColumn<T>[] = [
    {
      id: 'select',
      header: '',
      width: '50px',
      cell: (item) => (
        <input
          type="checkbox"
          checked={isSelected(item)}
          onChange={() => toggleItem(item)}
          className="rounded border-gray-300"
          onClick={(e) => e.stopPropagation()}
        />
      ),
    },
    ...columns,
  ];

  const handleFilterChange = (key: string, value: any) => {
    updateFilters({ [key]: value });
  };

  return (
    <div className={cn('space-y-6', className)}>
      {/* Search and Filter */}
      <SearchFilter
        searchPlaceholder={searchPlaceholder}
        searchValue={searchParams.query || ''}
        onSearchChange={updateSearch}
        filters={filterOptions}
        activeFilters={searchParams.filters || {}}
        onFilterChange={handleFilterChange}
      />

      {/* Bulk Actions */}
      {selectedCount > 0 && bulkActions.length > 0 && (
        <div className="flex items-center gap-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center gap-2">
            <Badge variant="secondary">
              {selectedCount} selected
            </Badge>
            <span className="text-sm text-gray-600">
              Bulk actions:
            </span>
          </div>
          <div className="flex gap-2">
            {bulkActions.map((action) => (
              <Button
                key={action.key}
                variant={action.variant || 'outline'}
                size="sm"
                onClick={() => onBulkAction?.(action.key, selectedItems)}
              >
                {action.label}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Data Table */}
      <div className="border rounded-lg overflow-hidden bg-white">
        <DataTable
          data={filteredData}
          columns={enhancedColumns}
          onRowClick={onRowClick}
          searchable={false}
        />
      </div>

      {/* Table Info */}
      <div className="flex items-center justify-between text-sm text-gray-600">
        <div>
          Showing {filteredData.length} of {data.length} entries
          {selectedCount > 0 && ` • ${selectedCount} selected`}
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isAllSelected}
            ref={(el) => {
              if (el) el.indeterminate = isPartiallySelected;
            }}
            onChange={toggleAll}
            className="rounded border-gray-300"
          />
          <span>Select all</span>
        </div>
      </div>
    </div>
  );
}
