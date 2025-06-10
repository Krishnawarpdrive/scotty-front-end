
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Search, Users, Filter } from 'lucide-react';
import { DraggableTACard } from './DraggableTACard';
import { TAProfile } from './TAMappingInterface';

interface TAPoolPanelProps {
  taProfiles: TAProfile[];
  selectedTAs: string[];
  onTASelection: (taId: string, isSelected: boolean) => void;
  filterCriteria: {
    availability: string;
    skills: string;
    workload: string;
  };
  onFilterChange: (filters: any) => void;
}

export const TAPoolPanel: React.FC<TAPoolPanelProps> = ({
  taProfiles,
  selectedTAs,
  onTASelection,
  filterCriteria,
  onFilterChange
}) => {
  const filteredTAs = taProfiles.filter(ta => {
    const matchesAvailability = 
      filterCriteria.availability === 'all' || 
      ta.availability_status === filterCriteria.availability;
    
    const matchesSkills = 
      !filterCriteria.skills || 
      ta.skills.some(skill => 
        skill.toLowerCase().includes(filterCriteria.skills.toLowerCase())
      );
    
    const matchesWorkload = 
      filterCriteria.workload === 'all' ||
      (filterCriteria.workload === 'low' && ta.current_workload < 50) ||
      (filterCriteria.workload === 'medium' && ta.current_workload >= 50 && ta.current_workload < 80) ||
      (filterCriteria.workload === 'high' && ta.current_workload >= 80);

    return matchesAvailability && matchesSkills && matchesWorkload;
  });

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          TA Pool ({filteredTAs.length})
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
              <SelectItem value="low">Low (&lt; 50%)</SelectItem>
              <SelectItem value="medium">Medium (50-80%)</SelectItem>
              <SelectItem value="high">High (&gt; 80%)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* TA Cards */}
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {filteredTAs.map((ta) => (
            <div key={ta.id} className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={selectedTAs.includes(ta.id)}
                  onCheckedChange={(checked) => onTASelection(ta.id, !!checked)}
                />
                <span className="text-sm font-medium">Select for bulk actions</span>
              </div>
              
              <DraggableTACard
                ta={ta}
                isSelected={selectedTAs.includes(ta.id)}
              />
            </div>
          ))}
        </div>

        {filteredTAs.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>No TAs match the current filters</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
