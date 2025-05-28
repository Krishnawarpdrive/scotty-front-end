
import React from 'react';
import { Box, Typography } from '@mui/material';
import { Candidate } from '../../types/CandidateTypes';
import { Stage } from '../types/SharedTypes';

interface InterviewNotesTabProps {
  candidate: Candidate;
  stage: Stage;
}

export const InterviewNotesTab: React.FC<InterviewNotesTabProps> = ({
  candidate,
  stage
}) => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Interview Notes - {stage.name}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Interview notes functionality will be implemented here.
      </Typography>
    </Box>
  );
};
