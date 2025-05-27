
export interface Candidate {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'pending' | 'completed' | 'rejected';
  priority: 'high' | 'medium' | 'low';
  score: number;
  currentStage: number;
  totalStages: number;
  timeInStage: string;
  hiring: string;
  interviewing: string;
  stage: {
    current: number;
    total: number;
  };
  responsible: {
    name: string;
    avatar?: string;
  };
  timeSpent: string;
  targetDate: string;
}
