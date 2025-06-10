
import { useState, useEffect, useCallback } from 'react';
import { DAProfile, ClientRole, AssignmentMapping } from '../DAMappingInterface';

interface Recommendation {
  id: string;
  da_id: string;
  client_role_id: string;
  confidence_score: number;
  reasoning: string;
  assignment_type: 'primary' | 'secondary' | 'backup';
}

interface PerformanceMetric {
  da_id: string;
  metric_type: string;
  value: number;
  period: string;
  trend: 'up' | 'down' | 'stable';
}

export const useDragAndDropMapping = () => {
  const [daProfiles, setDAProfiles] = useState<DAProfile[]>([]);
  const [clientRoles, setClientRoles] = useState<ClientRole[]>([]);
  const [assignments, setAssignments] = useState<AssignmentMapping[]>([]);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetric[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Mock data initialization
  useEffect(() => {
    loadMockData();
  }, []);

  const loadMockData = async () => {
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock DA Profiles
    const mockDAs: DAProfile[] = [
      {
        id: 'da-1',
        name: 'Sarah Chen',
        email: 'sarah.chen@company.com',
        skills: ['React', 'TypeScript', 'Node.js', 'AWS'],
        experience_years: 5,
        current_workload: 65,
        max_capacity: 100,
        performance_score: 92,
        availability_status: 'available',
        specializations: ['Frontend Development', 'Cloud Architecture'],
        location: 'San Francisco, CA',
        timezone: 'PST'
      },
      {
        id: 'da-2',
        name: 'Mike Rodriguez',
        email: 'mike.rodriguez@company.com',
        skills: ['Python', 'Django', 'PostgreSQL', 'Docker'],
        experience_years: 7,
        current_workload: 80,
        max_capacity: 100,
        performance_score: 88,
        availability_status: 'busy',
        specializations: ['Backend Development', 'Database Design'],
        location: 'Austin, TX',
        timezone: 'CST'
      },
      {
        id: 'da-3',
        name: 'Emily Watson',
        email: 'emily.watson@company.com',
        skills: ['Java', 'Spring Boot', 'Microservices', 'Kubernetes'],
        experience_years: 6,
        current_workload: 45,
        max_capacity: 100,
        performance_score: 95,
        availability_status: 'available',
        specializations: ['Enterprise Architecture', 'DevOps'],
        location: 'New York, NY',
        timezone: 'EST'
      },
      {
        id: 'da-4',
        name: 'David Kim',
        email: 'david.kim@company.com',
        skills: ['React Native', 'Swift', 'Kotlin', 'Firebase'],
        experience_years: 4,
        current_workload: 30,
        max_capacity: 100,
        performance_score: 87,
        availability_status: 'available',
        specializations: ['Mobile Development', 'Cross-platform'],
        location: 'Seattle, WA',
        timezone: 'PST'
      }
    ];

    // Mock Client Roles
    const mockRoles: ClientRole[] = [
      {
        id: 'role-1',
        client_name: 'TechCorp Inc.',
        role_name: 'Senior Frontend Developer',
        requirements_count: 3,
        priority: 'high',
        skills_required: ['React', 'TypeScript', 'GraphQL'],
        assignment_status: 'partially_assigned',
        due_date: '2024-02-15',
        assigned_das: ['da-1']
      },
      {
        id: 'role-2',
        client_name: 'TechCorp Inc.',
        role_name: 'Backend Engineer',
        requirements_count: 2,
        priority: 'medium',
        skills_required: ['Python', 'Django', 'PostgreSQL'],
        assignment_status: 'unassigned',
        due_date: '2024-02-20',
        assigned_das: []
      },
      {
        id: 'role-3',
        client_name: 'StartupXYZ',
        role_name: 'Full Stack Developer',
        requirements_count: 2,
        priority: 'high',
        skills_required: ['React', 'Node.js', 'MongoDB'],
        assignment_status: 'fully_assigned',
        due_date: '2024-01-30',
        assigned_das: ['da-3', 'da-4']
      },
      {
        id: 'role-4',
        client_name: 'Enterprise Solutions',
        role_name: 'Mobile App Developer',
        requirements_count: 1,
        priority: 'low',
        skills_required: ['React Native', 'JavaScript'],
        assignment_status: 'unassigned',
        due_date: '2024-03-01',
        assigned_das: []
      }
    ];

    // Mock Assignments
    const mockAssignments: AssignmentMapping[] = [
      {
        id: 'assign-1',
        da_id: 'da-1',
        client_role_id: 'role-1',
        assignment_type: 'primary',
        assigned_at: '2024-01-15T10:00:00Z',
        workload_percentage: 40,
        status: 'active'
      },
      {
        id: 'assign-2',
        da_id: 'da-3',
        client_role_id: 'role-3',
        assignment_type: 'primary',
        assigned_at: '2024-01-10T14:00:00Z',
        workload_percentage: 50,
        status: 'active'
      },
      {
        id: 'assign-3',
        da_id: 'da-4',
        client_role_id: 'role-3',
        assignment_type: 'secondary',
        assigned_at: '2024-01-12T09:00:00Z',
        workload_percentage: 30,
        status: 'active'
      }
    ];

    // Mock Recommendations
    const mockRecommendations: Recommendation[] = [
      {
        id: 'rec-1',
        da_id: 'da-2',
        client_role_id: 'role-2',
        confidence_score: 0.92,
        reasoning: 'Perfect skill match with Python and Django experience',
        assignment_type: 'primary'
      },
      {
        id: 'rec-2',
        da_id: 'da-4',
        client_role_id: 'role-4',
        confidence_score: 0.88,
        reasoning: 'Strong mobile development background with React Native',
        assignment_type: 'primary'
      }
    ];

    // Mock Performance Metrics
    const mockMetrics: PerformanceMetric[] = [
      {
        da_id: 'da-1',
        metric_type: 'completion_rate',
        value: 94,
        period: 'last_30_days',
        trend: 'up'
      },
      {
        da_id: 'da-2',
        metric_type: 'client_satisfaction',
        value: 4.6,
        period: 'last_quarter',
        trend: 'stable'
      }
    ];

    setDAProfiles(mockDAs);
    setClientRoles(mockRoles);
    setAssignments(mockAssignments);
    setRecommendations(mockRecommendations);
    setPerformanceMetrics(mockMetrics);
    setIsLoading(false);
  };

  const handleDrop = useCallback((daId: string, clientRoleId: string, assignmentType: 'primary' | 'secondary' | 'backup') => {
    const newAssignment: AssignmentMapping = {
      id: `assign-${Date.now()}`,
      da_id: daId,
      client_role_id: clientRoleId,
      assignment_type: assignmentType,
      assigned_at: new Date().toISOString(),
      workload_percentage: assignmentType === 'primary' ? 50 : 30,
      status: 'active'
    };

    setAssignments(prev => [...prev, newAssignment]);

    // Update DA workload
    setDAProfiles(prev => prev.map(da => 
      da.id === daId 
        ? { ...da, current_workload: da.current_workload + newAssignment.workload_percentage }
        : da
    ));

    // Update role assignment status
    setClientRoles(prev => prev.map(role => {
      if (role.id === clientRoleId) {
        const totalAssignments = assignments.filter(a => a.client_role_id === clientRoleId).length + 1;
        const newStatus = totalAssignments >= role.requirements_count ? 'fully_assigned' : 'partially_assigned';
        return { ...role, assignment_status: newStatus };
      }
      return role;
    }));

    console.log(`Assigned DA ${daId} to role ${clientRoleId} as ${assignmentType}`);
  }, [assignments]);

  const handleRemoveAssignment = useCallback((assignmentId: string) => {
    const assignment = assignments.find(a => a.id === assignmentId);
    if (!assignment) return;

    setAssignments(prev => prev.filter(a => a.id !== assignmentId));

    // Update DA workload
    setDAProfiles(prev => prev.map(da => 
      da.id === assignment.da_id 
        ? { ...da, current_workload: Math.max(0, da.current_workload - assignment.workload_percentage) }
        : da
    ));

    // Update role assignment status
    setClientRoles(prev => prev.map(role => {
      if (role.id === assignment.client_role_id) {
        const remainingAssignments = assignments.filter(a => 
          a.client_role_id === assignment.client_role_id && a.id !== assignmentId
        ).length;
        const newStatus = remainingAssignments === 0 ? 'unassigned' : 
                         remainingAssignments >= role.requirements_count ? 'fully_assigned' : 'partially_assigned';
        return { ...role, assignment_status: newStatus };
      }
      return role;
    }));

    console.log(`Removed assignment ${assignmentId}`);
  }, [assignments]);

  const handleBulkAssignment = useCallback((selectedDAIds: string[], targetRoleId: string) => {
    selectedDAIds.forEach((daId, index) => {
      const assignmentType = index === 0 ? 'primary' : 'secondary';
      handleDrop(daId, targetRoleId, assignmentType);
    });
  }, [handleDrop]);

  const refreshData = useCallback(() => {
    loadMockData();
  }, []);

  return {
    daProfiles,
    clientRoles,
    assignments,
    recommendations,
    performanceMetrics,
    handleDrop,
    handleBulkAssignment,
    handleRemoveAssignment,
    isLoading,
    refreshData
  };
};
