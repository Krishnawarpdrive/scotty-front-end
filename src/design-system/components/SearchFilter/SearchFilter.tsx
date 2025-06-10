import React, { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export interface FilterOption {
  key: string;
  label: string;
  type: 'select' | 'multiselect';
  options?: Array<{ value: string; label: string }>;
}

export interface SearchFilterProps {
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  filters?: FilterOption[];
  activeFilters?: Record<string, any>;
  onFilterChange?: (key: string, value: any) => void;
  enableSemanticSearch?: boolean;
  semanticTables?: string[];
  onSemanticResults?: (results: any[]) => void;
}

export const SearchFilter: React.FC<SearchFilterProps> = ({
  searchPlaceholder = 'Search...',
  searchValue = '',
  onSearchChange,
  filters = [],
  activeFilters = {},
  onFilterChange,
  enableSemanticSearch = false,
  semanticTables = [],
  onSemanticResults
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleFilterChange = (key: string, value: any) => {
    if (onFilterChange) {
      onFilterChange(key, value);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={(e) => onSearchChange?.(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filter Button */}
        {filters.length > 0 && (
          <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filters
                {Object.keys(activeFilters).length > 0 && (
                  <Badge variant="secondary" className="ml-2 text-xs">
                    {Object.keys(activeFilters).length}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="end">
              <div className="space-y-4">
                {filters.map((filter) => (
                  <div key={filter.key} className="space-y-2">
                    <h4 className="font-medium">{filter.label}</h4>
                    {filter.type === 'select' && (
                      <Select onValueChange={(value) => handleFilterChange(filter.key, value)}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder={`Select ${filter.label}`} defaultValue={activeFilters[filter.key] || ''} />
                        </SelectTrigger>
                        <SelectContent>
                          {filter.options?.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                    {filter.type === 'multiselect' && (
                      <div className="flex flex-wrap gap-2">
                        {filter.options?.map((option) => (
                          <Badge
                            key={option.value}
                            variant={activeFilters[filter.key]?.includes(option.value) ? 'selected' : 'outline'}
                            className="cursor-pointer"
                            onClick={() => {
                              const currentValues = activeFilters[filter.key] || [];
                              const newValue = option.value;
                              let newValues;
                              if (currentValues.includes(newValue)) {
                                newValues = currentValues.filter((v: any) => v !== newValue);
                              } else {
                                newValues = [...currentValues, newValue];
                              }
                              handleFilterChange(filter.key, newValues);
                            }}
                          >
                            {option.label}
                            {activeFilters[filter.key]?.includes(option.value) && (
                              <X className="h-3 w-3 ml-1" />
                            )}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>

      {/* Active Filters Display */}
      {Object.keys(activeFilters).length > 0 && (
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Active filters:</span>
          {Object.entries(activeFilters).map(([key, value]) => {
            const filter = filters.find((f) => f.key === key);
            if (!filter) return null;

            const displayValue = Array.isArray(value)
              ? value.map((v) => filter.options?.find((o) => o.value === v)?.label).join(', ')
              : filter.options?.find((o) => o.value === value)?.label || value;

            return (
              <Badge key={key} variant="secondary" className="text-xs">
                {filter.label}: {displayValue}
              </Badge>
            );
          })}
        </div>
      )}
    </div>
  );
};
