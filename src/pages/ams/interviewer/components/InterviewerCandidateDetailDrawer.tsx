
import React, { useState } from 'react';
import { 
  Drawer, 
  Box, 
  IconButton,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { InterviewerCollapsibleProfileCard } from './InterviewerCollapsibleProfileCard';
import { InterviewerRoleBasedTabSystem } from './InterviewerRoleBasedTabSystem';
import { Interview } from '../MyInterviewsPage';

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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [profileCollapsed, setProfileCollapsed] = useState(false);
  const [activeStage, setActiveStage] = useState('interview-details');

  if (!interview) {
    return (
      <Drawer
        anchor="right"
        open={open}
        onClose={onClose}
        sx={{
          '& .MuiDrawer-paper': {
            width: isMobile ? '100%' : '70%',
            maxWidth: isMobile ? '100%' : '1200px',
            minWidth: isMobile ? 'auto' : '800px',
            height: '100vh',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            fontFamily: 'Rubik, sans-serif'
          },
        }}
      >
        <Box sx={{ p: 6 }}>
          <p>No interview data available</p>
        </Box>
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: isMobile ? '100%' : '70%',
          maxWidth: isMobile ? '100%' : '1200px',
          minWidth: isMobile ? 'auto' : '800px',
          height: '100vh',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          fontFamily: 'Rubik, sans-serif'
        },
      }}
    >
      <Box sx={{ 
        height: '100vh', 
        display: 'flex', 
        flexDirection: 'column',
        fontFamily: 'Rubik, sans-serif'
      }}>
        {/* Close Button */}
        <Box sx={{ 
          position: 'absolute', 
          top: 8, 
          right: 8, 
          zIndex: 1000,
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          borderRadius: '50%'
        }}>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Collapsible Profile Card */}
        <InterviewerCollapsibleProfileCard
          interview={interview}
          collapsed={profileCollapsed}
          onToggleCollapse={() => setProfileCollapsed(!profileCollapsed)}
        />
        
        {/* Enhanced Role-Based Tab System */}
        <Box sx={{ flex: 1, overflow: 'hidden' }}>
          <InterviewerRoleBasedTabSystem
            interview={interview}
            activeStage={activeStage}
            onStageChange={setActiveStage}
          />
        </Box>
      </Box>
    </Drawer>
  );
};
