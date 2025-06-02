
export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone?: string;
  currentPosition?: string;
  currentEmployer?: string;
  experienceYears?: number;
  location?: string;
  currentStage?: string;
  source?: string;
  status?: string;
  appliedDate?: string;
  skills?: string[];
  resumeUrl?: string;
  notes?: string;
}
