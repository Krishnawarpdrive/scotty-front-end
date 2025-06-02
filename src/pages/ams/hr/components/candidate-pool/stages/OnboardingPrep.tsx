
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CandidateStageData, UserRole } from '../types/CandidateStageTypes';

interface OnboardingPrepProps {
  candidate: any;
  candidateStageData: CandidateStageData;
  userRole: UserRole;
  stageId: string;
  tabId: string;
}

export const OnboardingPrep: React.FC<OnboardingPrepProps> = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Onboarding Preparation</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-500">Onboarding preparation component - Coming soon</p>
      </CardContent>
    </Card>
  );
};
