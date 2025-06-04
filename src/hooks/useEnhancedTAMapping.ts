
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

// Helper function to safely convert Json to string array
const jsonToStringArray = (jsonValue: any): string[] => {
  // If it's null or undefined, return empty array
  if (jsonValue === null || jsonValue === undefined) {
    return [];
  }
  
  // If it's already an array, convert each item to string
  if (Array.isArray(jsonValue)) {
    return jsonValue.map(item => {
      if (typeof item === 'string') return item;
      if (typeof item === 'number') return item.toString();
      if (typeof item === 'boolean') return item.toString();
      if (item === null || item === undefined) return '';
      return JSON.stringify(item);
    });
  }
  
  // If it's a string, try to parse it as JSON array
  if (typeof jsonValue === 'string') {
    try {
      const parsed = JSON.parse(jsonValue);
      if (Array.isArray(parsed)) {
        return jsonToStringArray(parsed);
      }
      // If it's a single string value, return it as array
      return [jsonValue];
    } catch {
      // If parsing fails, treat as single string
      return [jsonValue];
    }
  }
  
  // For other types, convert to string and return as single-item array
  return [String(jsonValue)];
};

export const useEnhancedTAMapping = (roleId?: string) => {
  const [taProfiles, setTAProfiles] = useState<TAProfile[]>([]);
  const [assignments, setAssignments] = useState<TAAssignment[]>([]);
  const [workloadData, setWorkloadData] = useState<WorkloadData[]>([]);
  const [roleTargets, setRoleTargets] = useState<RoleTarget[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchTAProfiles = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('ta_profiles')
        .select('*')
        .eq('status', 'active');

      if (error) throw error;
      
      // Transform and validate the data to match our interface
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
      
      // Transform and validate the data to match our interface
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
        fetchWorkloadData(),
        fetchRoleTargets()
      ]);
    } finally {
      setLoading(false);
    }
  }, [fetchTAProfiles, fetchAssignments, fetchWorkloadData, fetchRoleTargets]);

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

      // Transform the returned data to match our interface
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

      // Transform the returned data to match our interface
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

  // Initial data fetch
  useEffect(() => {
    refreshData();
  }, [refreshData]);

  // Set up real-time subscriptions
  useEffect(() => {
    const channel = supabase
      .channel('ta-mapping-realtime')
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
        table: 'ta_workload_tracking'
      }, () => {
        fetchWorkloadData();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchTAProfiles, fetchAssignments, fetchWorkloadData]);

  return {
    taProfiles,
    assignments,
    workloadData,
    roleTargets,
    loading,
    actions: {
      assignTAToRole,
      updateWorkload,
      refreshData
    }
  };
};
