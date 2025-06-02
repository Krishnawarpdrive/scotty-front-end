
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CandidateStageData, UserRole } from '../types/CandidateStageTypes';

interface DocumentVerificationProps {
  candidate: any;
  candidateStageData: CandidateStageData;
  userRole: UserRole;
  stageId: string;
  tabId: string;
}

export const DocumentVerification: React.FC<DocumentVerificationProps> = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Document Verification</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-500">Document verification component - Coming soon</p>
      </CardContent>
    </Card>
  );
};
