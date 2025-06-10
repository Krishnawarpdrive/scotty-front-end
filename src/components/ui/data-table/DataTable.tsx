
import { useState } from 'react';
import { Table, TableHeader, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from 'lucide-react';
import { DataTableColumn } from './types';
import { DataTableHeader } from './DataTableHeader';
import { DataTableRow } from './DataTableRow';
import { useDataTableFilters } from './useDataTableFilters';
import { useDataTableSort } from './useDataTableSort';

export interface DataTableProps<T> {
  data: T[];
  columns: DataTableColumn<T>[];
  onRowClick?: (item: T) => void;
  isLoading?: boolean;
}

export function DataTable<T extends Record<string, any>>({ 
  data, 
  columns,
  onRowClick,
  isLoading = false
}: DataTableProps<T>) {
  const [hoveredColumn, setHoveredColumn] = useState<string | null>(null);
  const [activeColumnFilter, setActiveColumnFilter] = useState<string | null>(null);
  
  const { 
    filters, 
    columnValues, 
    selectedFilterValues, 
    handleFilterChange, 
    toggleFilterValue, 
    clearFilter, 
    clearAllFilters, 
    filteredData 
  } = useDataTableFilters(data, columns);
  
  const { sortConfig, handleSort, sortedData } = useDataTableSort(filteredData);
  
  const activeFilterCount = Object.keys(filters).length;
  
  // Final data after applying both filtering and sorting
  const finalData = sortedData;
  
  if (isLoading) {
    return (
      <div className="border rounded-md overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((column) => (
                  <DataTableHeader
                    key={column.id}
                    column={column}
                    sortConfig={sortConfig?.key ? { key: sortConfig.key, direction: sortConfig.direction } : null}
                    handleSort={handleSort}
                    activeColumnFilter={activeColumnFilter}
                    setActiveColumnFilter={setActiveColumnFilter}
                    hoveredColumn={hoveredColumn}
                    setHoveredColumn={setHoveredColumn}
                    filters={filters}
                    columnValues={new Set()}
                    selectedFilterValues={[]}
                    handleFilterChange={handleFilterChange}
                    toggleFilterValue={toggleFilterValue}
                    clearFilter={clearFilter}
                  />
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                  {columns.map((column) => (
                    <TableCell key={column.id} className="h-[60px]">
                      <div className="bg-gray-200 h-4 rounded animate-pulse"></div>
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {/* Master Filter Controls */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap items-center gap-2 bg-gray-50 p-2 rounded-md">
          <span className="text-sm font-medium">Active Filters:</span>
          {Object.entries(filters).map(([columnId, value]) => {
            const column = columns.find(col => col.id === columnId);
            return (
              <Badge 
                key={columnId} 
                variant="outline"
                className="bg-gray-100 text-gray-800 flex items-center gap-1"
              >
                {column?.header}: {value.includes('|') ? `${selectedFilterValues[columnId]?.length} selected` : value}
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-4 w-4 p-0 ml-1" 
                  onClick={() => clearFilter(columnId)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            );
          })}
          {activeFilterCount > 1 && (
            <Button 
              variant="ghost" 
              size="sm"
              className="text-xs h-7" 
              onClick={clearAllFilters}
            >
              Clear all
            </Button>
          )}
        </div>
      )}
      
      <div className="border rounded-md overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((column) => (
                  <DataTableHeader
                    key={column.id}
                    column={column}
                    sortConfig={sortConfig?.key ? { key: sortConfig.key, direction: sortConfig.direction } : null}
                    handleSort={handleSort}
                    activeColumnFilter={activeColumnFilter}
                    setActiveColumnFilter={setActiveColumnFilter}
                    hoveredColumn={hoveredColumn}
                    setHoveredColumn={setHoveredColumn}
                    filters={filters}
                    columnValues={columnValues[column.id] || new Set()}
                    selectedFilterValues={selectedFilterValues[column.id] || []}
                    handleFilterChange={handleFilterChange}
                    toggleFilterValue={toggleFilterValue}
                    clearFilter={clearFilter}
                  />
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {finalData.length > 0 ? (
                finalData.map((item, index) => (
                  <DataTableRow
                    key={index}
                    item={item}
                    columns={columns}
                    onRowClick={onRowClick}
                  />
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
