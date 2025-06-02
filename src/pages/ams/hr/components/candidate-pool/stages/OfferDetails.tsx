
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CandidateStageData, UserRole } from '../types/CandidateStageTypes';

interface OfferDetailsProps {
  candidate: any;
  candidateStageData: CandidateStageData;
  userRole: UserRole;
  stageId: string;
  tabId: string;
}

export const OfferDetails: React.FC<OfferDetailsProps> = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Offer Details</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-500">Offer details component - Coming soon</p>
      </CardContent>
    </Card>
  );
};
