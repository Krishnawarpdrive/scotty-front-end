
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X } from 'lucide-react';

export interface FilterState {
  status: string[];
  source: string[];
  experience: string[];
  stage: string[];
  assignedTA: string[];
  dateRange: string;
  roleType: string[];
}

interface CandidateFiltersProps {
  filters: FilterState;
  onFilterChange: (key: keyof FilterState, value: string[] | string) => void;
  onClearFilter: (key: keyof FilterState) => void;
  onClearAll: () => void;
}

export const CandidateFilters: React.FC<CandidateFiltersProps> = ({
  filters,
  onFilterChange,
  onClearFilter,
  onClearAll,
}) => {
  const statusOptions = ['Active', 'On Hold', 'Rejected', 'Hired', 'Withdrawn'];
  const sourceOptions = ['LinkedIn', 'Referral', 'Job Board', 'Direct Apply', 'Recruitment Agency'];
  const experienceOptions = ['Fresher', '1-3 years', '3-5 years', '5-10 years', '10+ years'];
  const stageOptions = ['Screening', 'Phone Interview', 'Technical Round', 'Client Interview', 'Final Round'];
  const taOptions = ['Sarah Johnson', 'Mike Chen', 'Emma Davis', 'John Smith'];
  const roleTypeOptions = ['Full-time', 'Contract', 'Part-time', 'Internship'];

  const getActiveFilterCount = () => {
    return Object.values(filters).reduce((count, value) => {
      if (Array.isArray(value)) {
        return count + value.length;
      }
      return value ? count + 1 : count;
    }, 0);
  };

  const activeFilterCount = getActiveFilterCount();

  const renderMultiSelect = (
    label: string,
    key: keyof FilterState,
    options: string[],
    values: string[]
  ) => (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <div className="space-y-2">
        {options.map(option => (
          <div key={option} className="flex items-center space-x-2">
            <input
              type="checkbox"
              id={`${key}-${option}`}
              checked={values.includes(option)}
              onChange={(e) => {
                const newValues = e.target.checked
                  ? [...values, option]
                  : values.filter(v => v !== option);
                onFilterChange(key, newValues);
              }}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor={`${key}-${option}`} className="text-sm text-gray-600">
              {option}
            </label>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-white border rounded-lg p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Filters</h3>
        {activeFilterCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearAll}
            className="text-red-600 hover:text-red-700"
          >
            Clear All ({activeFilterCount})
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {renderMultiSelect('Status', 'status', statusOptions, filters.status)}
        {renderMultiSelect('Source', 'source', sourceOptions, filters.source)}
        {renderMultiSelect('Experience', 'experience', experienceOptions, filters.experience)}
        {renderMultiSelect('Current Stage', 'stage', stageOptions, filters.stage)}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {renderMultiSelect('Assigned TA', 'assignedTA', taOptions, filters.assignedTA)}
        {renderMultiSelect('Role Type', 'roleType', roleTypeOptions, filters.roleType)}
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Date Range</label>
          <Select value={filters.dateRange} onValueChange={(value) => onFilterChange('dateRange', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select date range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {activeFilterCount > 0 && (
        <div className="pt-4 border-t">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Active Filters:</h4>
          <div className="flex flex-wrap gap-2">
            {Object.entries(filters).map(([key, value]) => {
              if (Array.isArray(value) && value.length > 0) {
                return value.map(item => (
                  <Badge
                    key={`${key}-${item}`}
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    {item}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => {
                        const newValues = value.filter(v => v !== item);
                        onFilterChange(key as keyof FilterState, newValues);
                      }}
                    />
                  </Badge>
                ));
              } else if (typeof value === 'string' && value) {
                return (
                  <Badge
                    key={key}
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    {value}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => onClearFilter(key as keyof FilterState)}
                    />
                  </Badge>
                );
              }
              return null;
            })}
          </div>
        </div>
      )}
    </div>
  );
};
