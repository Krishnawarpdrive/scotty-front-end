
import React, { useState } from 'react';
import { Box, Drawer, IconButton, useMediaQuery, useTheme } from '@mui/material';
import { ChevronLeft, ChevronRight, Timer, Person } from '@mui/icons-material';
import { Interview } from '../MyInterviewsPage';
import { SmartTimerWidget } from './SmartTimerWidget';
import { EnhancedCandidatePreview } from './EnhancedCandidatePreview';
import { InterviewerRoleBasedTabSystem } from './InterviewerRoleBasedTabSystem';

interface EnhancedInterviewLayoutProps {
  interview: Interview;
  activeStage: string;
  onStageChange: (stage: string) => void;
}

export const EnhancedInterviewLayout: React.FC<EnhancedInterviewLayoutProps> = ({
  interview,
  activeStage,
  onStageChange
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [rightDrawerOpen, setRightDrawerOpen] = useState(!isMobile);
  const [rightDrawerContent, setRightDrawerContent] = useState<'timer' | 'candidate'>('timer');

  const handleTimerComplete = () => {
    console.log('Interview time completed');
    // Could trigger notifications, auto-save, etc.
  };

  const handleTimerWarning = (minutesLeft: number) => {
    console.log(`Warning: ${minutesLeft} minutes remaining`);
    // Could show toast notification
  };

  const drawerWidth = 320;

  return (
    <Box sx={{ display: 'flex', height: '100vh', fontFamily: 'Rubik, sans-serif' }}>
      {/* Main Content */}
      <Box sx={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column',
        marginRight: rightDrawerOpen ? `${drawerWidth}px` : 0,
        transition: theme.transitions.create(['margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        })
      }}>
        {/* Top Bar with Compact Controls */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          p: 2,
          borderBottom: '1px solid #e0e0e0',
          bgcolor: 'white'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <SmartTimerWidget
              duration={interview.duration}
              onComplete={handleTimerComplete}
              onWarning={handleTimerWarning}
              interview={interview}
              compact
            />
            
            <EnhancedCandidatePreview
              interview={interview}
              compact
            />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton
              onClick={() => {
                setRightDrawerContent('timer');
                setRightDrawerOpen(true);
              }}
              sx={{ 
                bgcolor: rightDrawerContent === 'timer' && rightDrawerOpen ? '#e3f2fd' : 'transparent',
                color: rightDrawerContent === 'timer' && rightDrawerOpen ? '#1976d2' : 'inherit'
              }}
            >
              <Timer />
            </IconButton>
            
            <IconButton
              onClick={() => {
                setRightDrawerContent('candidate');
                setRightDrawerOpen(true);
              }}
              sx={{ 
                bgcolor: rightDrawerContent === 'candidate' && rightDrawerOpen ? '#e3f2fd' : 'transparent',
                color: rightDrawerContent === 'candidate' && rightDrawerOpen ? '#1976d2' : 'inherit'
              }}
            >
              <Person />
            </IconButton>
            
            <IconButton
              onClick={() => setRightDrawerOpen(!rightDrawerOpen)}
            >
              {rightDrawerOpen ? <ChevronRight /> : <ChevronLeft />}
            </IconButton>
          </Box>
        </Box>

        {/* Main Interview Content */}
        <Box sx={{ flex: 1, overflow: 'hidden' }}>
          <InterviewerRoleBasedTabSystem
            interview={interview}
            activeStage={activeStage}
            onStageChange={onStageChange}
          />
        </Box>
      </Box>

      {/* Right Drawer */}
      <Drawer
        variant="persistent"
        anchor="right"
        open={rightDrawerOpen}
        sx={{
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            borderLeft: '1px solid #e0e0e0',
            position: 'relative'
          },
        }}
      >
        <Box sx={{ height: '100%', overflow: 'auto', p: 2 }}>
          {rightDrawerContent === 'timer' && (
            <SmartTimerWidget
              duration={interview.duration}
              onComplete={handleTimerComplete}
              onWarning={handleTimerWarning}
              interview={interview}
            />
          )}
          
          {rightDrawerContent === 'candidate' && (
            <EnhancedCandidatePreview
              interview={interview}
            />
          )}
        </Box>
      </Drawer>
    </Box>
  );
};
