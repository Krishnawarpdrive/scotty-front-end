
export interface AptitudeTest {
  id: string;
  test_name: string;
  description?: string;
  duration_minutes: number;
  total_questions: number;
  passing_score: number;
  category: string;
  difficulty_level: 'easy' | 'medium' | 'hard';
  skills_assessed: string[];
  instructions?: string;
  is_active: boolean;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface AptitudeTestSection {
  id: string;
  aptitude_test_id: string;
  section_name: string;
  section_type: string;
  questions_count: number;
  time_limit_minutes?: number;
  weightage: number;
  description?: string;
  created_at: string;
}

export interface CandidateAptitudeResult {
  id: string;
  candidate_id: string;
  aptitude_test_id: string;
  score: number;
  total_questions_attempted: number;
  correct_answers: number;
  time_taken_minutes?: number;
  test_started_at?: string;
  test_completed_at?: string;
  detailed_results: Record<string, any>;
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  administered_by?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface CandidateSectionScore {
  id: string;
  result_id: string;
  section_id: string;
  score: number;
  questions_attempted: number;
  correct_answers: number;
  time_taken_minutes?: number;
  created_at: string;
}

export interface AptitudeTestWithSections extends AptitudeTest {
  sections: AptitudeTestSection[];
}

export interface AptitudeTestFormData {
  test_name: string;
  description?: string;
  duration_minutes: number;
  total_questions: number;
  passing_score: number;
  category: string;
  difficulty_level: 'easy' | 'medium' | 'hard';
  skills_assessed: string[];
  instructions?: string;
  is_active: boolean;
  sections: Omit<AptitudeTestSection, 'id' | 'aptitude_test_id' | 'created_at'>[];
}
