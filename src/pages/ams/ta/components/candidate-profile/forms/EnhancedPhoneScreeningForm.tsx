
import React from 'react';
import { PhoneScreeningFormContainer } from './containers/PhoneScreeningFormContainer';
import { Candidate } from '../../types/CandidateTypes';

interface EnhancedPhoneScreeningFormProps {
  candidate: Candidate;
}

export const EnhancedPhoneScreeningForm: React.FC<EnhancedPhoneScreeningFormProps> = ({
  candidate
}) => {
  return <PhoneScreeningFormContainer candidate={candidate} />;
};
