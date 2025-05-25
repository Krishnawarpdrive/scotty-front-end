import React, { useState } from 'react';
import { SideDrawer } from '@/components/ui/side-drawer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

interface AdvancedFiltersDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onFiltersApply: (filters: any) => void;
}

export const AdvancedFiltersDrawer: React.FC<AdvancedFiltersDrawerProps> = ({
  open,
  onOpenChange,
  onFiltersApply
}) => {
  const [filters, setFilters] = useState({
    dateRange: null,
    taTeams: [],
    clientTiers: [],
    rolePriorities: [],
    candidateStages: [],
    performanceRange: [0, 100],
    interviewTypes: [],
    urgencyLevels: [],
    departments: []
  });

  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const filterOptions = {
    taTeams: ['Team Alpha', 'Team Beta', 'Team Gamma', 'Team Delta'],
    clientTiers: ['Tier 1', 'Tier 2', 'Tier 3', 'Enterprise'],
    rolePriorities: ['High', 'Medium', 'Low', 'Critical'],
    candidateStages: ['Screening', 'Interview', 'Offer', 'Onboarding'],
    interviewTypes: ['Technical', 'Behavioral', 'Cultural Fit', 'Final Round'],
    urgencyLevels: ['Immediate', 'This Week', 'This Month', 'Flexible'],
    departments: ['Engineering', 'Design', 'Product', 'Marketing', 'Sales']
  };

  const handleFilterToggle = (category: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter(v => v !== value)
        : [...prev[category], value]
    }));

    const filterKey = `${category}:${value}`;
    setActiveFilters(prev => 
      prev.includes(filterKey)
        ? prev.filter(f => f !== filterKey)
        : [...prev, filterKey]
    );
  };

  const removeFilter = (filterKey: string) => {
    const [category, value] = filterKey.split(':');
    setFilters(prev => ({
      ...prev,
      [category]: prev[category].filter(v => v !== value)
    }));
    setActiveFilters(prev => prev.filter(f => f !== filterKey));
  };

  const clearAllFilters = () => {
    setFilters({
      dateRange: null,
      taTeams: [],
      clientTiers: [],
      rolePriorities: [],
      candidateStages: [],
      performanceRange: [0, 100],
      interviewTypes: [],
      urgencyLevels: [],
      departments: []
    });
    setActiveFilters([]);
  };

  const applyFilters = () => {
    onFiltersApply(filters);
    onOpenChange(false);
  };

  return (
    <SideDrawer
      open={open}
      onOpenChange={onOpenChange}
      title="Advanced Filters"
      subtitle="Customize your dashboard view"
      size="lg"
    >
      <div className="p-6 space-y-6">
        {/* Active Filters */}
        {activeFilters.length > 0 && (
          <Card className="p-4">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-medium">Active Filters ({activeFilters.length})</h4>
              <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                Clear All
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {activeFilters.map(filter => (
                <Badge key={filter} variant="secondary" className="gap-1">
                  {filter.split(':')[1]}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => removeFilter(filter)}
                  />
                </Badge>
              ))}
            </div>
          </Card>
        )}

        {/* Date Range */}
        <Card className="p-4">
          <Label className="text-sm font-medium mb-3 block">Date Range</Label>
          <Select>
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
        </Card>

        {/* Performance Range */}
        <Card className="p-4">
          <Label className="text-sm font-medium mb-3 block">
            Performance Range: {filters.performanceRange[0]}% - {filters.performanceRange[1]}%
          </Label>
          <Slider
            value={filters.performanceRange}
            onValueChange={(value) => setFilters(prev => ({ ...prev, performanceRange: value }))}
            max={100}
            min={0}
            step={5}
            className="w-full"
          />
        </Card>

        {/* Filter Categories */}
        {Object.entries(filterOptions).map(([category, options]) => (
          <Card key={category} className="p-4">
            <Label className="text-sm font-medium mb-3 block capitalize">
              {category.replace(/([A-Z])/g, ' $1').toLowerCase()}
            </Label>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {options.map(option => (
                <div key={option} className="flex items-center space-x-2">
                  <Checkbox
                    id={`${category}-${option}`}
                    checked={filters[category].includes(option)}
                    onCheckedChange={() => handleFilterToggle(category, option)}
                  />
                  <Label htmlFor={`${category}-${option}`} className="text-sm">
                    {option}
                  </Label>
                </div>
              ))}
            </div>
          </Card>
        ))}

        {/* Action Buttons */}
        <div className="flex gap-2 pt-4">
          <Button onClick={applyFilters} className="flex-1">
            Apply Filters
          </Button>
          <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
            Cancel
          </Button>
        </div>
      </div>
    </SideDrawer>
  );
};
