
import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Tabs,
  Tab,
  Paper
} from '@mui/material';
import { DocumentUploadManager } from './DocumentUploadManager';
import { VerificationStatusTracker } from './VerificationStatusTracker';
import { BackgroundVerificationForm } from '../BackgroundVerificationForm';
import { Candidate } from '../../../types/CandidateTypes';

interface EnhancedBackgroundVerificationFormProps {
  candidate: Candidate;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel({ children, value, index }: TabPanelProps) {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

export const EnhancedBackgroundVerificationForm: React.FC<EnhancedBackgroundVerificationFormProps> = ({
  candidate
}) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper elevation={0} sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          sx={{
            px: 2,
            '& .MuiTab-root': {
              fontFamily: 'Rubik, sans-serif',
              fontSize: '14px',
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
          <Tab label="Document Upload" />
          <Tab label="Verification Status" />
          <Tab label="Configuration" />
        </Tabs>
      </Paper>

      <TabPanel value={activeTab} index={0}>
        <DocumentUploadManager 
          candidate={candidate}
          onDocumentUploaded={() => {
            // Refresh verification status when documents are uploaded
            console.log('Document uploaded, refreshing status...');
          }}
        />
      </TabPanel>

      <TabPanel value={activeTab} index={1}>
        <VerificationStatusTracker candidate={candidate} />
      </TabPanel>

      <TabPanel value={activeTab} index={2}>
        <BackgroundVerificationForm candidate={candidate} />
      </TabPanel>
    </Box>
  );
};
