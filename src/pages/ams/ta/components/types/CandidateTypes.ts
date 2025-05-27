
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
}
