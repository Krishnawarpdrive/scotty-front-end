
import React from 'react';
import { PhoneScreeningForm } from './PhoneScreeningForm';
import { TechnicalInterviewForm } from './TechnicalInterviewForm';
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
        return <PhoneScreeningForm candidate={candidate} />;
      case 'technical':
        return <TechnicalInterviewForm candidate={candidate} />;
      case 'client-interview':
        return <ClientInterviewForm candidate={candidate} />;
      case 'background-verification':
        return <BackgroundVerificationForm candidate={candidate} />;
      case 'final-review':
        return <FinalReviewForm candidate={candidate} />;
      default:
        return <PhoneScreeningForm candidate={candidate} />;
    }
  };

  return (
    <>
      {renderForm()}
    </>
  );
};
