
import React, { useState } from 'react';
import { Box, Typography, Divider } from '@mui/material';
import { Candidate } from '../../types/CandidateTypes';
import { InterviewSetupSection } from './sections/InterviewSetupSection';
import { ClientAssessmentSection } from './sections/ClientAssessmentSection';
import { InterviewOutcomeSection } from './sections/InterviewOutcomeSection';
import { ClientInterviewActions } from './sections/ClientInterviewActions';

interface ClientInterviewFormProps {
  candidate: Candidate;
}

export const ClientInterviewForm: React.FC<ClientInterviewFormProps> = ({
  candidate
}) => {
  const [formData, setFormData] = useState({
    interviewScheduled: false,
    interviewType: 'video',
    outcome: 'pending',
    clientFeedback: '',
    culturalFit: 'pending',
    technicalFit: 'pending',
    interviewNotes: '',
    duration: '45',
    clientInterviewerName: '',
    followUpRequired: false
  });

  const handleFieldChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Box sx={{ p: 3, fontFamily: 'Rubik, sans-serif' }}>
      <Typography variant="h6" sx={{ 
        mb: 3, 
        fontFamily: 'Rubik, sans-serif', 
        fontWeight: 600 
      }}>
        Client Interview Configuration
      </Typography>

      <InterviewSetupSection
        formData={{
          interviewScheduled: formData.interviewScheduled,
          interviewType: formData.interviewType,
          duration: formData.duration,
          clientInterviewerName: formData.clientInterviewerName
        }}
        onFieldChange={handleFieldChange}
      />

      <Divider sx={{ my: 3 }} />

      <ClientAssessmentSection
        formData={{
          culturalFit: formData.culturalFit,
          technicalFit: formData.technicalFit,
          clientFeedback: formData.clientFeedback,
          followUpRequired: formData.followUpRequired
        }}
        onFieldChange={handleFieldChange}
      />

      <Divider sx={{ my: 3 }} />

      <InterviewOutcomeSection
        formData={{
          outcome: formData.outcome,
          interviewNotes: formData.interviewNotes
        }}
        onFieldChange={handleFieldChange}
      />

      <ClientInterviewActions />
    </Box>
  );
};
