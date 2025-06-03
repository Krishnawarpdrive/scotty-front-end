
import React from 'react';
import { EnhancedPhoneScreeningForm } from './EnhancedPhoneScreeningForm';
import { ComprehensivePhoneScreeningForm } from './ComprehensivePhoneScreeningForm';
import { TechnicalInterviewManager } from './components/TechnicalInterviewManager';
import { AptitudeTestManager } from './components/AptitudeTestManager';
import { ClientInterviewForm } from './ClientInterviewForm';
import { EnhancedBackgroundVerificationForm } from './components/EnhancedBackgroundVerificationForm';
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
        return <ComprehensivePhoneScreeningForm candidate={candidate} />;
      case 'phone-screening-enhanced':
        return <EnhancedPhoneScreeningForm candidate={candidate} />;
      case 'technical':
        return <TechnicalInterviewManager candidate={candidate} />;
      case 'aptitude-test':
        return <AptitudeTestManager candidate={candidate} />;
      case 'client-interview':
        return <ClientInterviewForm candidate={candidate} />;
      case 'background-verification':
        return <EnhancedBackgroundVerificationForm candidate={candidate} />;
      case 'final-review':
        return <FinalReviewForm candidate={candidate} />;
      default:
        return <ComprehensivePhoneScreeningForm candidate={candidate} />;
    }
  };

  return (
    <div style={{ height: '100%', overflow: 'auto' }}>
      {renderForm()}
    </div>
  );
};
