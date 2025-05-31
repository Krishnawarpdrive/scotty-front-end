
import React from 'react';
import { EnhancedPhoneScreeningForm } from './EnhancedPhoneScreeningForm';
import { OptimizedTechnicalInterviewForm } from './components/OptimizedTechnicalInterviewForm';
import { ClientInterviewForm } from './ClientInterviewForm';
import { BackgroundVerificationForm } from './BackgroundVerificationForm';
import { FinalReviewForm } from './FinalReviewForm';
import { Candidate } from '../../types/CandidateTypes';

interface StageFormRendererProps {
  candidate: Candidate;
  stageId: string;
  stageName: string;
}

export const StageFormRenderer: React.FC<StageFormRendererProps> = ({
  candidate,
  stageId,
  stageName
}) => {
  const renderForm = () => {
    switch (stageId) {
      case 'phone-screening':
        return <EnhancedPhoneScreeningForm candidate={candidate} />;
      case 'technical':
        return <OptimizedTechnicalInterviewForm candidate={candidate} />;
      case 'client-interview':
        return <ClientInterviewForm candidate={candidate} />;
      case 'background-verification':
        return <BackgroundVerificationForm candidate={candidate} />;
      case 'final-review':
        return <FinalReviewForm candidate={candidate} />;
      default:
        return <EnhancedPhoneScreeningForm candidate={candidate} />;
    }
  };

  return (
    <div style={{ height: '100%', overflow: 'auto' }}>
      {renderForm()}
    </div>
  );
};
