
export interface TAContribution {
  name: string;
  initials: string;
  contribution: number;
  target: number;
  progress: number;
  status: 'done' | 'on-track' | 'behind' | 'feedback-pending' | 'at-risk';
  insight: string;
  avgDelay: string;
  roles: string[];
  candidates: string[];
  hasConflicts: boolean;
}

export interface GoalData {
  title: string;
  target: number;
  achieved: number;
  taContributions?: TAContribution[];
  details?: Array<{
    role: string;
    client: string;
    ta: string;
    status: string;
  }>;
  pending?: Array<{
    candidate: string;
    role: string;
    ta: string;
    days: number;
  }>;
}

export interface WeeklyGoalsDetailDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  goalType: string | null;
}
