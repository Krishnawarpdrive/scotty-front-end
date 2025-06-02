
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CandidateStageData, UserRole } from '../types/CandidateStageTypes';

interface ClientInterviewDetailsProps {
  candidate: any;
  candidateStageData: CandidateStageData;
  userRole: UserRole;
  stageId: string;
  tabId: string;
}

export const ClientInterviewDetails: React.FC<ClientInterviewDetailsProps> = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Client Interview Details</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-500">Client interview details component - Coming soon</p>
      </CardContent>
    </Card>
  );
};
