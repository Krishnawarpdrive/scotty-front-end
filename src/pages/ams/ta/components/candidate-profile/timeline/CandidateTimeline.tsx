
import React from 'react';
import { Box, Typography } from '@mui/material';
import { TimelineItem } from './TimelineItem';
import { Candidate, TimelineItemData } from '../../types/CandidateTypes';

interface CandidateTimelineProps {
  candidate: Candidate;
  currentStage: string;
}

const generateTimelineData = (candidate: Candidate, currentStage: string): TimelineItemData[] => {
  const stages = [
    { id: 'application', title: 'Application Submitted', stage: 'application' },
    { id: 'phone-screening', title: 'Phone Screening', stage: 'phone-screening' },
    { id: 'technical', title: 'Technical Interview', stage: 'technical' },
    { id: 'client-interview', title: 'Client Interview', stage: 'client-interview' },
    { id: 'background-verification', title: 'Background Verification', stage: 'background-verification' },
    { id: 'final-review', title: 'Final Review', stage: 'final-review' }
  ];

  const currentStageIndex = stages.findIndex(s => s.stage === currentStage);

  return stages.map((stage, index) => ({
    id: stage.id,
    title: stage.title,
    date: index <= currentStageIndex ? '2024-01-15' : '',
    status: index < currentStageIndex ? 'completed' : 
            index === currentStageIndex ? 'in-progress' : 'pending',
    description: index <= currentStageIndex ? 
      'Completed successfully' : 
      'Pending'
  })) as TimelineItemData[];
};

export const CandidateTimeline: React.FC<CandidateTimelineProps> = ({
  candidate,
  currentStage
}) => {
  const timelineData = generateTimelineData(candidate, currentStage);

  return (
    <Box sx={{ 
      p: 2, 
      fontFamily: 'Rubik, sans-serif',
      height: '100%'
    }}>
      <Typography 
        variant="h6" 
        sx={{ 
          mb: 2, 
          fontFamily: 'Rubik, sans-serif', 
          fontWeight: 600,
          fontSize: '14px',
          color: '#333'
        }}
      >
        Application Timeline
      </Typography>
      
      <Box sx={{ position: 'relative' }}>
        {timelineData.map((item, index) => (
          <TimelineItem
            key={item.id}
            data={item}
            isLast={index === timelineData.length - 1}
          />
        ))}
      </Box>
    </Box>
  );
};
