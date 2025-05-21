
import React from 'react';
import { Search, X } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ArrowUpDown } from 'lucide-react';

interface ColumnFilterPopoverProps {
  column: string;
  columnDisplayName: string;
  sortColumn: string | null;
  filterOptions: string[];
  columnFilters: string[];
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onFilterChange: (value: string) => void;
  onClearFilters: () => void;
}

const ColumnFilterPopover: React.FC<ColumnFilterPopoverProps> = ({
  column,
  columnDisplayName,
  sortColumn,
  filterOptions,
  columnFilters,
  searchTerm,
  onSearchChange,
  onFilterChange,
  onClearFilters
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="flex items-center gap-1 cursor-pointer">
          {columnDisplayName}
          {sortColumn === column && (
            <ArrowUpDown className="h-3 w-3" />
          )}
          {columnFilters.length > 0 && (
            <Badge variant="secondary" className="ml-1 h-5 px-1">
              {columnFilters.length}
            </Badge>
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-0" align="start">
        <div className="p-2 border-b">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              placeholder={`Search ${columnDisplayName.toLowerCase()}...`}
              className="pl-7 h-8 text-xs"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        </div>
        <div className="py-2 max-h-60 overflow-auto">
          {filterOptions.length > 0 ? (
            filterOptions.map((option) => (
              <div key={option} className="flex items-center space-x-2 px-3 py-1 text-xs">
                <Checkbox
                  id={`${column}-${option}`}
                  checked={columnFilters.includes(option)}
                  onCheckedChange={() => onFilterChange(option)}
                />
                <Label htmlFor={`${column}-${option}`} className="text-xs">
                  {column === 'dateAdded' ? new Date(option).toLocaleDateString() : option}
                </Label>
              </div>
            ))
          ) : (
            <p className="text-xs text-center py-2 text-muted-foreground">No options found</p>
          )}
        </div>
        <div className="flex items-center justify-between p-2 border-t bg-muted/20">
          <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={onClearFilters}>
            Clear
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="h-7 text-xs">
              Cancel
            </Button>
            <Button size="sm" className="h-7 text-xs">
              Apply
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ColumnFilterPopover;
