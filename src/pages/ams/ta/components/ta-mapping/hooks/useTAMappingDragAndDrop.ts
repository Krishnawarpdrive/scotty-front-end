
import { useState, useEffect, useCallback } from 'react';
import { TAProfile, ClientRole, AssignmentMapping } from '../TAMappingInterface';

interface Recommendation {
  id: string;
  ta_id: string;
  client_role_id: string;
  confidence_score: number;
  reasoning: string;
  assignment_type: 'primary' | 'secondary' | 'backup';
}

interface PerformanceMetric {
  ta_id: string;
  metric_type: string;
  value: number;
  period: string;
  trend: 'up' | 'down' | 'stable';
}

export const useTAMappingDragAndDrop = () => {
  const [taProfiles, setTAProfiles] = useState<TAProfile[]>([]);
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
    
    // Mock TA Profiles
    const mockTAs: TAProfile[] = [
      {
        id: 'ta-1',
        name: 'Sarah Chen',
        email: 'sarah.chen@company.com',
        skills: ['Technical Recruiting', 'IT Sourcing', 'Candidate Assessment', 'Client Management'],
        experience_years: 5,
        current_workload: 65,
        max_capacity: 100,
        performance_score: 92,
        availability_status: 'available',
        specializations: ['Frontend Recruiting', 'Full Stack Roles'],
        location: 'San Francisco, CA',
        timezone: 'PST'
      },
      {
        id: 'ta-2',
        name: 'Mike Rodriguez',
        email: 'mike.rodriguez@company.com',
        skills: ['Backend Recruiting', 'Database Specialists', 'DevOps Hiring', 'Team Leadership'],
        experience_years: 7,
        current_workload: 80,
        max_capacity: 100,
        performance_score: 88,
        availability_status: 'busy',
        specializations: ['Backend Development', 'System Architecture'],
        location: 'Austin, TX',
        timezone: 'CST'
      },
      {
        id: 'ta-3',
        name: 'Emily Watson',
        email: 'emily.watson@company.com',
        skills: ['Enterprise Recruiting', 'Senior Level Hiring', 'Client Relations', 'Strategic Planning'],
        experience_years: 6,
        current_workload: 45,
        max_capacity: 100,
        performance_score: 95,
        availability_status: 'available',
        specializations: ['Enterprise Sales', 'Leadership Roles'],
        location: 'New York, NY',
        timezone: 'EST'
      },
      {
        id: 'ta-4',
        name: 'David Kim',
        email: 'david.kim@company.com',
        skills: ['Mobile App Recruiting', 'Startup Hiring', 'Fast-paced Environments', 'Culture Fit'],
        experience_years: 4,
        current_workload: 30,
        max_capacity: 100,
        performance_score: 87,
        availability_status: 'available',
        specializations: ['Mobile Development', 'Startup Ecosystem'],
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
        assigned_tas: ['ta-1']
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
        assigned_tas: []
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
        assigned_tas: ['ta-3', 'ta-4']
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
        assigned_tas: []
      }
    ];

    // Mock Assignments
    const mockAssignments: AssignmentMapping[] = [
      {
        id: 'assign-1',
        ta_id: 'ta-1',
        client_role_id: 'role-1',
        assignment_type: 'primary',
        assigned_at: '2024-01-15T10:00:00Z',
        workload_percentage: 40,
        status: 'active'
      },
      {
        id: 'assign-2',
        ta_id: 'ta-3',
        client_role_id: 'role-3',
        assignment_type: 'primary',
        assigned_at: '2024-01-10T14:00:00Z',
        workload_percentage: 50,
        status: 'active'
      },
      {
        id: 'assign-3',
        ta_id: 'ta-4',
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
        ta_id: 'ta-2',
        client_role_id: 'role-2',
        confidence_score: 0.92,
        reasoning: 'Perfect skill match with backend recruiting experience',
        assignment_type: 'primary'
      },
      {
        id: 'rec-2',
        ta_id: 'ta-4',
        client_role_id: 'role-4',
        confidence_score: 0.88,
        reasoning: 'Strong mobile development recruiting background',
        assignment_type: 'primary'
      }
    ];

    // Mock Performance Metrics
    const mockMetrics: PerformanceMetric[] = [
      {
        ta_id: 'ta-1',
        metric_type: 'placement_rate',
        value: 94,
        period: 'last_30_days',
        trend: 'up'
      },
      {
        ta_id: 'ta-2',
        metric_type: 'client_satisfaction',
        value: 4.6,
        period: 'last_quarter',
        trend: 'stable'
      }
    ];

    setTAProfiles(mockTAs);
    setClientRoles(mockRoles);
    setAssignments(mockAssignments);
    setRecommendations(mockRecommendations);
    setPerformanceMetrics(mockMetrics);
    setIsLoading(false);
  };

  const handleDrop = useCallback((taId: string, clientRoleId: string, assignmentType: 'primary' | 'secondary' | 'backup') => {
    const newAssignment: AssignmentMapping = {
      id: `assign-${Date.now()}`,
      ta_id: taId,
      client_role_id: clientRoleId,
      assignment_type: assignmentType,
      assigned_at: new Date().toISOString(),
      workload_percentage: assignmentType === 'primary' ? 50 : 30,
      status: 'active'
    };

    setAssignments(prev => [...prev, newAssignment]);

    // Update TA workload
    setTAProfiles(prev => prev.map(ta => 
      ta.id === taId 
        ? { ...ta, current_workload: ta.current_workload + newAssignment.workload_percentage }
        : ta
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

    console.log(`Assigned TA ${taId} to role ${clientRoleId} as ${assignmentType}`);
  }, [assignments]);

  const handleRemoveAssignment = useCallback((assignmentId: string) => {
    const assignment = assignments.find(a => a.id === assignmentId);
    if (!assignment) return;

    setAssignments(prev => prev.filter(a => a.id !== assignmentId));

    // Update TA workload
    setTAProfiles(prev => prev.map(ta => 
      ta.id === assignment.ta_id 
        ? { ...ta, current_workload: Math.max(0, ta.current_workload - assignment.workload_percentage) }
        : ta
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

  const handleBulkAssignment = useCallback((selectedTAIds: string[], targetRoleId: string) => {
    selectedTAIds.forEach((taId, index) => {
      const assignmentType = index === 0 ? 'primary' : 'secondary';
      handleDrop(taId, targetRoleId, assignmentType);
    });
  }, [handleDrop]);

  const refreshData = useCallback(() => {
    loadMockData();
  }, []);

  return {
    taProfiles,
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
