
import React from 'react';
import { Box } from '@mui/material';
import { Interview } from '../MyInterviewsPage';
import { EnhancedInterviewerStageNavigator } from './EnhancedInterviewerStageNavigator';
import { InterviewerSplitLayoutContainer } from './InterviewerSplitLayoutContainer';

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
  const stageName = {
    'interview-details': 'Interview Details',
    'candidate-profile': 'Candidate Profile',
    'documents': 'Documents',
    'interview-feedback': 'Interview Feedback',
    'interview-notes': 'Notes & Comments',
    'interview-history': 'Interview History'
  }[activeStage] || 'Interview Details';

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Enhanced Stage Navigator */}
      <EnhancedInterviewerStageNavigator
        activeStage={activeStage}
        onStageChange={onStageChange}
      />

      {/* Content Area */}
      <Box sx={{ flex: 1, overflow: 'hidden' }}>
        <InterviewerSplitLayoutContainer
          interview={interview}
          stageId={activeStage}
          stageName={stageName}
        />
      </Box>
    </Box>
  );
};
