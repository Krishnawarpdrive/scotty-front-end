
import React from 'react';
import { EnhancedPhoneScreeningFormContainer } from './containers/EnhancedPhoneScreeningFormContainer';
import { Candidate } from '../../types/CandidateTypes';

interface EnhancedPhoneScreeningFormProps {
  candidate: Candidate;
}

export const EnhancedPhoneScreeningForm: React.FC<EnhancedPhoneScreeningFormProps> = ({
  candidate
}) => {
  return <EnhancedPhoneScreeningFormContainer candidate={candidate} />;
};
