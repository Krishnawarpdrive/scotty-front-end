
import React, { useState } from 'react';
import { Box, Typography, Divider } from '@mui/material';
import { PhoneScreeningBasicInfo } from './sections/PhoneScreeningBasicInfo';
import { PhoneScreeningOutcome } from './sections/PhoneScreeningOutcome';
import { PhoneScreeningActions } from './sections/PhoneScreeningActions';
import { Candidate } from '../../types/CandidateTypes';

interface PhoneScreeningFormProps {
  candidate: Candidate;
}

export const PhoneScreeningForm: React.FC<PhoneScreeningFormProps> = ({
  candidate
}) => {
  const [formData, setFormData] = useState({
    callScheduled: false,
    phoneNumber: '+91 98765 43210',
    outcome: 'pending',
    notes: '',
    experienceYears: '5',
    currentLocation: 'Mumbai',
    availabilityWeeks: '2',
    recordingUrl: '',
    currentRole: 'Senior UI/UX Designer',
    currentCompany: 'Design Studio Inc.'
  });

  const handleFieldChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Box sx={{ p: 3, fontFamily: 'Rubik, sans-serif' }}>
      <Typography variant="h5" sx={{ 
        mb: 3, 
        fontFamily: 'Rubik, sans-serif', 
        fontWeight: 600,
        fontSize: '16px',
        color: '#111827'
      }}>
        Phone Screening
      </Typography>

      <PhoneScreeningBasicInfo
        formData={{
          phoneNumber: formData.phoneNumber,
          callScheduled: formData.callScheduled,
          experienceYears: formData.experienceYears,
          currentLocation: formData.currentLocation,
          currentRole: formData.currentRole,
          currentCompany: formData.currentCompany,
          availabilityWeeks: formData.availabilityWeeks
        }}
        onFieldChange={handleFieldChange}
      />

      <Divider sx={{ my: 3, borderColor: '#e5e7eb' }} />

      <PhoneScreeningOutcome
        formData={{
          outcome: formData.outcome,
          notes: formData.notes,
          recordingUrl: formData.recordingUrl
        }}
        onFieldChange={handleFieldChange}
      />

      <PhoneScreeningActions />
    </Box>
  );
};
