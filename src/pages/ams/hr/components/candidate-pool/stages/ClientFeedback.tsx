
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CandidateStageData, UserRole } from '../types/CandidateStageTypes';

interface ClientFeedbackProps {
  candidate: any;
  candidateStageData: CandidateStageData;
  userRole: UserRole;
  stageId: string;
  tabId: string;
}

export const ClientFeedback: React.FC<ClientFeedbackProps> = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Client Feedback</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-500">Client feedback component - Coming soon</p>
      </CardContent>
    </Card>
  );
};
