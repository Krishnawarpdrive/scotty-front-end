
import React, { useState } from 'react';
import { 
  Drawer, 
  Box, 
  IconButton,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { CollapsibleProfileCard } from './CollapsibleProfileCard';
import { InterviewStagesTabSystem } from './InterviewStagesTabSystem';
import { Candidate } from '../types/CandidateTypes';

interface CandidateProfileDrawerProps {
  open: boolean;
  onClose: () => void;
  candidate: Candidate | null;
}

export const CandidateProfileDrawer: React.FC<CandidateProfileDrawerProps> = ({
  open,
  onClose,
  candidate
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [profileCollapsed, setProfileCollapsed] = useState(false);
  const [activeStage, setActiveStage] = useState('phone-screening');

  if (!candidate) return null;

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: isMobile ? '100%' : '60%',
          maxWidth: isMobile ? '100%' : '900px',
          minWidth: isMobile ? 'auto' : '600px',
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
        <CollapsibleProfileCard
          candidate={candidate}
          collapsed={profileCollapsed}
          onToggleCollapse={() => setProfileCollapsed(!profileCollapsed)}
        />
        
        {/* Interview Stages Tab System */}
        <Box sx={{ flex: 1, overflow: 'hidden' }}>
          <InterviewStagesTabSystem
            candidate={candidate}
            activeStage={activeStage}
            onStageChange={setActiveStage}
          />
        </Box>
      </Box>
    </Drawer>
  );
};
