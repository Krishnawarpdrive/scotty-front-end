
export interface CreatePanelistData {
  panelist_id: string;
  name: string;
  email: string;
  phone: string;
  title: string;
  department: string;
  location: string;
  bio: string;
  status: 'active' | 'inactive' | 'on_leave';
  availability_status: 'available' | 'busy' | 'unavailable';
  seniority_level: 'junior' | 'mid' | 'senior' | 'principal' | 'executive';
  skills: string[];
  certifications: string[];
  languages: string[];
  interview_types: string[];
  preferred_time_slots: Record<string, string[]>;
  max_interviews_per_week: number;
  interviews_allocated_per_day: number;
  projects_worked_on: string[];
  tools_used: string[];
  interview_authorization_level: 'basic' | 'intermediate' | 'advanced' | 'expert';
  timezone: string;
  years_experience: number;
}

export interface Panelist extends CreatePanelistData {
  id: string;
  created_at: string;
  updated_at: string;
}

export interface PanelistFormData extends CreatePanelistData {}
