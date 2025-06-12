
export interface CandidateApplication {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  appliedDate: string;
  status: 'active' | 'pending' | 'rejected' | 'offer';
  roleName: string; // Made required to match CompanyApplication
  companyName: string; // Made required to match CompanyApplication
  currentStage: string; // Made required to match CompanyApplication
  progress: number; // Made required to match CompanyApplication
  priority?: 'high' | 'medium' | 'low';
  nextAction?: string;
  daysInStage?: number;
  hasPendingActions?: boolean;
  alertReason?: string;
  nextDueDate?: string;
  stages?: Array<{
    id: string;
    name: string;
    status: 'completed' | 'current' | 'pending';
    type?: 'document' | 'interview' | 'assessment';
    date?: string;
    completedDate?: string;
    dueDate?: string;
    description?: string;
    duration?: string;
    interviewer?: string;
    location?: string;
    hasAction?: boolean;
    actionType?: string;
    documents?: string[];
    notes?: string;
  }>;
}

export interface CandidateStats {
  totalApplications: number;
  activeApplications: number;
  pendingActions: number;
  upcomingInterviews: number;
}
