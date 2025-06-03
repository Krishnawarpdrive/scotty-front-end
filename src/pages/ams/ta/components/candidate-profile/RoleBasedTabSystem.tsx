
import React, { useState } from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import { EnhancedStageNavigator } from './EnhancedStageNavigator';
import { StageFormRenderer } from './forms/StageFormRenderer';
import { ActivityTimelineTab } from './tabs/ActivityTimelineTab';
import { DocumentsTab } from './tabs/DocumentsTab';
import { InterviewNotesTab } from './tabs/InterviewNotesTab';
import { Candidate } from '../types/CandidateTypes';
import { Stage } from './types/SharedTypes';

interface RoleBasedTabSystemProps {
  candidate: Candidate;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel({ children, value, index }: TabPanelProps) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      style={{ height: '100%', overflow: 'hidden' }}
    >
      {value === index && children}
    </div>
  );
}

export const RoleBasedTabSystem: React.FC<RoleBasedTabSystemProps> = ({
  candidate
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [currentStageId, setCurrentStageId] = useState('phone-screening');

  // Updated stages data to include aptitude-test stage
  const stages: Stage[] = [
    { id: 'phone-screening', name: 'Phone Screening', status: 'active', order: 1 },
    { id: 'technical', name: 'Technical Interview', status: 'pending', order: 2 },
    { id: 'aptitude-test', name: 'Aptitude Test', status: 'pending', order: 3 },
    { id: 'client-interview', name: 'Client Interview', status: 'pending', order: 4 },
    { id: 'background-verification', name: 'Background Check', status: 'pending', order: 5 },
    { id: 'final-review', name: 'Final Review', status: 'pending', order: 6 }
  ];

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleStageChange = (stageId: string) => {
    setCurrentStageId(stageId);
  };

  const getCurrentStage = () => {
    return stages.find(s => s.id === currentStageId) || stages[0];
  };

  const getCurrentStageName = () => {
    const stage = stages.find(s => s.id === currentStageId);
    return stage?.name || 'Phone Screening';
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Stage Navigator */}
      <EnhancedStageNavigator
        stages={stages}
        currentStageId={currentStageId}
        onStageChange={handleStageChange}
      />

      {/* Tab Navigation */}
      <Box sx={{ borderBottom: '1px solid #e5e7eb', bgcolor: 'white' }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          sx={{
            px: 2,
            '& .MuiTab-root': {
              fontFamily: 'Rubik, sans-serif',
              fontSize: '13px',
              textTransform: 'none',
              minHeight: '48px',
              color: '#666',
            },
            '& .Mui-selected': {
              color: '#009933 !important',
            },
            '& .MuiTabs-indicator': {
              backgroundColor: '#009933',
            },
          }}
        >
          <Tab label={`${getCurrentStageName()} Form`} />
          <Tab label="Activity Timeline" />
          <Tab label="Documents" />
          <Tab label="Interview Notes" />
        </Tabs>
      </Box>

      {/* Tab Content */}
      <Box sx={{ flex: 1, overflow: 'hidden' }}>
        <TabPanel value={activeTab} index={0}>
          <StageFormRenderer
            candidate={candidate}
            stageId={currentStageId}
            stageName={getCurrentStageName()}
          />
        </TabPanel>
        <TabPanel value={activeTab} index={1}>
          <ActivityTimelineTab 
            candidate={candidate} 
            role={candidate.role}
          />
        </TabPanel>
        <TabPanel value={activeTab} index={2}>
          <DocumentsTab 
            candidate={candidate} 
            stage={getCurrentStage()}
          />
        </TabPanel>
        <TabPanel value={activeTab} index={3}>
          <InterviewNotesTab 
            candidate={candidate} 
            stage={getCurrentStage()}
          />
        </TabPanel>
      </Box>
    </Box>
  );
};
