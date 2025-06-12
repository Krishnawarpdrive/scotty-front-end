
export interface ApplicationStage {
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
}
