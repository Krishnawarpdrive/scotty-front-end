
import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Filter, ChevronDown } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { FilterOption } from '../../hooks/useFilterOptions';
import { motion } from 'framer-motion';

interface EnhancedFiltersProps {
  dateRange: string;
  taFilter: string;
  roleFilter: string;
  clientFilter: string;
  onDateRangeChange: (value: string) => void;
  onTaFilterChange: (value: string) => void;
  onRoleFilterChange: (value: string) => void;
  onClientFilterChange: (value: string) => void;
  dateRangeOptions: FilterOption[];
  taOptions: FilterOption[];
  roleOptions: FilterOption[];
  clientOptions: FilterOption[];
}

export const EnhancedFilters: React.FC<EnhancedFiltersProps> = ({
  dateRange,
  taFilter,
  roleFilter,
  clientFilter,
  onDateRangeChange,
  onTaFilterChange,
  onRoleFilterChange,
  onClientFilterChange,
  dateRangeOptions,
  taOptions,
  roleOptions,
  clientOptions
}) => {
  const [showCustomDateRange, setShowCustomDateRange] = useState(false);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  
  const handleDateRangeChange = (value: string) => {
    if (value === 'custom') {
      setShowCustomDateRange(true);
    } else {
      setShowCustomDateRange(false);
      onDateRangeChange(value);
    }
  };
  
  const handleCustomDateApply = () => {
    if (startDate && endDate) {
      const formattedStart = format(startDate, 'dd-MMM-yyyy');
      const formattedEnd = format(endDate, 'dd-MMM-yyyy');
      onDateRangeChange(`custom:${formattedStart}:${formattedEnd}`);
      setShowCustomDateRange(false);
    }
  };

  return (
    <motion.div 
      className="bg-white border-b px-6 py-2 flex flex-wrap gap-2 items-center"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center mr-4">
        <span className="text-sm font-medium mr-2">Date Range:</span>
        <Popover open={showCustomDateRange} onOpenChange={setShowCustomDateRange}>
          <PopoverTrigger asChild>
            <div>
              <Select value={dateRange} onValueChange={handleDateRangeChange}>
                <SelectTrigger className="w-[160px] h-8">
                  <SelectValue placeholder="Select date range" />
                </SelectTrigger>
                <SelectContent>
                  {dateRangeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <div className="p-3 flex flex-col space-y-2">
              <div className="grid gap-2">
                <div className="flex flex-col">
                  <span className="text-sm mb-1">Start Date</span>
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    className="rounded-md border"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm mb-1">End Date</span>
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    className="rounded-md border"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button 
                  size="sm" 
                  onClick={handleCustomDateApply}
                  disabled={!startDate || !endDate}
                >
                  Apply
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      
      <div className="flex items-center mr-4">
        <span className="text-sm font-medium mr-2">TA:</span>
        <Select value={taFilter} onValueChange={onTaFilterChange}>
          <SelectTrigger className="w-[180px] h-8">
            <SelectValue placeholder="All TAs" />
          </SelectTrigger>
          <SelectContent>
            {taOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex items-center mr-4">
        <span className="text-sm font-medium mr-2">Role:</span>
        <Select value={roleFilter} onValueChange={onRoleFilterChange}>
          <SelectTrigger className="w-[180px] h-8">
            <SelectValue placeholder="All Roles" />
          </SelectTrigger>
          <SelectContent>
            {roleOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex items-center">
        <span className="text-sm font-medium mr-2">Client:</span>
        <Select value={clientFilter} onValueChange={onClientFilterChange}>
          <SelectTrigger className="w-[180px] h-8">
            <SelectValue placeholder="All Clients" />
          </SelectTrigger>
          <SelectContent>
            {clientOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </motion.div>
  );
};
