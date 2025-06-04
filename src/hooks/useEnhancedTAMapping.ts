
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface TAAssignment {
  id: string;
  ta_id: string;
  client_id: string;
  requirement_id?: string;
  assigned_at: string;
  status: 'active' | 'completed' | 'on_hold';
  priority: 'high' | 'medium' | 'low';
  assignment_type: string;
  target_completion_date?: string;
  notes?: string;
}

interface TAProfile {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'inactive' | 'on_leave';
  skills: string[];
  certifications: string[];
  experience_years: number;
  current_workload: number;
  max_workload: number;
  efficiency_score: number;
  success_rate: number;
  created_at: string;
  updated_at: string;
}

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

interface TAAssignmentMetrics {
  id: string;
  assignment_id: string;
  metric_type: 'candidates_sourced' | 'interviews_scheduled' | 'offers_made' | 'hires_completed';
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

interface TAPerformanceInsight {
  id: string;
  ta_id: string;
  insight_type: 'strength' | 'improvement_area' | 'recommendation' | 'trend';
  insight_data: Record<string, any>;
  confidence_score: number;
  generated_at: string;
  is_active: boolean;
}

// Helper function to safely convert Json to string array
const jsonToStringArray = (jsonValue: any): string[] => {
  if (jsonValue === null || jsonValue === undefined) {
    return [];
  }
  
  if (Array.isArray(jsonValue)) {
    return jsonValue.map(item => {
      if (typeof item === 'string') return item;
      if (typeof item === 'number') return item.toString();
      if (typeof item === 'boolean') return item.toString();
      if (item === null || item === undefined) return '';
      return JSON.stringify(item);
    });
  }
  
  if (typeof jsonValue === 'string') {
    try {
      const parsed = JSON.parse(jsonValue);
      if (Array.isArray(parsed)) {
        return jsonToStringArray(parsed);
      }
      return [jsonValue];
    } catch {
      return [jsonValue];
    }
  }
  
  return [String(jsonValue)];
};

// Helper function to validate and convert metric_type
const validateMetricType = (value: string): 'candidates_sourced' | 'interviews_scheduled' | 'offers_made' | 'hires_completed' => {
  const validTypes = ['candidates_sourced', 'interviews_scheduled', 'offers_made', 'hires_completed'];
  return validTypes.includes(value) ? value as any : 'candidates_sourced';
};

// Helper function to validate and convert collaboration_type
const validateCollaborationType = (value: string): 'primary_secondary' | 'equal_partners' | 'mentor_mentee' => {
  const validTypes = ['primary_secondary', 'equal_partners', 'mentor_mentee'];
  return validTypes.includes(value) ? value as any : 'primary_secondary';
};

// Helper function to validate and convert insight_type
const validateInsightType = (value: string): 'strength' | 'improvement_area' | 'recommendation' | 'trend' => {
  const validTypes = ['strength', 'improvement_area', 'recommendation', 'trend'];
  return validTypes.includes(value) ? value as any : 'strength';
};

export const useEnhancedTAMapping = (roleId?: string) => {
  const [taProfiles, setTAProfiles] = useState<TAProfile[]>([]);
  const [assignments, setAssignments] = useState<TAAssignment[]>([]);
  const [workloadData, setWorkloadData] = useState<WorkloadData[]>([]);
  const [roleTargets, setRoleTargets] = useState<RoleTarget[]>([]);
  const [assignmentMetrics, setAssignmentMetrics] = useState<TAAssignmentMetrics[]>([]);
  const [collaborations, setCollaborations] = useState<TACollaboration[]>([]);
  const [performanceInsights, setPerformanceInsights] = useState<TAPerformanceInsight[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchTAProfiles = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('ta_profiles')
        .select('*')
        .eq('status', 'active');

      if (error) throw error;
      
      const transformedData: TAProfile[] = (data || []).map(item => ({
        id: item.id,
        name: item.name,
        email: item.email,
        status: (item.status as 'active' | 'inactive' | 'on_leave') || 'active',
        skills: jsonToStringArray(item.skills),
        certifications: jsonToStringArray(item.certifications),
        experience_years: item.experience_years || 0,
        current_workload: item.current_workload || 0,
        max_workload: item.max_workload || 10,
        efficiency_score: item.efficiency_score || 0,
        success_rate: item.success_rate || 0,
        created_at: item.created_at || '',
        updated_at: item.updated_at || ''
      }));
      
      setTAProfiles(transformedData);
    } catch (error) {
      console.error('Error fetching TA profiles:', error);
      toast({
        title: "Error",
        description: "Failed to load TA profiles",
        variant: "destructive",
      });
    }
  }, [toast]);

  const fetchAssignments = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('ta_assignments')
        .select('*')
        .order('assigned_at', { ascending: false });

      if (error) throw error;
      
      const transformedData: TAAssignment[] = (data || []).map(item => ({
        id: item.id,
        ta_id: item.ta_id,
        client_id: item.client_id,
        requirement_id: item.requirement_id,
        assigned_at: item.assigned_at,
        status: (item.status as 'active' | 'completed' | 'on_hold') || 'active',
        priority: (item.priority as 'high' | 'medium' | 'low') || 'medium',
        assignment_type: item.assignment_type,
        target_completion_date: item.target_completion_date,
        notes: item.notes
      }));
      
      setAssignments(transformedData);
    } catch (error) {
      console.error('Error fetching assignments:', error);
      toast({
        title: "Error",
        description: "Failed to load assignments",
        variant: "destructive",
      });
    }
  }, [toast]);

  const fetchAssignmentMetrics = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('ta_assignment_metrics')
        .select('*')
        .order('measurement_period_start', { ascending: false });

      if (error) throw error;
      
      const transformedData: TAAssignmentMetrics[] = (data || []).map(item => ({
        id: item.id,
        assignment_id: item.assignment_id,
        metric_type: validateMetricType(item.metric_type),
        target_value: item.target_value,
        actual_value: item.actual_value,
        measurement_period_start: item.measurement_period_start,
        measurement_period_end: item.measurement_period_end
      }));
      
      setAssignmentMetrics(transformedData);
    } catch (error) {
      console.error('Error fetching assignment metrics:', error);
    }
  }, []);

  const fetchCollaborations = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('ta_collaborations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      const transformedData: TACollaboration[] = (data || []).map(item => ({
        id: item.id,
        primary_ta_id: item.primary_ta_id,
        secondary_ta_id: item.secondary_ta_id,
        assignment_id: item.assignment_id,
        collaboration_type: validateCollaborationType(item.collaboration_type),
        responsibilities: (item.responsibilities as Record<string, any>) || {}
      }));
      
      setCollaborations(transformedData);
    } catch (error) {
      console.error('Error fetching collaborations:', error);
    }
  }, []);

  const fetchPerformanceInsights = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('ta_performance_insights')
        .select('*')
        .eq('is_active', true)
        .order('generated_at', { ascending: false });

      if (error) throw error;
      
      const transformedData: TAPerformanceInsight[] = (data || []).map(item => ({
        id: item.id,
        ta_id: item.ta_id,
        insight_type: validateInsightType(item.insight_type),
        insight_data: (item.insight_data as Record<string, any>) || {},
        confidence_score: item.confidence_score || 0,
        generated_at: item.generated_at,
        is_active: item.is_active || true
      }));
      
      setPerformanceInsights(transformedData);
    } catch (error) {
      console.error('Error fetching performance insights:', error);
    }
  }, []);

  const fetchWorkloadData = useCallback(async () => {
    if (!roleId) return;

    try {
      const { data, error } = await supabase
        .from('ta_workload_tracking')
        .select('*')
        .eq('role_id', roleId)
        .order('week_start_date', { ascending: false });

      if (error) throw error;
      setWorkloadData(data || []);
    } catch (error) {
      console.error('Error fetching workload data:', error);
    }
  }, [roleId]);

  const fetchRoleTargets = useCallback(async () => {
    if (!roleId) return;

    try {
      const { data, error } = await supabase
        .from('role_targets')
        .select('*')
        .eq('role_id', roleId)
        .order('target_period_start', { ascending: false });

      if (error) throw error;
      setRoleTargets(data || []);
    } catch (error) {
      console.error('Error fetching role targets:', error);
    }
  }, [roleId]);

  const refreshData = useCallback(async () => {
    setLoading(true);
    try {
      await Promise.all([
        fetchTAProfiles(),
        fetchAssignments(),
        fetchAssignmentMetrics(),
        fetchCollaborations(),
        fetchPerformanceInsights(),
        fetchWorkloadData(),
        fetchRoleTargets()
      ]);
    } finally {
      setLoading(false);
    }
  }, [fetchTAProfiles, fetchAssignments, fetchAssignmentMetrics, fetchCollaborations, fetchPerformanceInsights, fetchWorkloadData, fetchRoleTargets]);

  const assignTAToRole = useCallback(async (taId: string, assignmentData: Partial<TAAssignment>) => {
    try {
      const { data, error } = await supabase
        .from('ta_assignments')
        .insert({
          ta_id: taId,
          client_id: assignmentData.client_id || '',
          requirement_id: assignmentData.requirement_id,
          assignment_type: 'role',
          status: 'active',
          priority: assignmentData.priority || 'medium',
          target_completion_date: assignmentData.target_completion_date,
          notes: assignmentData.notes
        })
        .select()
        .single();

      if (error) throw error;

      const newAssignment: TAAssignment = {
        id: data.id,
        ta_id: data.ta_id,
        client_id: data.client_id,
        requirement_id: data.requirement_id,
        assigned_at: data.assigned_at,
        status: (data.status as 'active' | 'completed' | 'on_hold') || 'active',
        priority: (data.priority as 'high' | 'medium' | 'low') || 'medium',
        assignment_type: data.assignment_type,
        target_completion_date: data.target_completion_date,
        notes: data.notes
      };

      setAssignments(prev => [...prev, newAssignment]);
      
      toast({
        title: "Success",
        description: "TA assigned successfully",
      });

      return newAssignment;
    } catch (error) {
      console.error('Error assigning TA:', error);
      toast({
        title: "Error",
        description: "Failed to assign TA",
        variant: "destructive",
      });
      throw error;
    }
  }, [toast]);

  const updateWorkload = useCallback(async (taId: string, updates: Partial<TAProfile>): Promise<void> => {
    try {
      const { data, error } = await supabase
        .from('ta_profiles')
        .update(updates)
        .eq('id', taId)
        .select()
        .single();

      if (error) throw error;

      const updatedProfile: TAProfile = {
        id: data.id,
        name: data.name,
        email: data.email,
        status: (data.status as 'active' | 'inactive' | 'on_leave') || 'active',
        skills: jsonToStringArray(data.skills),
        certifications: jsonToStringArray(data.certifications),
        experience_years: data.experience_years || 0,
        current_workload: data.current_workload || 0,
        max_workload: data.max_workload || 10,
        efficiency_score: data.efficiency_score || 0,
        success_rate: data.success_rate || 0,
        created_at: data.created_at || '',
        updated_at: data.updated_at || ''
      };

      setTAProfiles(prev => 
        prev.map(ta => ta.id === taId ? updatedProfile : ta)
      );

      toast({
        title: "Success",
        description: "Workload updated successfully",
      });
    } catch (error) {
      console.error('Error updating workload:', error);
      toast({
        title: "Error",
        description: "Failed to update workload",
        variant: "destructive",
      });
      throw error;
    }
  }, [toast]);

  const createCollaboration = useCallback(async (
    primaryTaId: string, 
    secondaryTaId: string, 
    assignmentId: string, 
    collaborationType: 'primary_secondary' | 'equal_partners' | 'mentor_mentee',
    responsibilities: Record<string, any> = {}
  ) => {
    try {
      const { data, error } = await supabase
        .from('ta_collaborations')
        .insert({
          primary_ta_id: primaryTaId,
          secondary_ta_id: secondaryTaId,
          assignment_id: assignmentId,
          collaboration_type: collaborationType,
          responsibilities
        })
        .select()
        .single();

      if (error) throw error;

      const newCollaboration: TACollaboration = {
        id: data.id,
        primary_ta_id: data.primary_ta_id,
        secondary_ta_id: data.secondary_ta_id,
        assignment_id: data.assignment_id,
        collaboration_type: validateCollaborationType(data.collaboration_type),
        responsibilities: (data.responsibilities as Record<string, any>) || {}
      };

      setCollaborations(prev => [...prev, newCollaboration]);
      
      toast({
        title: "Success",
        description: "Collaboration created successfully",
      });

      return newCollaboration;
    } catch (error) {
      console.error('Error creating collaboration:', error);
      toast({
        title: "Error",
        description: "Failed to create collaboration",
        variant: "destructive",
      });
      throw error;
    }
  }, [toast]);

  const updateAssignmentStatus = useCallback(async (assignmentId: string, status: 'active' | 'completed' | 'on_hold') => {
    try {
      const { error } = await supabase
        .from('ta_assignments')
        .update({ status })
        .eq('id', assignmentId);

      if (error) throw error;

      setAssignments(prev => 
        prev.map(assignment => 
          assignment.id === assignmentId ? { ...assignment, status } : assignment
        )
      );

      toast({
        title: "Success",
        description: "Assignment status updated successfully",
      });
    } catch (error) {
      console.error('Error updating assignment status:', error);
      toast({
        title: "Error",
        description: "Failed to update assignment status",
        variant: "destructive",
      });
      throw error;
    }
  }, [toast]);

  // Initial data fetch
  useEffect(() => {
    refreshData();
  }, [refreshData]);

  // Set up real-time subscriptions
  useEffect(() => {
    const channel = supabase
      .channel('enhanced-ta-mapping-realtime')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'ta_profiles'
      }, () => {
        fetchTAProfiles();
      })
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'ta_assignments'
      }, () => {
        fetchAssignments();
      })
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'ta_assignment_metrics'
      }, () => {
        fetchAssignmentMetrics();
      })
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'ta_collaborations'
      }, () => {
        fetchCollaborations();
      })
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'ta_performance_insights'
      }, () => {
        fetchPerformanceInsights();
      })
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'ta_workload_tracking'
      }, () => {
        fetchWorkloadData();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchTAProfiles, fetchAssignments, fetchAssignmentMetrics, fetchCollaborations, fetchPerformanceInsights, fetchWorkloadData]);

  return {
    taProfiles,
    assignments,
    workloadData,
    roleTargets,
    assignmentMetrics,
    collaborations,
    performanceInsights,
    loading,
    actions: {
      assignTAToRole,
      updateWorkload,
      createCollaboration,
      updateAssignmentStatus,
      refreshData
    }
  };
};
