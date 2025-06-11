
export interface CandidateApplication {
  id: string;
  roleName: string;
  companyName: string;
  appliedDate: string;
  currentStage: string;
  progress: number;
  status: 'active' | 'inactive' | 'completed';
  priority: 'high' | 'medium' | 'low';
  nextAction: string;
  daysInStage: number;
  hasPendingActions: boolean;
  alertReason: string;
  nextDueDate: string;
  stages: any[];
}

export interface OnboardingProgram {
  id: string;
  name: string;
  description: string;
  status: 'current' | 'completed' | 'upcoming';
  progress: number;
  content: any[];
  nextSteps: string[];
  supportContact: string;
}
