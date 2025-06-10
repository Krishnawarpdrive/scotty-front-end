
import { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TAPoolPanel } from './TAPoolPanel';
import { BulkActionsPanel } from './BulkActionsPanel';
import { SmartRecommendationsPanel } from './SmartRecommendationsPanel';
import { PerformanceMetricsPanel } from './PerformanceMetricsPanel';

// Types for TA Mapping Interface
export interface TAProfile {
  id: string;
  name: string;
  email: string;
  skills: string[];
  experience_years: number;
  current_workload: number;
  performance_score: number;
  availability_status: 'available' | 'busy' | 'unavailable';
  location: string;
}

export interface ClientRole {
  id: string;
  client_name: string;
  role_name: string;
  assignment_status: 'unassigned' | 'partially_assigned' | 'fully_assigned';
  required_skills: string[];
  priority: 'high' | 'medium' | 'low';
}

export interface AssignmentMapping {
  id: string;
  ta_id: string;
  client_role_id: string;
  assignment_type: 'primary' | 'secondary' | 'backup';
  assigned_date: string;
}

// Mock data
const mockTAProfiles: TAProfile[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@company.com',
    skills: ['React', 'TypeScript', 'Node.js'],
    experience_years: 5,
    current_workload: 75,
    performance_score: 85,
    availability_status: 'available',
    location: 'New York'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@company.com',
    skills: ['Python', 'Django', 'PostgreSQL'],
    experience_years: 3,
    current_workload: 60,
    performance_score: 92,
    availability_status: 'busy',
    location: 'San Francisco'
  }
];

const mockClientRoles: ClientRole[] = [
  {
    id: '1',
    client_name: 'TechCorp',
    role_name: 'Senior Frontend Developer',
    assignment_status: 'unassigned',
    required_skills: ['React', 'TypeScript'],
    priority: 'high'
  },
  {
    id: '2',
    client_name: 'DataCorp',
    role_name: 'Backend Developer',
    assignment_status: 'partially_assigned',
    required_skills: ['Python', 'Django'],
    priority: 'medium'
  }
];

export const TAMappingInterface: React.FC = () => {
  const [selectedTAs, setSelectedTAs] = useState<string[]>([]);
  const [assignments, setAssignments] = useState<AssignmentMapping[]>([]);
  const [filterCriteria, setFilterCriteria] = useState({
    availability: 'all',
    skills: '',
    workload: 'all'
  });

  const handleTASelection = (taId: string, isSelected: boolean) => {
    if (isSelected) {
      setSelectedTAs([...selectedTAs, taId]);
    } else {
      setSelectedTAs(selectedTAs.filter(id => id !== taId));
    }
  };

  const handleBulkAssignment = (selectedTAIds: string[], targetRoleId: string) => {
    const newAssignments = selectedTAIds.map(taId => ({
      id: `${taId}-${targetRoleId}-${Date.now()}`,
      ta_id: taId,
      client_role_id: targetRoleId,
      assignment_type: 'primary' as const,
      assigned_date: new Date().toISOString()
    }));
    
    setAssignments([...assignments, ...newAssignments]);
    setSelectedTAs([]);
  };

  const handleApplyRecommendation = (taId: string, clientRoleId: string, assignmentType: 'primary' | 'secondary' | 'backup') => {
    const newAssignment: AssignmentMapping = {
      id: `${taId}-${clientRoleId}-${Date.now()}`,
      ta_id: taId,
      client_role_id: clientRoleId,
      assignment_type,
      assigned_date: new Date().toISOString()
    };
    
    setAssignments([...assignments, newAssignment]);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-screen">
        {/* TA Pool - Takes up 2 columns */}
        <div className="lg:col-span-2">
          <TAPoolPanel
            taProfiles={mockTAProfiles}
            selectedTAs={selectedTAs}
            onTASelection={handleTASelection}
            filterCriteria={filterCriteria}
            onFilterChange={setFilterCriteria}
          />
        </div>

        {/* Right Panels - Each takes 1 column */}
        <div className="space-y-6">
          <BulkActionsPanel
            selectedTAs={selectedTAs}
            clientRoles={mockClientRoles}
            onBulkAssignment={handleBulkAssignment}
          />
          
          <SmartRecommendationsPanel
            recommendations={[]} // Mock empty for now
            taProfiles={mockTAProfiles}
            clientRoles={mockClientRoles}
            onApplyRecommendation={handleApplyRecommendation}
          />
        </div>

        <div>
          <PerformanceMetricsPanel
            performanceMetrics={[]} // Mock empty for now
            assignments={assignments}
            taProfiles={mockTAProfiles}
          />
        </div>
      </div>
    </DndProvider>
  );
};
