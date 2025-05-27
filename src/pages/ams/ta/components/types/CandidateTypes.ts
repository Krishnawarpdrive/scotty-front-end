
export interface Candidate {
  id: number;
  name: string;
  email: string;
  role: string;
  hiring: string;
  interviewing: string;
  stage: number;
  score: number;
  priority: 'high' | 'medium' | 'low';
  currentStage: number;
  totalStages: number;
  timeInStage: string;
  responsible: {
    name: string;
    avatar?: string;
  };
  status: {
    text: string;
    type: 'scheduled' | 'awaited' | 'delay' | 'needs' | 'screening';
    time?: string;
    date?: string;
  };
  timeSpent: string;
  targetDate: string;
}
