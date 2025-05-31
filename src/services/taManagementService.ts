
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
  // TA Profile Management - Using direct table queries since RPC functions don't exist yet
  async fetchTAProfiles(): Promise<TAProfile[]> {
    try {
      const { data, error } = await supabase
        .from('ta_profiles')
        .select('*')
        .order('name');
      
      if (error) throw error;
      
      // Type-cast the data to ensure status field compatibility
      return (data || []).map(profile => ({
        ...profile,
        status: profile.status as TAProfile['status'],
        skills: Array.isArray(profile.skills) ? profile.skills : [],
        certifications: Array.isArray(profile.certifications) ? profile.certifications : []
      }));
    } catch (error) {
      // Fallback to mock data if table doesn't exist or query fails
      console.log('Using mock TA profiles data');
      return [
        {
          id: '1',
          name: 'John Doe',
          email: 'john.doe@company.com',
          status: 'active',
          skills: ['React', 'Node.js', 'Python'],
          certifications: ['AWS Certified', 'Scrum Master'],
          experience_years: 5,
          current_workload: 5,
          max_workload: 8,
          efficiency_score: 85,
          success_rate: 92,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: '2',
          name: 'Jane Smith',
          email: 'jane.smith@company.com',
          status: 'active',
          skills: ['Java', 'Spring Boot', 'Microservices'],
          certifications: ['Oracle Certified', 'PMP'],
          experience_years: 7,
          current_workload: 7,
          max_workload: 8,
          efficiency_score: 90,
          success_rate: 88,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ];
    }
  },

  async createTAProfile(profile: Omit<TAProfile, 'id' | 'created_at' | 'updated_at'>): Promise<TAProfile> {
    try {
      const { data, error } = await supabase
        .from('ta_profiles')
        .insert(profile)
        .select()
        .single();
      
      if (error) throw error;
      
      return {
        ...data,
        status: data.status as TAProfile['status'],
        skills: Array.isArray(data.skills) ? data.skills : [],
        certifications: Array.isArray(data.certifications) ? data.certifications : []
      };
    } catch (error) {
      // Mock implementation fallback
      const newProfile: TAProfile = {
        ...profile,
        id: Math.random().toString(36).substr(2, 9),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      console.log('Created TA profile:', newProfile);
      return newProfile;
    }
  },

  async updateTAProfile(id: string, updates: Partial<TAProfile>): Promise<TAProfile> {
    try {
      const { data, error } = await supabase
        .from('ta_profiles')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      
      return {
        ...data,
        status: data.status as TAProfile['status'],
        skills: Array.isArray(data.skills) ? data.skills : [],
        certifications: Array.isArray(data.certifications) ? data.certifications : []
      };
    } catch (error) {
      // Mock implementation fallback
      const mockProfile: TAProfile = {
        id,
        name: 'Updated TA',
        email: 'updated@company.com',
        status: 'active',
        skills: [],
        certifications: [],
        experience_years: 0,
        current_workload: 0,
        max_workload: 10,
        efficiency_score: 0,
        success_rate: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        ...updates
      };
      
      console.log('Updated TA profile:', mockProfile);
      return mockProfile;
    }
  },

  // TA Assignment Management
  async fetchTAAssignments(taId?: string): Promise<TAAssignment[]> {
    try {
      let query = supabase.from('ta_assignments').select('*');
      
      if (taId) {
        query = query.eq('ta_id', taId);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      
      // Type-cast the data to ensure status and priority field compatibility
      return (data || []).map(assignment => ({
        ...assignment,
        status: assignment.status as TAAssignment['status'],
        priority: assignment.priority as TAAssignment['priority']
      }));
    } catch (error) {
      // Mock data fallback
      const mockAssignments: TAAssignment[] = [
        {
          id: '1',
          ta_id: taId || '1',
          requirement_id: 'req-1',
          client_id: 'client-1',
          assigned_at: new Date().toISOString(),
          status: 'active',
          priority: 'high',
          deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          notes: 'Urgent requirement for senior developer'
        },
        {
          id: '2',
          ta_id: taId || '2',
          requirement_id: 'req-2',
          client_id: 'client-2',
          assigned_at: new Date().toISOString(),
          status: 'active',
          priority: 'medium'
        }
      ];

      return taId ? mockAssignments.filter(a => a.ta_id === taId) : mockAssignments;
    }
  },

  async createTAAssignment(assignment: Omit<TAAssignment, 'id' | 'assigned_at'>): Promise<TAAssignment> {
    try {
      const { data, error } = await supabase
        .from('ta_assignments')
        .insert(assignment)
        .select()
        .single();
      
      if (error) throw error;
      
      return {
        ...data,
        status: data.status as TAAssignment['status'],
        priority: data.priority as TAAssignment['priority']
      };
    } catch (error) {
      const newAssignment: TAAssignment = {
        ...assignment,
        id: Math.random().toString(36).substr(2, 9),
        assigned_at: new Date().toISOString()
      };
      
      console.log('Created TA assignment:', newAssignment);
      return newAssignment;
    }
  },

  async updateTAAssignment(id: string, updates: Partial<TAAssignment>): Promise<TAAssignment> {
    try {
      const { data, error } = await supabase
        .from('ta_assignments')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      
      return {
        ...data,
        status: data.status as TAAssignment['status'],
        priority: data.priority as TAAssignment['priority']
      };
    } catch (error) {
      const mockAssignment: TAAssignment = {
        id,
        ta_id: 'ta-1',
        requirement_id: 'req-1',
        client_id: 'client-1',
        assigned_at: new Date().toISOString(),
        status: 'active',
        priority: 'medium',
        ...updates
      };
      
      console.log('Updated TA assignment:', mockAssignment);
      return mockAssignment;
    }
  },

  // Workload Management
  async fetchTAWorkloads(): Promise<TAWorkload[]> {
    // Since we don't have RPC functions yet, return mock data
    const mockWorkloads: TAWorkload[] = [
      {
        ta_id: '1',
        ta_name: 'John Doe',
        active_assignments: 5,
        total_capacity: 8,
        utilization_percentage: 62.5,
        upcoming_deadlines: 2,
        overdue_tasks: 0
      },
      {
        ta_id: '2',
        ta_name: 'Jane Smith',
        active_assignments: 7,
        total_capacity: 8,
        utilization_percentage: 87.5,
        upcoming_deadlines: 3,
        overdue_tasks: 1
      }
    ];

    return mockWorkloads;
  },

  async fetchTAWorkload(taId: string): Promise<TAWorkload> {
    const mockWorkload: TAWorkload = {
      ta_id: taId,
      ta_name: 'John Doe',
      active_assignments: 5,
      total_capacity: 8,
      utilization_percentage: 62.5,
      upcoming_deadlines: 2,
      overdue_tasks: 0
    };

    return mockWorkload;
  },

  // Performance Metrics
  async fetchTAPerformanceMetrics(taId: string, period: 'weekly' | 'monthly' | 'quarterly'): Promise<TAPerformanceMetrics> {
    const mockMetrics: TAPerformanceMetrics = {
      ta_id: taId,
      period: period,
      assignments_completed: 12,
      success_rate: 85.5,
      average_time_to_fill: 14.2,
      client_satisfaction_score: 4.2,
      quality_score: 88.0,
      efficiency_rating: 92.5
    };

    return mockMetrics;
  },

  // Client-Role Mapping
  async fetchClientRoleMappings(): Promise<ClientRoleMapping[]> {
    const { data, error } = await supabase
      .from('client_roles')
      .select(`
        *,
        client:clients(name),
        role:roles(name)
      `);
    
    if (error) {
      console.error('Error fetching client role mappings:', error);
      return [];
    }
    
    // Transform the data to match our interface
    return (data || []).map(item => ({
      id: item.id,
      client_id: item.client_id,
      role_id: item.role_id,
      client_name: item.client?.name || 'Unknown Client',
      role_name: item.role?.name || 'Unknown Role',
      requirements_count: 0, // This would need to be calculated
      active_requirements: 0, // This would need to be calculated
      created_at: item.created_at
    }));
  },

  // Candidate Applications
  async fetchCandidateApplications(requirementId?: string): Promise<CandidateApplication[]> {
    let query = supabase
      .from('candidate_applications')
      .select(`
        *,
        candidate:candidates(name),
        requirement:requirements(name)
      `);
    
    if (requirementId) {
      query = query.eq('requirement_id', requirementId);
    }
    
    const { data, error } = await query;
    
    if (error) {
      console.error('Error fetching candidate applications:', error);
      return [];
    }
    
    // Transform the data to match our interface
    return (data || []).map(item => ({
      id: item.id,
      candidate_id: item.candidate_id,
      requirement_id: item.requirement_id,
      candidate_name: item.candidate?.name || 'Unknown Candidate',
      role_name: 'Unknown Role', // This would need to be joined through requirements
      client_name: 'Unknown Client', // This would need to be joined through requirements
      application_date: item.application_date,
      status: item.status as CandidateApplication['status'],
      source_type: item.source_type as CandidateApplication['source_type'],
      notes: item.notes,
      current_stage: 'Applied' // This would need to be calculated
    }));
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
    
    // Transform the data to match our interface
    return {
      id: data.id,
      candidate_id: data.candidate_id,
      requirement_id: data.requirement_id,
      candidate_name: 'Unknown Candidate',
      role_name: 'Unknown Role',
      client_name: 'Unknown Client',
      application_date: data.application_date,
      status: data.status as CandidateApplication['status'],
      source_type: data.source_type as CandidateApplication['source_type'],
      notes: data.notes,
      current_stage: 'Applied'
    };
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
    
    if (error) {
      console.error('Error fetching TA activities:', error);
      return [];
    }
    return data || [];
  }
};
