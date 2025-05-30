
export interface InterviewSchedule {
  id: string;
  candidate_id: string;
  requirement_id?: string;
  panelist_id?: string;
  scheduled_date: string;
  duration_minutes: number;
  interview_type: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'rescheduled';
  timezone: string;
  meeting_link?: string;
  location?: string;
  notes?: string;
  created_by: string;
  created_at: string;
  updated_at: string;
  metadata?: Record<string, any>;
}

export interface InterviewTemplate {
  id: string;
  name: string;
  interview_type: string;
  duration_minutes: number;
  questions: string[];
  checklist_items: string[];
  required_skills: string[];
  is_active: boolean;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface CandidatePreferences {
  id: string;
  candidate_id: string;
  preferred_timezone: string;
  preferred_days: number[];
  preferred_time_slots: Array<{ start: string; end: string }>;
  blackout_dates: string[];
  communication_preferences: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface PanelistAvailability {
  id: string;
  panelist_id: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
  timezone: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Panelist {
  id: string;
  panelist_id: string;
  name: string;
  email: string;
  phone?: string;
  title: string;
  department: string;
  location?: string;
  bio?: string;
  avatar_url?: string;
  seniority_level: string;
  status: string;
  availability_status: string;
  interview_authorization_level?: string;
  rating: number;
  total_interviews: number;
  feedback_score: number;
  skills: string[];
  certifications: string[];
  languages: string[];
  interview_types: string[];
  preferred_time_slots: Record<string, any>;
  max_interviews_per_week: number;
  interviews_converted_to_offers: number;
  interviews_allocated_per_day: number;
  projects_worked_on: string[];
  tools_used: string[];
  created_at: string;
  updated_at: string;
}
