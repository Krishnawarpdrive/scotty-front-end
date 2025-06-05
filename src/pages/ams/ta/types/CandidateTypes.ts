
export interface TACandidate {
  id: string;
  name: string;
  email: string;
  phone?: string;
  appliedRoles: AppliedRole[];
  source: 'Direct' | 'Vendor' | 'Referral' | 'Job Board';
  experience: string;
  lastStage: string;
  score?: number;
  status: 'Active' | 'On Hold' | 'Rejected' | 'Hired';
  assignedTA: string;
  nextAction: string;
  lastUpdated: string;
  avatar?: string;
  currentPosition?: string;
  currentCompany?: string;
  location?: string;
  skills: string[];
  documents: CandidateDocument[];
  interviewHistory: InterviewRecord[];
  notes: CandidateNote[];
  timeline: TimelineEvent[];
}

export interface AppliedRole {
  id: string;
  roleName: string;
  clientName: string;
  applicationDate: string;
  currentStage: string;
  progress: number;
  status: 'Active' | 'On Hold' | 'Rejected' | 'Hired';
}

export interface CandidateDocument {
  id: string;
  name: string;
  type: 'Resume' | 'Cover Letter' | 'Portfolio' | 'Certificate' | 'Other';
  url: string;
  uploadedDate: string;
  status: 'Verified' | 'Pending' | 'Rejected';
}

export interface InterviewRecord {
  id: string;
  roleName: string;
  interviewType: string;
  date: string;
  interviewer: string;
  status: 'Scheduled' | 'Completed' | 'Cancelled';
  feedback?: string;
  rating?: number;
}

export interface CandidateNote {
  id: string;
  note: string;
  author: string;
  date: string;
  type: 'General' | 'Interview' | 'Feedback' | 'Internal';
}

export interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  type: 'Application' | 'Interview' | 'Status Change' | 'Document' | 'Note';
  icon: string;
}
