
import React from 'react';
import { Box } from '@mui/material';
import { PhoneScreeningHeader } from '../sections/PhoneScreeningHeader';
import { EnhancedPhoneScreeningFormContent } from '../EnhancedPhoneScreeningFormContent';
import { PhoneScreeningFormActions } from '../sections/PhoneScreeningFormActions';
import { usePhoneScreeningForm } from '../hooks/usePhoneScreeningForm';
import { Candidate } from '../../../types/CandidateTypes';

interface EnhancedPhoneScreeningFormContainerProps {
  candidate: Candidate;
}

export const EnhancedPhoneScreeningFormContainer: React.FC<EnhancedPhoneScreeningFormContainerProps> = ({
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

        <Box sx={{ 
          bgcolor: 'white', 
          borderRadius: '8px', 
          border: '1px solid #e2e8f0',
          overflow: 'hidden'
        }}>
          <EnhancedPhoneScreeningFormContent
            candidate={candidate}
            formData={formData}
            onFieldChange={handleFieldChange}
          />
        </Box>
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
