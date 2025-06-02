
export interface RoleApplication {
  id: string;
  role_name: string;
  client_name: string;
  applied_date: string;
  current_stage: string;
  stage_progress: number;
  total_stages: number;
  status: 'Active' | 'On Hold' | 'Rejected' | 'Hired';
  hiring_manager: string;
  ta_assigned: string;
  next_action: string;
  next_action_date: string;
  pipeline_type: 'client' | 'partner' | 'direct';
  priority: 'High' | 'Medium' | 'Low';
  client_logo?: string;
  stages: PipelineStage[];
}

export interface PipelineStage {
  id: string;
  name: string;
  status: 'completed' | 'current' | 'pending' | 'skipped';
  order: number;
  type: 'screening' | 'interview' | 'assessment' | 'background' | 'offer' | 'custom';
  required_actions: string[];
  completed_date?: string;
  estimated_date?: string;
  assigned_to?: string;
  notes?: string;
  documents?: string[];
  interview_details?: InterviewDetails;
}

export interface InterviewDetails {
  scheduled_date?: string;
  duration_minutes: number;
  interviewer: string;
  type: 'phone' | 'video' | 'in-person' | 'technical' | 'behavioral';
  status: 'scheduled' | 'completed' | 'cancelled' | 'rescheduled';
  feedback?: string;
  rating?: number;
  meeting_link?: string;
}

export interface CandidateWithPipelines {
  id: string;
  name: string;
  email: string;
  phone?: string;
  current_position?: string;
  current_employer?: string;
  experience_years: number;
  skills: string[];
  location?: string;
  status: 'Active' | 'Inactive' | 'Blacklisted';
  overall_score?: number;
  resume_url?: string;
  avatar_url?: string;
  role_applications: RoleApplication[];
  notes?: string;
  last_updated: string;
}

export interface StageAction {
  id: string;
  label: string;
  type: 'primary' | 'secondary' | 'danger';
  icon: string;
  requires_confirmation?: boolean;
  confirmation_message?: string;
  requires_input?: boolean;
  input_fields?: Array<{
    name: string;
    type: 'text' | 'date' | 'select' | 'textarea';
    label: string;
    required: boolean;
    options?: string[];
  }>;
}
