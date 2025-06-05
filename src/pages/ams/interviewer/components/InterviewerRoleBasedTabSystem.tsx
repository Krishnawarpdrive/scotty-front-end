
import React from 'react';
import { Box } from '@mui/material';
import { Interview } from '../MyInterviewsPage';
import { InterviewerHiringPipelineContainer } from './hiring-pipeline/InterviewerHiringPipelineContainer';

interface InterviewerRoleBasedTabSystemProps {
  interview: Interview;
  activeStage: string;
  onStageChange: (stage: string) => void;
}

export const InterviewerRoleBasedTabSystem: React.FC<InterviewerRoleBasedTabSystemProps> = ({
  interview,
  activeStage,
  onStageChange
}) => {
  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <InterviewerHiringPipelineContainer interview={interview} />
    </Box>
  );
};
