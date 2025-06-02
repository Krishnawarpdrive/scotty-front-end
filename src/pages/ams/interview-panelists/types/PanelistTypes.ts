
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
  status: 'active' | 'inactive' | 'on_leave';
  availability_status: 'available' | 'busy' | 'unavailable';
  seniority_level: 'junior' | 'mid' | 'senior' | 'principal' | 'executive';
  rating: number;
  total_interviews: number;
  feedback_score: number;
  skills: string[];
  certifications: string[];
  languages?: string[];
  interview_types: string[];
  interview_authorization_level: 'basic' | 'intermediate' | 'advanced' | 'expert';
  timezone?: string;
  years_experience?: number;
  max_interviews_per_week: number;
  interviews_allocated_per_day: number;
  interviews_converted_to_offers: number;
  projects_worked_on: string[];
  tools_used: string[];
  preferred_time_slots: Record<string, string[]>;
  created_at?: string;
  updated_at?: string;
}

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

export interface PanelistFilters {
  searchQuery?: string;
  department?: string;
  status?: string;
  availability?: string;
  seniority?: string;
  skills?: string[];
}

export interface PanelistStats {
  totalPanelists: number;
  activePanelists: number;
  averageRating: number;
  interviewsThisWeek: number;
  utilizationRate: number;
}
