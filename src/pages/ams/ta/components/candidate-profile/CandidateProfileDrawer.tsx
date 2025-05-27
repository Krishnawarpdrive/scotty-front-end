
import React, { useState } from 'react';
import { Drawer, DrawerContent } from '@/components/ui-mui/Drawer';
import { Box } from '@mui/material';
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
  const [profileCollapsed, setProfileCollapsed] = useState(false);
  const [activeStage, setActiveStage] = useState('phone-screening');

  if (!candidate) return null;

  return (
    <Drawer open={open} onClose={onClose} side="right">
      <DrawerContent onClose={onClose}>
        <Box sx={{ 
          height: '100vh', 
          display: 'flex', 
          flexDirection: 'column',
          fontFamily: 'Rubik, sans-serif'
        }}>
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
      </DrawerContent>
    </Drawer>
  );
};
