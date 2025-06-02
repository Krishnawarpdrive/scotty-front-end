
import React from 'react';
import { CandidateStageData, UserRole } from '../types/CandidateStageTypes';
import { PhoneScreeningForm } from '../stages/PhoneScreeningForm';
import { TechnicalInterviewSetup } from '../stages/TechnicalInterviewSetup';
import { TechnicalAssessment } from '../stages/TechnicalAssessment';
import { InterviewFeedback } from '../stages/InterviewFeedback';
import { ClientCoordination } from '../stages/ClientCoordination';
import { ClientInterviewDetails } from '../stages/ClientInterviewDetails';
import { ClientFeedback } from '../stages/ClientFeedback';
import { BackgroundCheckStatus } from '../stages/BackgroundCheckStatus';
import { DocumentVerification } from '../stages/DocumentVerification';
import { BackgroundResults } from '../stages/BackgroundResults';
import { OfferDetails } from '../stages/OfferDetails';
import { OfferNegotiation } from '../stages/OfferNegotiation';
import { OnboardingPrep } from '../stages/OnboardingPrep';
import { StageNotes } from '../stages/StageNotes';
import { StageDocuments } from '../stages/StageDocuments';

interface StageRendererProps {
  stageId: string;
  tabId: string;
  component: string;
  candidate: any;
  candidateStageData: CandidateStageData;
  userRole: UserRole;
}

export const StageRenderer: React.FC<StageRendererProps> = ({
  stageId,
  tabId,
  component,
  candidate,
  candidateStageData,
  userRole
}) => {
  const commonProps = {
    candidate,
    candidateStageData,
    userRole,
    stageId,
    tabId
  };

  switch (component) {
    case 'PhoneScreeningForm':
      return <PhoneScreeningForm {...commonProps} />;
    case 'TechnicalInterviewSetup':
      return <TechnicalInterviewSetup {...commonProps} />;
    case 'TechnicalAssessment':
      return <TechnicalAssessment {...commonProps} />;
    case 'InterviewFeedback':
      return <InterviewFeedback {...commonProps} />;
    case 'ClientCoordination':
      return <ClientCoordination {...commonProps} />;
    case 'ClientInterviewDetails':
      return <ClientInterviewDetails {...commonProps} />;
    case 'ClientFeedback':
      return <ClientFeedback {...commonProps} />;
    case 'BackgroundCheckStatus':
      return <BackgroundCheckStatus {...commonProps} />;
    case 'DocumentVerification':
      return <DocumentVerification {...commonProps} />;
    case 'BackgroundResults':
      return <BackgroundResults {...commonProps} />;
    case 'OfferDetails':
      return <OfferDetails {...commonProps} />;
    case 'OfferNegotiation':
      return <OfferNegotiation {...commonProps} />;
    case 'OnboardingPrep':
      return <OnboardingPrep {...commonProps} />;
    case 'StageNotes':
      return <StageNotes {...commonProps} />;
    case 'StageDocuments':
      return <StageDocuments {...commonProps} />;
    default:
      return (
        <div className="text-center py-8 text-gray-500">
          Component "{component}" not implemented yet
        </div>
      );
  }
};
