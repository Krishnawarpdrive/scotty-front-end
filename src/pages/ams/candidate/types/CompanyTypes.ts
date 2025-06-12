
import { ApplicationStage } from './SharedApplicationTypes';

export interface CompanyApplication {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  appliedDate: string;
  status: 'active' | 'rejected' | 'offer' | 'withdrawn'; // Kept consistent with CandidateApplication
  roleName: string; // Required for CompanyApplication
  companyName: string; // Required for CompanyApplication
  currentStage: string; // Made required to match CandidateApplication
  progress: number; // Made required to match CandidateApplication
  priority?: 'high' | 'medium' | 'low';
  nextAction?: string;
  daysInStage?: number;
  hasPendingActions?: boolean;
  alertReason?: string;
  nextDueDate?: string;
  stages: ApplicationStage[]; // Made required (not optional) to fix type compatibility
}
