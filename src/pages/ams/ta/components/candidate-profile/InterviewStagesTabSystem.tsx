
import React from 'react';
import { Box, Tabs, Tab, useTheme } from '@mui/material';
import { SplitLayoutContainer } from './SplitLayoutContainer';
import { Candidate } from '../types/CandidateTypes';

interface InterviewStagesTabSystemProps {
  candidate: Candidate;
  activeStage: string;
  onStageChange: (stage: string) => void;
}

const interviewStages = [
  { id: 'phone-screening', label: 'Phone Screening' },
  { id: 'technical', label: 'Technical' },
  { id: 'client-interview', label: 'Client Interview' },
  { id: 'background-verification', label: 'Background' },
  { id: 'final-review', label: 'Final Review' }
];

export const InterviewStagesTabSystem: React.FC<InterviewStagesTabSystemProps> = ({
  candidate,
  activeStage,
  onStageChange
}) => {
  const theme = useTheme();

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    onStageChange(newValue);
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Tabs Header */}
      <Box sx={{ 
        borderBottom: '1px solid #e0e0e0', 
        px: 2, 
        backgroundColor: 'white',
        minHeight: '48px'
      }}>
        <Tabs 
          value={activeStage} 
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            '& .MuiTab-root': {
              fontFamily: 'Rubik, sans-serif',
              fontSize: '13px',
              textTransform: 'none',
              minHeight: '48px',
              fontWeight: 500,
              color: '#666',
              '&.Mui-selected': {
                color: '#009933',
                fontWeight: 600
              }
            },
            '& .MuiTabs-indicator': {
              backgroundColor: '#009933',
              height: '3px'
            }
          }}
        >
          {interviewStages.map((stage) => (
            <Tab 
              key={stage.id} 
              value={stage.id}
              label={stage.label}
            />
          ))}
        </Tabs>
      </Box>

      {/* Tab Content */}
      <Box sx={{ flex: 1, overflow: 'hidden' }}>
        <SplitLayoutContainer
          candidate={candidate}
          stageId={activeStage}
          stageName={interviewStages.find(s => s.id === activeStage)?.label || ''}
        />
      </Box>
    </Box>
  );
};
