
import React from 'react';
import { Box, Tabs, Tab } from '@mui/material';

interface InterviewerStageNavigatorProps {
  activeStage: string;
  onStageChange: (stage: string) => void;
}

const interviewerStages = [
  { id: 'interview-details', label: 'Interview Details' },
  { id: 'candidate-profile', label: 'Candidate Profile' },
  { id: 'documents', label: 'Documents' },
  { id: 'interview-feedback', label: 'Interview Feedback' },
  { id: 'interview-notes', label: 'Notes & Comments' },
  { id: 'interview-history', label: 'Interview History' }
];

export const InterviewerStageNavigator: React.FC<InterviewerStageNavigatorProps> = ({
  activeStage,
  onStageChange
}) => {
  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    onStageChange(newValue);
  };

  return (
    <Box sx={{ 
      borderBottom: '1px solid #e0e0e0', 
      px: 1.5, 
      backgroundColor: 'white',
      minHeight: '42px'
    }}>
      <Tabs 
        value={activeStage} 
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
        sx={{
          minHeight: '42px',
          '& .MuiTab-root': {
            fontFamily: 'Rubik, sans-serif',
            fontSize: '12px',
            textTransform: 'none',
            minHeight: '42px',
            fontWeight: 500,
            color: '#666',
            padding: '8px 12px',
            minWidth: 'auto',
            '&.Mui-selected': {
              color: '#009933',
              fontWeight: 600
            }
          },
          '& .MuiTabs-indicator': {
            backgroundColor: '#009933',
            height: '2px'
          }
        }}
      >
        {interviewerStages.map((stage) => (
          <Tab 
            key={stage.id} 
            value={stage.id}
            label={stage.label}
          />
        ))}
      </Tabs>
    </Box>
  );
};
