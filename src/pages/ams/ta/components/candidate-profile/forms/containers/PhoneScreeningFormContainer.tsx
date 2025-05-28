
import React from 'react';
import { Box } from '@mui/material';
import { PhoneScreeningHeader } from '../sections/PhoneScreeningHeader';
import { PhoneScreeningFormContent } from './PhoneScreeningFormContent';
import { PhoneScreeningFormActions } from '../sections/PhoneScreeningFormActions';
import { usePhoneScreeningForm } from '../hooks/usePhoneScreeningForm';
import { Candidate } from '../../types/CandidateTypes';

interface PhoneScreeningFormContainerProps {
  candidate: Candidate;
}

export const PhoneScreeningFormContainer: React.FC<PhoneScreeningFormContainerProps> = ({
  candidate
}) => {
  const {
    formData,
    hasChanges,
    isSubmitting,
    handleFieldChange,
    handleSave,
    handleSubmit,
    handleGenerateReport
  } = usePhoneScreeningForm(candidate);

  return (
    <Box sx={{ 
      fontFamily: 'Rubik, sans-serif',
      minHeight: '100vh',
      bgcolor: '#fafbfc'
    }}>
      <Box sx={{ maxWidth: '1200px', mx: 'auto', p: 3 }}>
        <PhoneScreeningHeader
          candidateName={formData.candidateName}
          phoneNumber={formData.phoneNumber}
          scheduledDate={formData.scheduledDate}
          duration={formData.duration}
          status={formData.status}
        />

        <PhoneScreeningFormContent
          formData={formData}
          onFieldChange={handleFieldChange}
        />
      </Box>

      <PhoneScreeningFormActions
        onSave={handleSave}
        onSubmit={handleSubmit}
        onGenerateReport={handleGenerateReport}
        isSubmitting={isSubmitting}
        hasChanges={hasChanges}
      />
    </Box>
  );
};
