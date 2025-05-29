
export interface Candidate {
  id: number;
  name: string;
  email: string;
  role: string;
  status: {
    text: string;
    type: 'pending' | 'approved' | 'rejected' | 'interview' | 'scheduled' | 'awaited' | 'delay' | 'needs' | 'screening';
    time?: string;
    date?: string;
  };
  stage: string;
  priority: 'High' | 'Medium' | 'Low';
  appliedDate: string;
  experience: string;
  location: string;
  skills: string[];
  phone?: string;
  avatar?: string;
  // Additional properties for enhanced functionality
  score?: number;
  currentStage?: number;
  totalStages?: number;
  timeInStage?: string;
  hiring?: string;
  interviewing?: string;
  responsible?: {
    name: string;
    avatar?: string;
  };
  timeSpent?: string;
  targetDate?: string;
  // Missing properties that caused errors
  currentRole?: string;
  currentCompany?: string;
  appliedRole?: string;
}

export interface TimelineItemData {
  id: string;
  title: string;
  date: string;
  status: 'completed' | 'in-progress' | 'pending';
  description: string;
}
