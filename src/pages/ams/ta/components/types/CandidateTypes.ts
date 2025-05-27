
export interface Candidate {
  id: number;
  name: string;
  email: string;
  role: string;
  status: {
    text: string;
    type: 'pending' | 'approved' | 'rejected' | 'interview';
  };
  stage: string;
  priority: 'High' | 'Medium' | 'Low';
  appliedDate: string;
  experience: string;
  location: string;
  skills: string[];
  phone?: string;
  avatar?: string;
}

export interface TimelineItemData {
  id: string;
  title: string;
  date: string;
  status: 'completed' | 'in-progress' | 'pending';
  description: string;
}
