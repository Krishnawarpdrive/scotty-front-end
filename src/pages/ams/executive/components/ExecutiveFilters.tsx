
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

interface ExecutiveFiltersProps {
  dateRange: string;
  departmentFilter: string;
  regionFilter: string;
  onDateRangeChange: (value: string) => void;
  onDepartmentChange: (value: string) => void;
  onRegionChange: (value: string) => void;
}

export const ExecutiveFilters: React.FC<ExecutiveFiltersProps> = ({
  dateRange,
  departmentFilter,
  regionFilter,
  onDateRangeChange,
  onDepartmentChange,
  onRegionChange
}) => {
  const activeFilters = [
    { key: 'department', value: departmentFilter, label: 'Department', clear: () => onDepartmentChange('all') },
    { key: 'region', value: regionFilter, label: 'Region', clear: () => onRegionChange('all') }
  ].filter(filter => filter.value !== 'all');

  const clearAllFilters = () => {
    onDepartmentChange('all');
    onRegionChange('all');
  };

  return (
    <Card className="p-4">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">Time Period:</span>
          <Select value={dateRange} onValueChange={onDateRangeChange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
              <SelectItem value="180">Last 6 months</SelectItem>
              <SelectItem value="365">Last year</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">Department:</span>
          <Select value={departmentFilter} onValueChange={onDepartmentChange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              <SelectItem value="engineering">Engineering</SelectItem>
              <SelectItem value="sales">Sales</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
              <SelectItem value="hr">Human Resources</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">Region:</span>
          <Select value={regionFilter} onValueChange={onRegionChange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Regions</SelectItem>
              <SelectItem value="north-america">North America</SelectItem>
              <SelectItem value="europe">Europe</SelectItem>
              <SelectItem value="asia-pacific">Asia Pacific</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {activeFilters.length > 0 && (
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-sm text-gray-600">Active filters:</span>
            {activeFilters.map(filter => (
              <Badge key={filter.key} variant="secondary" className="flex items-center gap-1">
                {filter.label}: {filter.value}
                <X 
                  className="h-3 w-3 cursor-pointer hover:text-red-500" 
                  onClick={filter.clear}
                />
              </Badge>
            ))}
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={clearAllFilters}
              className="text-red-600 hover:text-red-700"
            >
              Clear all
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};
