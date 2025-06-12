import { useState, useEffect, useCallback } from 'react';
import { taManagementService } from '@/services/taManagementService';
import { 
  TAProfile, 
  TAAssignment 
} from '@/types/TAManagementTypes';

interface WorkloadData {
  id: string;
  ta_id: string;
  role_id: string;
  week_start_date: string;
  target_candidates: number;
  actual_candidates: number;
  target_interviews: number;
  actual_interviews: number;
  target_closures: number;
  actual_closures: number;
  efficiency_score: number;
}

interface RoleTarget {
  id: string;
  role_id: string;
  target_type: string;
  candidates_target: number;
  interviews_target: number;
  closures_target: number;
  target_period_start: string;
  target_period_end: string;
}

interface AssignmentMetric {
  id: string;
  assignment_id: string;
  metric_type: string;
  target_value: number;
  actual_value: number;
  measurement_period_start: string;
  measurement_period_end: string;
}

interface TACollaboration {
  id: string;
  primary_ta_id: string;
  secondary_ta_id: string;
  assignment_id: string;
  collaboration_type: 'primary_secondary' | 'equal_partners' | 'mentor_mentee';
  responsibilities: Record<string, any>;
}

interface PerformanceInsight {
  id: string;
  ta_id: string;
  insight_type: string;
  insight_data: Record<string, any>;
  confidence_score: number;
  generated_at: string;
  is_active: boolean;
}

export const useEnhancedTAMapping = (roleId?: string) => {
  const [taProfiles, setTAProfiles] = useState<TAProfile[]>([]);
  const [assignments, setAssignments] = useState<TAAssignment[]>([]);
  const [workloadData, setWorkloadData] = useState<WorkloadData[]>([]);
  const [roleTargets, setRoleTargets] = useState<RoleTarget[]>([]);
  const [assignmentMetrics, setAssignmentMetrics] = useState<AssignmentMetric[]>([]);
  const [collaborations, setCollaborations] = useState<TACollaboration[]>([]);
  const [performanceInsights, setPerformanceInsights] = useState<PerformanceInsight[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Mock data generators
  const generateMockWorkloadData = useCallback(() => {
    return taProfiles.map(ta => ({
      id: Math.random().toString(36).substr(2, 9),
      ta_id: ta.id,
      role_id: roleId || 'default-role',
      week_start_date: new Date().toISOString().split('T')[0],
      target_candidates: Math.floor(Math.random() * 10) + 5,
      actual_candidates: Math.floor(Math.random() * 8) + 2,
      target_interviews: Math.floor(Math.random() * 8) + 3,
      actual_interviews: Math.floor(Math.random() * 6) + 1,
      target_closures: Math.floor(Math.random() * 3) + 1,
      actual_closures: Math.floor(Math.random() * 2),
      efficiency_score: ta.efficiency_score
    }));
  }, [taProfiles, roleId]);

  const generateMockRoleTargets = useCallback(() => {
    return [
      {
        id: '1',
        role_id: roleId || 'default-role',
        target_type: 'weekly',
        candidates_target: 50,
        interviews_target: 30,
        closures_target: 10,
        target_period_start: new Date().toISOString().split('T')[0],
        target_period_end: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      },
      {
        id: '2',
        role_id: roleId || 'default-role',
        target_type: 'monthly',
        candidates_target: 200,
        interviews_target: 120,
        closures_target: 40,
        target_period_start: new Date().toISOString().split('T')[0],
        target_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      }
    ];
  }, [roleId]);

  const generateMockAssignmentMetrics = useCallback(() => {
    return assignments.flatMap(assignment => [
      {
        id: Math.random().toString(36).substr(2, 9),
        assignment_id: assignment.id,
        metric_type: 'candidates_sourced',
        target_value: 10,
        actual_value: Math.floor(Math.random() * 12),
        measurement_period_start: assignment.assigned_at.split('T')[0],
        measurement_period_end: new Date().toISOString().split('T')[0]
      },
      {
        id: Math.random().toString(36).substr(2, 9),
        assignment_id: assignment.id,
        metric_type: 'interviews_conducted',
        target_value: 5,
        actual_value: Math.floor(Math.random() * 7),
        measurement_period_start: assignment.assigned_at.split('T')[0],
        measurement_period_end: new Date().toISOString().split('T')[0]
      }
    ]);
  }, [assignments]);

  const generateMockCollaborations = useCallback(() => {
    if (taProfiles.length < 2) return [];
    
    return assignments.slice(0, 2).map(assignment => ({
      id: Math.random().toString(36).substr(2, 9),
      primary_ta_id: taProfiles[0].id,
      secondary_ta_id: taProfiles[1].id,
      assignment_id: assignment.id,
      collaboration_type: 'primary_secondary' as const,
      responsibilities: {
        primary: 'Lead sourcing and initial screening',
        secondary: 'Technical assessment and interview coordination'
      }
    }));
  }, [taProfiles, assignments]);

  const generateMockPerformanceInsights = useCallback(() => {
    return taProfiles.map(ta => ({
      id: Math.random().toString(36).substr(2, 9),
      ta_id: ta.id,
      insight_type: 'performance_trend',
      insight_data: {
        trend: ta.efficiency_score > 80 ? 'improving' : 'stable',
        recommendation: ta.efficiency_score > 80 ? 'Continue current approach' : 'Consider additional training',
        key_metrics: {
          efficiency: ta.efficiency_score,
          success_rate: ta.success_rate
        }
      },
      confidence_score: Math.random() * 0.3 + 0.7, // 0.7 to 1.0
      generated_at: new Date().toISOString(),
      is_active: true
    }));
  }, [taProfiles]);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch TA profiles and assignments
      const [profilesData, assignmentsData] = await Promise.all([
        taManagementService.fetchTAProfiles(),
        taManagementService.fetchTAAssignments()
      ]);

      setTAProfiles(profilesData);
      setAssignments(assignmentsData);

      // Generate mock data for other entities
      const mockWorkload = generateMockWorkloadData();
      const mockTargets = generateMockRoleTargets();
      const mockMetrics = generateMockAssignmentMetrics();
      const mockCollabs = generateMockCollaborations();
      const mockInsights = generateMockPerformanceInsights();

      setWorkloadData(mockWorkload);
      setRoleTargets(mockTargets);
      setAssignmentMetrics(mockMetrics);
      setCollaborations(mockCollabs);
      setPerformanceInsights(mockInsights);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
      console.error('Error fetching TA mapping data:', err);
    } finally {
      setLoading(false);
    }
  }, [generateMockWorkloadData, generateMockRoleTargets, generateMockAssignmentMetrics, generateMockCollaborations, generateMockPerformanceInsights]);

  const assignTAToRole = async (taId: string, roleId: string, priority: 'high' | 'medium' | 'low' = 'medium') => {
    try {
      const newAssignment = await taManagementService.createTAAssignment({
        ta_id: taId,
        client_id: 'default-client', // This should come from context
        requirement_id: roleId,
        status: 'active',
        priority,
        assignment_type: 'primary'
      });

      setAssignments(prev => [...prev, newAssignment]);
      return newAssignment;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to assign TA');
      throw err;
    }
  };

  const updateWorkload = async (taId: string, updates: Partial<TAProfile>) => {
    try {
      const updatedProfile = await taManagementService.updateTAProfile(taId, updates);
      setTAProfiles(prev => prev.map(ta => ta.id === taId ? updatedProfile : ta));
      return updatedProfile;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update workload');
      throw err;
    }
  };

  const createCollaboration = async (
    primaryTaId: string, 
    secondaryTaId: string, 
    assignmentId: string, 
    collaborationType: 'primary_secondary' | 'equal_partners' | 'mentor_mentee',
    responsibilities?: Record<string, any>
  ) => {
    try {
      // Mock creation since we don't have the actual service method yet
      const newCollaboration: TACollaboration = {
        id: Math.random().toString(36).substr(2, 9),
        primary_ta_id: primaryTaId,
        secondary_ta_id: secondaryTaId,
        assignment_id: assignmentId,
        collaboration_type: collaborationType,
        responsibilities: responsibilities || {}
      };

      setCollaborations(prev => [...prev, newCollaboration]);
      return newCollaboration;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create collaboration');
      throw err;
    }
  };

  const updateAssignmentStatus = async (assignmentId: string, status: 'active' | 'completed' | 'on_hold') => {
    try {
      const updatedAssignment = await taManagementService.updateTAAssignment(assignmentId, { status });
      setAssignments(prev => prev.map(a => a.id === assignmentId ? updatedAssignment : a));
      return updatedAssignment;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update assignment status');
      throw err;
    }
  };

  const refreshData = useCallback(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    taProfiles,
    assignments,
    workloadData,
    roleTargets,
    assignmentMetrics,
    collaborations,
    performanceInsights,
    loading,
    error,
    actions: {
      assignTAToRole,
      updateWorkload,
      createCollaboration,
      updateAssignmentStatus,
      refreshData
    }
  };
};
