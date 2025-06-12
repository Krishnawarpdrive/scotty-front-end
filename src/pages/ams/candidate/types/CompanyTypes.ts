
export interface CompanyApplication {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  appliedDate: string;
  status: 'active' | 'pending' | 'rejected' | 'offer';
  roleName: string; // Required for CompanyApplication
  companyName: string; // Required for CompanyApplication
  currentStage?: string;
  progress?: number;
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
