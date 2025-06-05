
import React, { useState } from 'react';
import { Drawer, Box, IconButton, Typography } from '@mui/material';
import { Close } from '@mui/icons-material';
import { Interview } from '../MyInterviewsPage';
import { EnhancedInterviewLayout } from './EnhancedInterviewLayout';

interface InterviewerCandidateDetailDrawerProps {
  open: boolean;
  onClose: () => void;
  interview: Interview | null;
}

export const InterviewerCandidateDetailDrawer: React.FC<InterviewerCandidateDetailDrawerProps> = ({
  open,
  onClose,
  interview
}) => {
  const [activeStage, setActiveStage] = useState('interview-details');

  if (!interview) return null;

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { 
          width: '100vw',
          height: '100vh',
          maxWidth: 'none'
        }
      }}
    >
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          p: 2,
          borderBottom: '1px solid #e0e0e0',
          bgcolor: 'white'
        }}>
          <Typography variant="h6" fontWeight="bold" sx={{ fontFamily: 'Rubik, sans-serif' }}>
            Interview Session - {interview.candidateName}
          </Typography>
          <IconButton onClick={onClose} size="small">
            <Close />
          </IconButton>
        </Box>

        {/* Enhanced Layout Content */}
        <Box sx={{ flex: 1, overflow: 'hidden' }}>
          <EnhancedInterviewLayout
            interview={interview}
            activeStage={activeStage}
            onStageChange={setActiveStage}
          />
        </Box>
      </Box>
    </Drawer>
  );
};
