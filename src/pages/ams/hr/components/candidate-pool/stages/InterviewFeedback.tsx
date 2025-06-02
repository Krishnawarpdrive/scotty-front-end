
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CandidateStageData, UserRole } from '../types/CandidateStageTypes';

interface InterviewFeedbackProps {
  candidate: any;
  candidateStageData: CandidateStageData;
  userRole: UserRole;
  stageId: string;
  tabId: string;
}

export const InterviewFeedback: React.FC<InterviewFeedbackProps> = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Interview Feedback</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-500">Interview feedback component - Coming soon</p>
      </CardContent>
    </Card>
  );
};
