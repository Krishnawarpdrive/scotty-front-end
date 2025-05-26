
export interface Stage {
  id: string;
  name: string;
  category: 'internal' | 'external' | 'partner' | 'client' | 'verification';
  order: number;
  config?: any;
}

export interface Interviewer {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface TAAssignment {
  id: string;
  name: string;
  avatar?: string;
}

export interface SchedulingInfo {
  isScheduled: boolean;
  duration?: number; // in minutes
  timeSlot?: string;
  date?: string;
}

export interface StageConfig {
  interviewFormat?: 'one-to-one' | 'panel' | 'group';
  interviewMode?: 'in-person' | 'virtual';
  interviewers?: Interviewer[];
  notes?: string;
  maxCandidatesPerRound?: number;
  candidateInstructions?: string;
}

export interface EnhancedStage extends Stage {
  status: 'configured' | 'partially-configured' | 'not-configured';
  interviewers: Interviewer[];
  taAssigned?: TAAssignment;
  scheduling: SchedulingInfo;
  dueDate?: string;
  missingItems?: string[]; // List of missing configuration items
  config?: StageConfig | any; // Allow both StageConfig and StageConfigUnion
}

export const STAGE_CATEGORIES = {
  internal: { label: 'Internal Interview', color: '#009933' },
  external: { label: 'External Interview', color: '#f57c00' },
  partner: { label: 'Partner Interview', color: '#7b1fa2' },
  client: { label: 'Client Interview', color: '#fbc02d' },
  verification: { label: 'Background Verification', color: '#616161' },
} as const;

export const STAGE_STATUS = {
  configured: { label: 'Configured', color: '#009933' },
  'partially-configured': { label: 'Partially Configured', color: '#f59e0b' },
  'not-configured': { label: 'Not Configured', color: '#dc2626' },
} as const;
