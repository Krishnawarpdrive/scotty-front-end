
import { ApplicationStage } from './SharedApplicationTypes';

export interface CandidateApplication {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  appliedDate: string;
  status: 'active' | 'rejected' | 'offer' | 'withdrawn'; // Aligned with CompanyApplication
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
  stages: ApplicationStage[]; // Made required to match CompanyApplication
}

export interface CandidateStats {
  totalApplications: number;
  activeApplications: number;
  pendingActions: number;
  upcomingInterviews: number;
}
