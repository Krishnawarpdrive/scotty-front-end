
import React from 'react';
import { TableHead } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ArrowUp, ArrowDown, Filter, Search } from 'lucide-react';
import { DataTableColumn } from './types';
import { cn } from "@/lib/utils";

interface DataTableHeaderProps<T> {
  column: DataTableColumn<T>;
  sortConfig: {
    key: string | null;
    direction: 'asc' | 'desc';
  };
  handleSort: (columnId: string) => void;
  activeColumnFilter: string | null;
  setActiveColumnFilter: (columnId: string | null) => void;
  hoveredColumn: string | null;
  setHoveredColumn: (columnId: string | null) => void;
  filters: Record<string, string>;
  columnValues: Set<string>;
  selectedFilterValues: string[];
  handleFilterChange: (columnId: string, value: string) => void;
  toggleFilterValue: (columnId: string, value: string) => void;
  clearFilter: (columnId: string) => void;
}

export function DataTableHeader<T>({
  column,
  sortConfig,
  handleSort,
  activeColumnFilter,
  setActiveColumnFilter,
  hoveredColumn,
  setHoveredColumn,
  filters,
  columnValues,
  selectedFilterValues,
  handleFilterChange,
  toggleFilterValue,
  clearFilter,
}: DataTableHeaderProps<T>) {
  return (
    <TableHead
      className={cn(
        "relative whitespace-nowrap",
        column.enableSorting && "cursor-pointer select-none",
        activeColumnFilter === column.id && "bg-gray-100"
      )}
      onClick={() => column.enableSorting && handleSort(column.id)}
      onMouseEnter={() => setHoveredColumn(column.id)}
      onMouseLeave={() => setHoveredColumn(null)}
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
                  "h-6 w-6 p-0",
                  (hoveredColumn === column.id || filters[column.id]) 
                    ? "opacity-100" 
                    : "opacity-0 hover:opacity-100",
                  filters[column.id] && "text-primary"
                )}
              >
                <Filter className="h-3.5 w-3.5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-56 p-2">
              <div className="space-y-3">
                <p className="text-sm font-medium">Filter {column.header}</p>
                
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
                  <Input
                    placeholder="Search..."
                    className="pl-8"
                    value={filters[column.id] || ''}
                    onChange={(e) => !e.target.value.includes('|') && handleFilterChange(column.id, e.target.value)}
                  />
                </div>
                
                <div className="max-h-[200px] overflow-auto">
                  <div className="space-y-2">
                    {Array.from(columnValues).sort().map((value) => (
                      <div key={value} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`filter-${column.id}-${value}`}
                          checked={selectedFilterValues.includes(value)}
                          onCheckedChange={() => toggleFilterValue(column.id, value)}
                        />
                        <label 
                          htmlFor={`filter-${column.id}-${value}`}
                          className="text-sm cursor-pointer grow truncate"
                        >
                          {value}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                {filters[column.id] && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-xs h-8 mt-2"
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
  )
}
