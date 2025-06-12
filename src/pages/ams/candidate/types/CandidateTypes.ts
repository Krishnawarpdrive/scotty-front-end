
export interface CandidateApplication {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  appliedDate: string;
  status: 'active' | 'pending' | 'rejected' | 'offer';
  roleName?: string;
  companyName?: string;
  currentStage?: string;
  progress?: number;
  priority?: 'high' | 'medium' | 'low';
  nextAction?: string;
  daysInStage?: number;
  hasPendingActions?: boolean;
  alertReason?: string;
  nextDueDate?: string;
  stages?: Array<{
    name: string;
    status: 'completed' | 'current' | 'pending';
    date?: string;
  }>;
}

export interface CandidateStats {
  totalApplications: number;
  activeApplications: number;
  pendingActions: number;
  upcomingInterviews: number;
}
