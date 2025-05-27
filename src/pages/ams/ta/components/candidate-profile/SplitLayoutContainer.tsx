
import React from 'react';
import { Box } from '@mui/material';
import { InterviewStagesTimeline } from './timeline/InterviewStagesTimeline';
import { StageFormRenderer } from './forms/StageFormRenderer';
import { Candidate } from '../types/CandidateTypes';

interface SplitLayoutContainerProps {
  candidate: Candidate;
  stageId: string;
  stageName: string;
}

export const SplitLayoutContainer: React.FC<SplitLayoutContainerProps> = ({
  candidate,
  stageId,
  stageName
}) => {
  return (
    <Box sx={{ 
      height: '100%', 
      display: 'flex',
      fontFamily: 'Rubik, sans-serif'
    }}>
      {/* Timeline Section - Left Side */}
      <Box sx={{ 
        width: '40%', 
        borderRight: '1px solid #e0e0e0',
        overflow: 'auto',
        backgroundColor: '#fafafa'
      }}>
        <InterviewStagesTimeline 
          candidate={candidate}
          currentStage={stageId}
        />
      </Box>

      {/* Forms Section - Right Side */}
      <Box sx={{ 
        flex: 1, 
        overflow: 'auto',
        backgroundColor: 'white'
      }}>
        <StageFormRenderer 
          candidate={candidate}
          stageId={stageId}
          stageName={stageName}
        />
      </Box>
    </Box>
  );
};
