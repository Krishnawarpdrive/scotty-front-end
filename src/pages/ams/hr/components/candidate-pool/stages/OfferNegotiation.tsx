
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CandidateStageData, UserRole } from '../types/CandidateStageTypes';

interface OfferNegotiationProps {
  candidate: any;
  candidateStageData: CandidateStageData;
  userRole: UserRole;
  stageId: string;
  tabId: string;
}

export const OfferNegotiation: React.FC<OfferNegotiationProps> = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Offer Negotiation</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-500">Offer negotiation component - Coming soon</p>
      </CardContent>
    </Card>
  );
};
