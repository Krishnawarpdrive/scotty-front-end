
import React from 'react';
import { InterviewSchedulerCore } from './components/InterviewSchedulerCore';
import type { InterviewSchedule } from './InterviewSchedulingService';

interface EnhancedInterviewSchedulerProps {
  candidateId: string;
  requirementId?: string;
  onScheduleComplete?: (schedule: InterviewSchedule) => void;
  onCancel?: () => void;
}

export const EnhancedInterviewScheduler: React.FC<EnhancedInterviewSchedulerProps> = (props) => {
  return <InterviewSchedulerCore {...props} />;
};
