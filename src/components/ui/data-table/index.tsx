
import React, { useState } from 'react';
import { Search, Filter, ArrowUp, ArrowDown, X } from 'lucide-react';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export interface DataTableColumn<T> {
  id: string;
  header: string;
  accessorKey: keyof T | ((data: T) => any);
  cell?: (data: T) => React.ReactNode;
  enableSorting?: boolean;
  enableFiltering?: boolean;
}

export interface DataTableProps<T> {
  data: T[];
  columns: DataTableColumn<T>[];
  onRowClick?: (item: T) => void;
}

export function DataTable<T extends Record<string, any>>({ 
  data, 
  columns,
  onRowClick 
}: DataTableProps<T>) {
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: 'asc' | 'desc';
  }>({
    key: null,
    direction: 'asc',
  });
  
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [activeColumnFilter, setActiveColumnFilter] = useState<string | null>(null);
  
  const handleSort = (columnId: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    
    if (sortConfig.key === columnId && sortConfig.direction === 'asc') {
      direction = 'desc';
    } else if (sortConfig.key === columnId && sortConfig.direction === 'desc') {
      return setSortConfig({ key: null, direction: 'asc' });
    }
    
    setSortConfig({ key: columnId, direction });
  };
  
  const handleFilterChange = (columnId: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [columnId]: value,
    }));
  };
  
  const clearFilter = (columnId: string) => {
    const newFilters = { ...filters };
    delete newFilters[columnId];
    setFilters(newFilters);
  };
  
  const clearAllFilters = () => {
    setFilters({});
  };
  
  const getColumnValue = (item: T, column: DataTableColumn<T>) => {
    if (typeof column.accessorKey === 'function') {
      return column.accessorKey(item);
    } else {
      return item[column.accessorKey as string];
    }
  };
  
  // Apply filters
  let filteredData = [...data];
  
  Object.entries(filters).forEach(([columnId, filterValue]) => {
    if (filterValue && filterValue.trim() !== '') {
      const column = columns.find(col => col.id === columnId);
      if (column) {
        filteredData = filteredData.filter(item => {
          const value = getColumnValue(item, column);
          return String(value).toLowerCase().includes(filterValue.toLowerCase());
        });
      }
    }
  });
  
  // Apply sorting
  if (sortConfig.key) {
    const column = columns.find(col => col.id === sortConfig.key);
    if (column) {
      filteredData = [...filteredData].sort((a, b) => {
        const valueA = getColumnValue(a, column);
        const valueB = getColumnValue(b, column);
        
        if (valueA < valueB) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (valueA > valueB) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
  }
  
  const activeFilterCount = Object.keys(filters).length;
  
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
                {column?.header}: {value}
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
                  <TableHead
                    key={column.id}
                    className={cn(
                      "relative whitespace-nowrap",
                      column.enableSorting && "cursor-pointer select-none",
                      activeColumnFilter === column.id && "bg-gray-100"
                    )}
                    onClick={() => column.enableSorting && handleSort(column.id)}
                  >
                    <div className="flex items-center space-x-1">
                      <span>{column.header}</span>
                      {sortConfig.key === column.id && (
                        <span>
                          {sortConfig.direction === 'asc' ? (
                            <ArrowUp className="h-3.5 w-3.5" />
                          ) : (
                            <ArrowDown className="h-3.5 w-3.5" />
                          )}
                        </span>
                      )}
                      {column.enableFiltering && (
                        <Popover 
                          open={activeColumnFilter === column.id}
                          onOpenChange={(open) => {
                            setActiveColumnFilter(open ? column.id : null);
                          }}
                        >
                          <PopoverTrigger asChild onClick={(e) => e.stopPropagation()}>
                            <Button
                              variant="ghost"
                              size="sm"
                              className={cn(
                                "h-6 w-6 p-0 opacity-70 hover:opacity-100",
                                filters[column.id] && "text-primary opacity-100"
                              )}
                            >
                              <Filter className="h-3.5 w-3.5" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent align="start" className="w-56 p-2">
                            <div className="space-y-2">
                              <p className="text-sm font-medium">Filter {column.header}</p>
                              <div className="relative">
                                <Search className="absolute left-2 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
                                <Input
                                  placeholder="Search..."
                                  className="pl-8"
                                  value={filters[column.id] || ''}
                                  onChange={(e) => handleFilterChange(column.id, e.target.value)}
                                />
                              </div>
                              {filters[column.id] && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="w-full text-xs h-8"
                                  onClick={() => clearFilter(column.id)}
                                >
                                  Clear filter
                                </Button>
                              )}
                            </div>
                          </PopoverContent>
                        </Popover>
                      )}
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.length > 0 ? (
                filteredData.map((item, index) => (
                  <TableRow 
                    key={index} 
                    className={cn(onRowClick && "cursor-pointer hover:bg-gray-50")}
                    onClick={() => onRowClick && onRowClick(item)}
                  >
                    {columns.map((column) => (
                      <TableCell key={column.id}>
                        {column.cell ? column.cell(item) : getColumnValue(item, column)}
                      </TableCell>
                    ))}
                  </TableRow>
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
