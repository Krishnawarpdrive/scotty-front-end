
import React from 'react';
import { Box } from '@mui/material';
import { EnhancedBottomPanel } from './EnhancedBottomPanel';
import { Candidate } from '../types/CandidateTypes';
import { Stage, Role } from './types/SharedTypes';

interface EnhancedPipelineContainerProps {
  candidate: Candidate;
}

export const EnhancedPipelineContainer: React.FC<EnhancedPipelineContainerProps> = ({
  candidate
}) => {
  // Mock data - in real app, this would come from props or API
  const currentStage: Stage = {
    id: 'phone-screening',
    name: 'Phone Screening',
    status: 'current',
    order: 1
  };

  const role: Role = {
    id: 'role-1',
    name: candidate.role,
    stages: [
      { id: 'phone-screening', name: 'Phone Screening', status: 'current', order: 1 },
      { id: 'technical', name: 'Technical Interview', status: 'pending', order: 2 },
      { id: 'client-interview', name: 'Client Interview', status: 'pending', order: 3 },
      { id: 'background-verification', name: 'Background Check', status: 'pending', order: 4 },
      { id: 'final-review', name: 'Final Review', status: 'pending', order: 5 }
    ]
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <EnhancedBottomPanel
        candidate={candidate}
        stage={currentStage}
        role={role}
      />
    </Box>
  );
};
