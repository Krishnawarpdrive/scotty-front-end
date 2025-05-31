
import { supabase } from '@/integrations/supabase/client';
import { 
  TAProfile, 
  TAAssignment, 
  TAWorkload, 
  TAPerformanceMetrics,
  ClientRoleMapping,
  CandidateApplication,
  TADashboardData 
} from '@/types/TAManagementTypes';

export const taManagementService = {
  // TA Profile Management
  async fetchTAProfiles(): Promise<TAProfile[]> {
    const { data, error } = await supabase
      .from('ta_profiles')
      .select('*')
      .order('name');
    
    if (error) throw error;
    return data || [];
  },

  async createTAProfile(profile: Omit<TAProfile, 'id' | 'created_at' | 'updated_at'>): Promise<TAProfile> {
    const { data, error } = await supabase
      .from('ta_profiles')
      .insert([profile])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateTAProfile(id: string, updates: Partial<TAProfile>): Promise<TAProfile> {
    const { data, error } = await supabase
      .from('ta_profiles')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // TA Assignment Management
  async fetchTAAssignments(taId?: string): Promise<TAAssignment[]> {
    let query = supabase
      .from('ta_assignments')
      .select(`
        *,
        requirement:requirements(name, client:clients(name)),
        ta_profile:ta_profiles(name)
      `);
    
    if (taId) {
      query = query.eq('ta_id', taId);
    }
    
    const { data, error } = await query.order('assigned_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  async createTAAssignment(assignment: Omit<TAAssignment, 'id' | 'assigned_at'>): Promise<TAAssignment> {
    const { data, error } = await supabase
      .from('ta_assignments')
      .insert([assignment])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateTAAssignment(id: string, updates: Partial<TAAssignment>): Promise<TAAssignment> {
    const { data, error } = await supabase
      .from('ta_assignments')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Workload Management
  async fetchTAWorkloads(): Promise<TAWorkload[]> {
    const { data, error } = await supabase
      .rpc('get_ta_workloads');
    
    if (error) throw error;
    return data || [];
  },

  async fetchTAWorkload(taId: string): Promise<TAWorkload> {
    const { data, error } = await supabase
      .rpc('get_ta_workload', { ta_id: taId });
    
    if (error) throw error;
    return data;
  },

  // Performance Metrics
  async fetchTAPerformanceMetrics(taId: string, period: 'weekly' | 'monthly' | 'quarterly'): Promise<TAPerformanceMetrics> {
    const { data, error } = await supabase
      .rpc('get_ta_performance_metrics', { 
        ta_id: taId, 
        metric_period: period 
      });
    
    if (error) throw error;
    return data;
  },

  // Client-Role Mapping
  async fetchClientRoleMappings(): Promise<ClientRoleMapping[]> {
    const { data, error } = await supabase
      .from('client_roles')
      .select(`
        *,
        client:clients(name),
        role:roles(name),
        requirements_count:requirements(count)
      `);
    
    if (error) throw error;
    return data || [];
  },

  // Candidate Applications
  async fetchCandidateApplications(requirementId?: string): Promise<CandidateApplication[]> {
    let query = supabase
      .from('candidate_applications')
      .select(`
        *,
        candidate:candidates(name),
        requirement:requirements(name, role:roles(name), client:clients(name))
      `);
    
    if (requirementId) {
      query = query.eq('requirement_id', requirementId);
    }
    
    const { data, error } = await query.order('application_date', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  async updateCandidateApplicationStatus(
    id: string, 
    status: string, 
    notes?: string
  ): Promise<CandidateApplication> {
    const { data, error } = await supabase
      .from('candidate_applications')
      .update({ status, notes, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Dashboard Data
  async fetchTADashboardData(taId: string): Promise<TADashboardData> {
    const [assignments, workload, performance, activities] = await Promise.all([
      this.fetchTAAssignments(taId),
      this.fetchTAWorkload(taId),
      this.fetchTAPerformanceMetrics(taId, 'weekly'),
      this.fetchTAActivities(taId)
    ]);

    const activeAssignments = assignments.filter(a => a.status === 'active').length;
    const completedThisWeek = assignments.filter(a => 
      a.status === 'completed' && 
      new Date(a.assigned_at) >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    ).length;
    const pendingTasks = assignments.filter(a => a.status === 'active').length;
    const upcomingDeadlines = assignments.filter(a => 
      a.deadline && 
      new Date(a.deadline) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    );

    return {
      activeAssignments,
      completedThisWeek,
      pendingTasks,
      successRate: performance.success_rate,
      recentActivities: activities,
      upcomingDeadlines,
      workloadDistribution: [workload],
      performanceMetrics: performance
    };
  },

  async fetchTAActivities(taId: string): Promise<any[]> {
    const { data, error } = await supabase
      .from('activity_logs')
      .select('*')
      .eq('performed_by', taId)
      .order('created_at', { ascending: false })
      .limit(10);
    
    if (error) throw error;
    return data || [];
  }
};
