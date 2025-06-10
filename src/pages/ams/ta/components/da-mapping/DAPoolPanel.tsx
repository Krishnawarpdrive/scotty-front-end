
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Search, Users, Filter } from 'lucide-react';
import { DraggableDACard } from './DraggableDACard';
import { DAProfile } from './DAMappingInterface';

interface DAPoolPanelProps {
  daProfiles: DAProfile[];
  selectedDAs: string[];
  onDASelection: (daId: string, isSelected: boolean) => void;
  filterCriteria: {
    availability: string;
    skills: string;
    workload: string;
  };
  onFilterChange: (filters: any) => void;
}

export const DAPoolPanel: React.FC<DAPoolPanelProps> = ({
  daProfiles,
  selectedDAs,
  onDASelection,
  filterCriteria,
  onFilterChange
}) => {
  const filteredDAs = daProfiles.filter(da => {
    const matchesAvailability = 
      filterCriteria.availability === 'all' || 
      da.availability_status === filterCriteria.availability;
    
    const matchesSkills = 
      !filterCriteria.skills || 
      da.skills.some(skill => 
        skill.toLowerCase().includes(filterCriteria.skills.toLowerCase())
      );
    
    const matchesWorkload = 
      filterCriteria.workload === 'all' ||
      (filterCriteria.workload === 'low' && da.current_workload < 50) ||
      (filterCriteria.workload === 'medium' && da.current_workload >= 50 && da.current_workload < 80) ||
      (filterCriteria.workload === 'high' && da.current_workload >= 80);

    return matchesAvailability && matchesSkills && matchesWorkload;
  });

  const getAvailabilityColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'busy': return 'bg-yellow-100 text-yellow-800';
      case 'unavailable': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getWorkloadColor = (workload: number) => {
    if (workload >= 80) return 'bg-red-500';
    if (workload >= 50) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          DA Pool ({filteredDAs.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search and Filters */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by skills..."
              value={filterCriteria.skills}
              onChange={(e) => onFilterChange({ ...filterCriteria, skills: e.target.value })}
              className="pl-10"
            />
          </div>

          <Select
            value={filterCriteria.availability}
            onValueChange={(value) => onFilterChange({ ...filterCriteria, availability: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Filter by availability" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Availability</SelectItem>
              <SelectItem value="available">Available</SelectItem>
              <SelectItem value="busy">Busy</SelectItem>
              <SelectItem value="unavailable">Unavailable</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={filterCriteria.workload}
            onValueChange={(value) => onFilterChange({ ...filterCriteria, workload: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Filter by workload" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Workloads</SelectItem>
              <SelectItem value="low">Low (< 50%)</SelectItem>
              <SelectItem value="medium">Medium (50-80%)</SelectItem>
              <SelectItem value="high">High (> 80%)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* DA Cards */}
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {filteredDAs.map((da) => (
            <div key={da.id} className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={selectedDAs.includes(da.id)}
                  onCheckedChange={(checked) => onDASelection(da.id, !!checked)}
                />
                <span className="text-sm font-medium">Select for bulk actions</span>
              </div>
              
              <DraggableDACard
                da={da}
                isSelected={selectedDAs.includes(da.id)}
              />
            </div>
          ))}
        </div>

        {filteredDAs.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>No DAs match the current filters</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
