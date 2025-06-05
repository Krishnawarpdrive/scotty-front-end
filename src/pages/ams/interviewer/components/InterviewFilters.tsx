
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Calendar, Filter, RotateCcw } from 'lucide-react';

interface InterviewFiltersProps {
  filters: {
    status: string;
    dateRange: string;
    interviewType: string;
  };
  onFiltersChange: (filters: any) => void;
}

export const InterviewFilters: React.FC<InterviewFiltersProps> = ({
  filters,
  onFiltersChange,
}) => {
  const handleFilterChange = (key: string, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  };

  const resetFilters = () => {
    onFiltersChange({
      status: 'all',
      dateRange: 'week',
      interviewType: 'all'
    });
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Filters</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Status:</span>
              <Select
                value={filters.status}
                onValueChange={(value) => handleFilterChange('status', value)}
              >
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-gray-600" />
              <span className="text-sm text-gray-600">Date Range:</span>
              <Select
                value={filters.dateRange}
                onValueChange={(value) => handleFilterChange('dateRange', value)}
              >
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="all">All Time</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Type:</span>
              <Select
                value={filters.interviewType}
                onValueChange={(value) => handleFilterChange('interviewType', value)}
              >
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="technical">Technical</SelectItem>
                  <SelectItem value="behavioral">Behavioral</SelectItem>
                  <SelectItem value="final">Final Round</SelectItem>
                  <SelectItem value="screening">Screening</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={resetFilters}
            >
              <RotateCcw className="h-4 w-4 mr-1" />
              Reset
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
