
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CandidateStageData, UserRole } from '../types/CandidateStageTypes';

interface TechnicalAssessmentProps {
  candidate: any;
  candidateStageData: CandidateStageData;
  userRole: UserRole;
  stageId: string;
  tabId: string;
}

export const TechnicalAssessment: React.FC<TechnicalAssessmentProps> = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Technical Assessment</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-500">Technical assessment component - Coming soon</p>
      </CardContent>
    </Card>
  );
};
