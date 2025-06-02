
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CandidateStageData, UserRole } from '../types/CandidateStageTypes';

interface ClientCoordinationProps {
  candidate: any;
  candidateStageData: CandidateStageData;
  userRole: UserRole;
  stageId: string;
  tabId: string;
}

export const ClientCoordination: React.FC<ClientCoordinationProps> = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Client Coordination</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-500">Client coordination component - Coming soon</p>
      </CardContent>
    </Card>
  );
};
