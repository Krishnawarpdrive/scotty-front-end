
export interface TAProfile {
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

export interface TAAssignment {
  id: string;
  ta_id: string;
  requirement_id: string;
  client_id: string;
  assigned_at: string;
  status: 'active' | 'completed' | 'on_hold';
  priority: 'high' | 'medium' | 'low';
  deadline?: string;
  notes?: string;
}

export interface TAWorkload {
  ta_id: string;
  ta_name: string;
  active_assignments: number;
  total_capacity: number;
  utilization_percentage: number;
  upcoming_deadlines: number;
  overdue_tasks: number;
}

export interface TAPerformanceMetrics {
  ta_id: string;
  period: 'weekly' | 'monthly' | 'quarterly';
  assignments_completed: number;
  success_rate: number;
  average_time_to_fill: number;
  client_satisfaction_score: number;
  quality_score: number;
  efficiency_rating: number;
}

export interface ClientRoleMapping {
  id: string;
  client_id: string;
  role_id: string;
  client_name: string;
  role_name: string;
  requirements_count: number;
  active_requirements: number;
  created_at: string;
}

export interface CandidateApplication {
  id: string;
  candidate_id: string;
  requirement_id: string;
  candidate_name: string;
  role_name: string;
  client_name: string;
  application_date: string;
  status: 'applied' | 'screening' | 'interview' | 'offer' | 'hired' | 'rejected';
  source_type: 'direct' | 'vendor' | 'referral' | 'job_board';
  notes?: string;
  current_stage: string;
}

export interface TADashboardData {
  activeAssignments: number;
  completedThisWeek: number;
  pendingTasks: number;
  successRate: number;
  recentActivities: TAActivity[];
  upcomingDeadlines: TAAssignment[];
  workloadDistribution: TAWorkload[];
  performanceMetrics: TAPerformanceMetrics;
}

export interface TAActivity {
  id: string;
  type: 'assignment' | 'completion' | 'status_change' | 'note_added';
  description: string;
  timestamp: string;
  related_entity_id: string;
  related_entity_type: 'requirement' | 'candidate' | 'client';
}

export interface TAManagementFilters {
  status?: string[];
  skills?: string[];
  clients?: string[];
  dateRange?: {
    start: string;
    end: string;
  };
  workloadRange?: {
    min: number;
    max: number;
  };
}
