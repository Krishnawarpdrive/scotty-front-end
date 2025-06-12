
import React, { useState } from 'react';
import { Box } from '@mui/material';
import { Interview } from '../../MyInterviewsPage';
import { InterviewerPipelineStageNavigator } from './InterviewerPipelineStageNavigator';
import { InterviewerPipelineStageRenderer } from './InterviewerPipelineStageRenderer';
import { InterviewerBottomTabSystem } from './InterviewerBottomTabSystem';

interface InterviewerHiringPipelineContainerProps {
  interview: Interview;
}

export const InterviewerHiringPipelineContainer: React.FC<InterviewerHiringPipelineContainerProps> = ({
  interview
}) => {
  const [activePipelineStage, setActivePipelineStage] = useState('technical-screening');
  const [activeBottomTab, setActiveBottomTab] = useState('scheduled-interviews');

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Pipeline Stage Navigator */}
      <InterviewerPipelineStageNavigator
        activeStage={activePipelineStage}
        onStageChange={setActivePipelineStage}
      />

      {/* Main Pipeline Content */}
      <Box sx={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ flex: 1, overflow: 'auto' }}>
          <InterviewerPipelineStageRenderer
            interview={interview}
            activeStage={activePipelineStage}
          />
        </Box>

        {/* Bottom Tab System */}
        <InterviewerBottomTabSystem
          interview={interview}
          activeTab={activeBottomTab}
          onTabChange={setActiveBottomTab}
        />
      </Box>
    </Box>
  );
};
