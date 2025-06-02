
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CandidateStageData, UserRole } from '../types/CandidateStageTypes';

interface BackgroundCheckStatusProps {
  candidate: any;
  candidateStageData: CandidateStageData;
  userRole: UserRole;
  stageId: string;
  tabId: string;
}

export const BackgroundCheckStatus: React.FC<BackgroundCheckStatusProps> = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Background Check Status</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-500">Background check status component - Coming soon</p>
      </CardContent>
    </Card>
  );
};
