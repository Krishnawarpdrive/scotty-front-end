
export interface Panelist {
  id: string;
  name: string;
  email: string;
  phone?: string;
  title: string;
  department: string;
  location?: string;
  avatar_url?: string;
  status: 'active' | 'inactive' | 'busy';
  availability_status: 'available' | 'busy' | 'unavailable';
  rating: number;
  total_interviews: number;
  skills: string[];
  languages?: string[];
  timezone?: string;
  years_experience?: number;
  created_at?: string;
  updated_at?: string;
}

export interface CreatePanelistData {
  name: string;
  email: string;
  phone: string;
  title: string;
  department: string;
  location: string;
  status: 'active' | 'inactive' | 'busy';
  availability_status: 'available' | 'busy' | 'unavailable';
  skills: string[];
  languages: string[];
  timezone: string;
  years_experience: number;
}

export interface PanelistFilters {
  searchQuery?: string;
  department?: string;
  status?: string;
  availability?: string;
  skills?: string[];
}
