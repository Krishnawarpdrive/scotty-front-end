
export interface ScheduledInterview {
  id: string;
  candidate_id: string;
  scheduled_date: string;
  duration_minutes: number;
  interview_type: string;
  status: string;
  meeting_link?: string;
  location?: string;
  notes?: string;
  candidate?: {
    name: string;
    email: string;
  } | null;
}

export interface InterviewScheduleProps {
  panelistId?: string;
}
