
import React from 'react';
import { Box, Typography } from '@mui/material';
import { TimelineItem } from './TimelineItem';
import { Candidate } from '../../types/CandidateTypes';

interface CandidateTimelineProps {
  candidate: Candidate;
  currentStage: string;
}

const timelineData = [
  {
    id: 'application-submitted',
    title: 'Application Submitted',
    date: '2 days ago',
    status: 'completed' as const,
    description: 'Candidate submitted application for Network Administrator role'
  },
  {
    id: 'phone-screening',
    title: 'Phone Screening',
    date: '1 day ago',
    status: 'in-progress' as const,
    description: 'Initial phone screening call scheduled'
  },
  {
    id: 'technical',
    title: 'Technical Interview',
    date: 'Pending',
    status: 'pending' as const,
    description: 'Technical assessment and interview'
  },
  {
    id: 'client-interview',
    title: 'Client Interview',
    date: 'Pending',
    status: 'pending' as const,
    description: 'Final interview with client team'
  },
  {
    id: 'background-verification',
    title: 'Background Verification',
    date: 'Pending',
    status: 'pending' as const,
    description: 'Document verification and background check'
  }
];

export const CandidateTimeline: React.FC<CandidateTimelineProps> = ({
  candidate,
  currentStage
}) => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ 
        mb: 3, 
        fontFamily: 'Rubik, sans-serif', 
        fontWeight: 600 
      }}>
        Candidate Journey
      </Typography>
      
      <Box sx={{ position: 'relative' }}>
        {/* Timeline Line */}
        <Box sx={{
          position: 'absolute',
          left: 12,
          top: 0,
          bottom: 0,
          width: 2,
          bgcolor: '#e0e0e0'
        }} />
        
        {timelineData.map((item, index) => (
          <TimelineItem
            key={item.id}
            item={item}
            isLast={index === timelineData.length - 1}
            isActive={item.id === currentStage}
          />
        ))}
      </Box>
    </Box>
  );
};
