
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CandidateStageData, UserRole } from '../types/CandidateStageTypes';

interface TechnicalInterviewSetupProps {
  candidate: any;
  candidateStageData: CandidateStageData;
  userRole: UserRole;
  stageId: string;
  tabId: string;
}

export const TechnicalInterviewSetup: React.FC<TechnicalInterviewSetupProps> = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Technical Interview Setup</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-500">Technical interview setup component - Coming soon</p>
      </CardContent>
    </Card>
  );
};
