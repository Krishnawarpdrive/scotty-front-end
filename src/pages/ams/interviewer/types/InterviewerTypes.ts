
export interface InterviewPanelist {
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
  skills: any[];
  certifications: any[];
  languages: any[];
  interview_types: any[];
  preferred_time_slots: any;
  max_interviews_per_week: number;
  rating: number;
  total_interviews: number;
  feedback_score: number;
  interviews_converted_to_offers: number;
  interviews_allocated_per_day: number;
  projects_worked_on: any[];
  tools_used: any[];
  years_experience: number;
  interview_authorization_level: string;
  timezone: string;
  // Gamification fields
  total_points?: number;
  current_level?: number;
  xp_to_next_level?: number;
  monthly_interview_goal?: number;
  weekly_feedback_goal?: number;
  created_at: string;
  updated_at: string;
}

export interface InterviewerMetric {
  id: string;
  panelist_id: string;
  metric_type: string;
  metric_value: number;
  period_start: string;
  period_end: string;
  metadata: any;
  created_at: string;
  updated_at: string;
}

export interface InterviewerAchievement {
  id: string;
  panelist_id: string;
  achievement_type: string;
  achievement_name: string;
  description?: string;
  icon?: string;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
  points_awarded: number;
  unlocked_at: string;
  metadata: any;
  created_at: string;
}

export interface InterviewerStreak {
  id: string;
  panelist_id: string;
  streak_type: string;
  current_streak: number;
  longest_streak: number;
  last_activity_date?: string;
  streak_data: any;
  created_at: string;
  updated_at: string;
}

export interface LeaderboardEntry {
  id: string;
  panelist_id: string;
  period_type: string;
  period_start: string;
  period_end: string;
  rank_position: number;
  total_points: number;
  category: string;
  metadata: any;
  created_at: string;
  // Joined data
  panelist?: InterviewPanelist;
}
