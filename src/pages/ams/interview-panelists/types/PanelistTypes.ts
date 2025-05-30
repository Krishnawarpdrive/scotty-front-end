
export interface Panelist {
  id: string;
  panelist_id: string; // New field
  name: string;
  email: string;
  phone?: string;
  title: string;
  department: string;
  location?: string;
  bio?: string;
  avatar_url?: string;
  seniority_level: 'junior' | 'mid' | 'senior' | 'principal' | 'executive';
  status: 'active' | 'inactive' | 'on_leave';
  availability_status: 'available' | 'busy' | 'unavailable';
  skills: string[];
  certifications: string[];
  languages: string[];
  interview_types: string[];
  preferred_time_slots: Record<string, string[]>;
  max_interviews_per_week: number;
  interviews_allocated_per_day: number; // New field
  interviews_converted_to_offers: number; // New field
  projects_worked_on: string[]; // New field
  tools_used: string[]; // New field
  interview_authorization_level: 'basic' | 'intermediate' | 'advanced' | 'expert'; // New field
  rating: number;
  total_interviews: number;
  feedback_score: number;
  created_at: string;
  updated_at: string;
}

export interface InterviewSession {
  id: string;
  panelist_id: string;
  candidate_name: string;
  role_name: string;
  client_name: string;
  interview_type: string;
  interview_date: string;
  duration_minutes: number;
  status: 'scheduled' | 'completed' | 'cancelled' | 'no_show';
  panelist_rating?: number;
  candidate_rating?: number;
  feedback?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface PanelistSkill {
  id: string;
  panelist_id: string;
  skill_name: string;
  proficiency_level: 'basic' | 'intermediate' | 'advanced' | 'expert';
  years_experience: number;
  created_at: string;
}

export interface PanelistStats {
  totalPanelists: number;
  activePanelists: number;
  averageRating: number;
  interviewsThisWeek: number;
  utilizationRate: number;
}

export interface PanelistFilters {
  searchQuery?: string;
  department?: string;
  status?: string;
  skills?: string[];
  availability?: string;
  seniority?: string;
}

export interface CreatePanelistData {
  name: string;
  email: string;
  phone?: string;
  title: string;
  department: string;
  location?: string;
  bio?: string;
  seniority_level: Panelist['seniority_level'];
  skills: string[];
  certifications: string[];
  languages: string[];
  interview_types: string[];
  preferred_time_slots: Record<string, string[]>;
  max_interviews_per_week: number;
  interviews_allocated_per_day: number; // New field
  projects_worked_on: string[]; // New field
  tools_used: string[]; // New field
  interview_authorization_level: Panelist['interview_authorization_level']; // New field
}
