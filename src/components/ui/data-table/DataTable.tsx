
import React, { useState } from 'react';
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
  const [activeColumnFilter, setActiveColumnFilter] = useState<string | null>(null);
  const [hoveredColumn, setHoveredColumn] = useState<string | null>(null);
  
  const {
    filters: columnFilters,
    selectedFilterValues,
    handleFilterChange,
    toggleFilterValue,
    clearFilter,
    filteredData: dataFilteredByFilters
  } = useDataTableFilters(data, columns);

  const { sortConfig, handleSort } = useDataTableSort<T>();

  // Apply search filtering
  let filteredData = filterData(dataFilteredByFilters, searchTerm, columns);
  
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
      {(searchable || actions) && (
        <div className="flex items-center justify-between mb-4">
          {searchable && (
            <div className="flex-1 max-w-sm">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          )}
          {actions && <div>{actions}</div>}
        </div>
      )}
      
      <div className="rounded-md border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                {columns.map((column) => (
                  <DataTableHeader
                    key={column.id}
                    column={column}
                    sortConfig={sortConfig}
                    handleSort={handleSort}
                    activeColumnFilter={activeColumnFilter}
                    setActiveColumnFilter={setActiveColumnFilter}
                    hoveredColumn={hoveredColumn}
                    setHoveredColumn={setHoveredColumn}
                    filters={columnFilters}
                    columnValues={new Set()}
                    selectedFilterValues={selectedFilterValues[column.id] || []}
                    handleFilterChange={handleFilterChange}
                    toggleFilterValue={toggleFilterValue}
                    clearFilter={clearFilter}
                  />
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
