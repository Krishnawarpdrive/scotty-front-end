
import React from 'react';
import { Box, Typography } from '@mui/material';
import { Candidate } from '../../types/CandidateTypes';
import { Stage } from '../types/SharedTypes';

interface DocumentsTabProps {
  candidate: Candidate;
  stage: Stage;
}

export const DocumentsTab: React.FC<DocumentsTabProps> = ({
  candidate,
  stage
}) => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Documents - {stage.name}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Documents functionality will be implemented here.
      </Typography>
    </Box>
  );
};
