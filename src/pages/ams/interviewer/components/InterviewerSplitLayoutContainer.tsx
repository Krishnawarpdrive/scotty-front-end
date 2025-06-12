
import React from 'react';
import { Box } from '@mui/material';
import { Interview } from '../MyInterviewsPage';
import { InterviewerHiringPipelineContainer } from './hiring-pipeline/InterviewerHiringPipelineContainer';

interface InterviewerSplitLayoutContainerProps {
  interview: Interview;
  stageId: string;
  stageName: string;
}

export const InterviewerSplitLayoutContainer: React.FC<InterviewerSplitLayoutContainerProps> = ({
  interview,
  stageId,
  stageName
}) => {
  return (
    <Box sx={{ 
      height: '100%', 
      display: 'flex',
      fontFamily: 'Rubik, sans-serif'
    }}>
      {/* Main Content Area */}
      <Box sx={{ 
        flex: 1, 
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <InterviewerHiringPipelineContainer interview={interview} />
      </Box>
    </Box>
  );
};
