
import { useState } from 'react';
import { DataTableHeader } from './DataTableHeader';
import { DataTableRow } from './DataTableRow';
import { useDataTableFilters } from './useDataTableFilters';
import { useDataTableSort } from './useDataTableSort';
import { filterData, sortData } from './utils';
import { DataTableProps } from './types';

export function DataTable<T>({
  data,
  columns,
  onRowClick,
  loading = false,
  emptyMessage = "No data available",
  searchable = true,
  sortable = true,
  filterable = false,
  filters = [],
  actions,
}: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState('');
  
  const {
    filters: activeFilters,
    selectedFilterValues,
    clearFilters,
  } = useDataTableFilters(filters);

  const { sortConfig, handleSort } = useDataTableSort<T>();

  // Apply filtering
  let filteredData = filterData(data, searchTerm, columns);
  
  // Apply sorting
  if (sortConfig && sortConfig.key) {
    filteredData = sortData(filteredData, sortConfig);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-sm text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <DataTableHeader
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        searchable={searchable}
        filterable={filterable}
        filters={activeFilters}
        selectedFilterValues={selectedFilterValues}
        onClearFilters={clearFilters}
        actions={actions}
      />
      
      <div className="rounded-md border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                {columns.map((column) => (
                  <th
                    key={column.id}
                    className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0"
                    style={{ width: column.width }}
                  >
                    <div className="flex items-center space-x-2">
                      <span>{column.header}</span>
                      {sortable && column.sortable && (
                        <button
                          onClick={() => {
                            if (sortConfig?.key === column.accessorKey) {
                              handleSort({
                                key: column.accessorKey,
                                direction: sortConfig.direction === 'asc' ? 'desc' : 'asc'
                              });
                            } else {
                              handleSort({
                                key: column.accessorKey,
                                direction: 'asc'
                              });
                            }
                          }}
                          className="ml-2 h-4 w-4"
                        >
                          ↕
                        </button>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} className="h-24 text-center">
                    {emptyMessage}
                  </td>
                </tr>
              ) : (
                filteredData.map((item, index) => (
                  <DataTableRow
                    key={index}
                    item={item}
                    columns={columns}
                    onRowClick={onRowClick}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
