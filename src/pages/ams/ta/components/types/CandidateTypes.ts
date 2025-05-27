
export interface Candidate {
  id: number;
  name: string;
  role: string;
  hiring: string;
  interviewing: string;
  stage: number;
  responsible: {
    name: string;
    avatar?: string;
  };
  status: {
    text: string;
    type: 'scheduled' | 'awaited' | 'delay' | 'needs' | 'screening';
    time?: string;
    date?: string;
  };
  timeSpent: string;
  targetDate: string;
}
