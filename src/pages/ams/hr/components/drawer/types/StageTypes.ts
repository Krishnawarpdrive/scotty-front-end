
export interface Interviewer {
  id: string;
  name: string;
  avatar?: string;
  email: string;
  role?: string;
}

export interface TAAssignment {
  id: string;
  name: string;
  avatar?: string;
  email: string;
}

export interface SchedulingInfo {
  isScheduled: boolean;
  scheduledDate?: string;
  duration?: number; // in minutes
  timeSlot?: string;
}

export interface EnhancedStage {
  id: string;
  name: string;
  category: 'internal' | 'external' | 'partner' | 'client' | 'verification';
  order: number;
  config?: {
    interviewFormat?: 'one-to-one' | 'panel' | 'group';
    interviewers?: Interviewer[];
    notes?: string;
    maxCandidatesPerRound?: number;
    candidateInstructions?: string;
    interviewMode?: 'virtual' | 'in-person';
  };
  interviewers: Interviewer[];
  taAssigned?: TAAssignment;
  scheduling: SchedulingInfo;
  dueDate?: string;
  status: 'configured' | 'partially-configured' | 'not-configured';
  missingItems?: string[];
}
