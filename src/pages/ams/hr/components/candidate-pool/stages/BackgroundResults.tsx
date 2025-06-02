
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CandidateStageData, UserRole } from '../types/CandidateStageTypes';

interface BackgroundResultsProps {
  candidate: any;
  candidateStageData: CandidateStageData;
  userRole: UserRole;
  stageId: string;
  tabId: string;
}

export const BackgroundResults: React.FC<BackgroundResultsProps> = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Background Results</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-500">Background results component - Coming soon</p>
      </CardContent>
    </Card>
  );
};
