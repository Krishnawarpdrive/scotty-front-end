
import { useState } from 'react';
import { TableHead } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Filter, ArrowUp, ArrowDown, X } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { DataTableColumn } from './types';

interface DataTableHeaderProps<T> {
  column: DataTableColumn<T>;
  sortConfig: { key: string; direction: 'asc' | 'desc' } | null;
  handleSort: (key: string) => void;
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
  toggleFilterValue,
  clearFilter,
}: DataTableHeaderProps<T>) {
  const [searchValue, setSearchValue] = useState('');
  const isSorted = sortConfig?.key === column.id;
  const direction = sortConfig?.direction || 'asc';
  const isFiltered = filters[column.id];
  
  const filteredValues = Array.from(columnValues).filter(
    value => value.toLowerCase().includes(searchValue.toLowerCase())
  );
  
  // Helper to determine if a filter value is checked
  const isChecked = (value: string) => {
    return selectedFilterValues.includes(value);
  };
  
  return (
    <TableHead
      onClick={() => column.enableSorting && handleSort(column.id)}
      className={cn(
        "relative select-none",
        column.enableSorting && "cursor-pointer"
      )}
      onMouseEnter={() => column.enableFiltering && setHoveredColumn(column.id)}
      onMouseLeave={() => column.enableFiltering && setHoveredColumn(null)}
      style={{ width: column.width }}
    >
      <div className="flex items-center justify-between min-w-0">
        <span className="text-[12px] text-[#262626] hover:text-green-600 transition-colors truncate">
          {column.header}
        </span>
        
        <div className="flex items-center ml-1 flex-shrink-0">
          {isSorted && (
            <span className="flex items-center">
              {direction === 'asc' ? 
                <ArrowUp className="h-3 w-3" /> : 
                <ArrowDown className="h-3 w-3" />
              }
            </span>
          )}
          
          {column.enableFiltering && (
            <div className="w-6 flex justify-center">
              {(hoveredColumn === column.id || isFiltered) && (
                <Popover
                  open={activeColumnFilter === column.id}
                  onOpenChange={(open) => {
                    if (open) {
                      setActiveColumnFilter(column.id);
                    } else {
                      setActiveColumnFilter(null);
                    }
                  }}
                >
                  <PopoverTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "h-6 w-6 p-0",
                        isFiltered && "text-primary bg-primary/20"
                      )}
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <Filter className="h-3 w-3" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-56 p-2"
                    align="start"
                    side="bottom"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Filter {column.header}</h4>
                      
                      <div className="relative">
                        <Input
                          placeholder="Search values..."
                          className="pl-8 h-8 text-sm"
                          value={searchValue}
                          onChange={(e) => setSearchValue(e.target.value)}
                        />
                        <X
                          className="h-3.5 w-3.5 absolute right-2 top-2.5 text-muted-foreground cursor-pointer"
                          onClick={() => setSearchValue('')}
                        />
                      </div>
                      
                      <div className="max-h-40 overflow-auto space-y-1">
                        {filteredValues.map((value) => (
                          <div
                            key={value}
                            className="flex items-center space-x-2 py-1"
                          >
                            <Checkbox
                              id={`${column.id}-${value}`}
                              checked={isChecked(value)}
                              onCheckedChange={() => toggleFilterValue(column.id, value)}
                            />
                            <label
                              htmlFor={`${column.id}-${value}`}
                              className="text-sm grow cursor-pointer hover:text-green-600"
                            >
                              {value}
                            </label>
                          </div>
                        ))}
                        {filteredValues.length === 0 && (
                          <div className="py-2 text-center text-sm text-muted-foreground">
                            No matching values
                          </div>
                        )}
                      </div>
                      
                      <div className="flex justify-between pt-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-xs h-7"
                          onClick={() => clearFilter(column.id)}
                          disabled={!isFiltered}
                        >
                          Clear
                        </Button>
                        <Button
                          size="sm"
                          className="text-xs h-7"
                          onClick={() => setActiveColumnFilter(null)}
                        >
                          Apply
                        </Button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              )}
            </div>
          )}
        </div>
      </div>
    </TableHead>
  );
}
