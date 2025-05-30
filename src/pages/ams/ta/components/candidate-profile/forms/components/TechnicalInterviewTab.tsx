
import React from 'react';
import { InterviewStatusManager } from './InterviewStatusManager';
import { InterviewSummaryPanel } from './InterviewSummaryPanel';
import { FeedbackSection } from './FeedbackSection';
import type { Candidate } from '../../../types/CandidateTypes';

export interface InterviewState {
  status: 'not-scheduled' | 'scheduled-pending' | 'feedback-submitted';
  scheduledDate?: string;
  scheduledTime?: string;
  interviewerName?: string;
  meetingLink?: string;
  feedback?: {
    overallRating: number;
    technicalSkills: Record<string, number>;
    notes: string;
    recommendation: 'proceed' | 'hold' | 'reject';
  };
}

interface TechnicalInterviewTabProps {
  candidate: Candidate;
  onSave?: (data: any) => void;
}

export const TechnicalInterviewTab: React.FC<TechnicalInterviewTabProps> = ({
  candidate,
  onSave
}) => {
  const [interviewState, setInterviewState] = React.useState<InterviewState>({
    status: 'not-scheduled'
  });

  const handleScheduleInterview = (scheduleData: any) => {
    setInterviewState({
      status: 'scheduled-pending',
      scheduledDate: scheduleData.date,
      scheduledTime: scheduleData.time,
      interviewerName: scheduleData.interviewer,
      meetingLink: scheduleData.meetingLink
    });
  };

  const handleSubmitFeedback = (feedbackData: any) => {
    setInterviewState(prev => ({
      ...prev,
      status: 'feedback-submitted',
      feedback: feedbackData
    }));
    onSave?.(feedbackData);
  };

  return (
    <div className="space-y-6">
      <InterviewStatusManager
        candidate={candidate}
        interviewState={interviewState}
        onScheduleInterview={handleScheduleInterview}
      />

      {interviewState.status === 'scheduled-pending' && (
        <FeedbackSection
          candidate={candidate}
          interviewState={interviewState}
          onSubmitFeedback={handleSubmitFeedback}
        />
      )}

      {interviewState.status === 'feedback-submitted' && (
        <InterviewSummaryPanel
          candidate={candidate}
          interviewState={interviewState}
          onEdit={() => setInterviewState(prev => ({ ...prev, status: 'scheduled-pending' }))}
        />
      )}
    </div>
  );
};
