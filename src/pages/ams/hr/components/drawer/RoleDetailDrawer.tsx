
import React, { useState } from 'react';
import { 
  Drawer, 
  Box, 
  Typography, 
  Tabs, 
  Tab, 
  IconButton,
  Divider 
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import HiringPipelineConfig from './HiringPipelineConfig';
import TAMappingTab from './TAMappingTab';
import CandidateJourneyTab from './CandidateJourneyTab';

interface RoleDetailDrawerProps {
  open: boolean;
  onClose: () => void;
  roleData: any;
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
      {value === index && (
        <Box sx={{ height: '100%', p: 2 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const RoleDetailDrawer: React.FC<RoleDetailDrawerProps> = ({
  open,
  onClose,
  roleData
}) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleSwitchToPipeline = () => {
    setActiveTab(0); // Switch to the Configure Hiring Pipeline tab
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: '70vw',
          maxWidth: '70vw',
          height: '100vh',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        },
      }}
    >
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Box
          sx={{
            p: 2,
            borderBottom: '1px solid #e5e7eb',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            minHeight: '64px',
          }}
        >
          <Box>
            <Typography
              variant="h6"
              sx={{
                fontFamily: 'Rubik, sans-serif',
                fontWeight: 500,
                fontSize: '18px',
                color: '#262626',
              }}
            >
              {roleData?.name || 'Role Configuration'}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontFamily: 'Rubik, sans-serif',
                fontSize: '12px',
                color: '#666',
                mt: 0.5,
              }}
            >
              {roleData?.client || 'Configure hiring pipeline and team assignments'}
            </Typography>
          </Box>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Tabs */}
        <Box sx={{ borderBottom: '1px solid #e5e7eb' }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            sx={{
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
            <Tab label="Configure Hiring Pipeline" />
            <Tab label="TA Mapping" />
            <Tab label="Candidate Journey" />
          </Tabs>
        </Box>

        {/* Tab Content */}
        <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
          <TabPanel value={activeTab} index={0}>
            <HiringPipelineConfig roleData={roleData} />
          </TabPanel>
          <TabPanel value={activeTab} index={1}>
            <TAMappingTab roleData={roleData} />
          </TabPanel>
          <TabPanel value={activeTab} index={2}>
            <CandidateJourneyTab 
              roleData={roleData} 
              onSwitchToPipeline={handleSwitchToPipeline}
            />
          </TabPanel>
        </Box>
      </Box>
    </Drawer>
  );
};

export default RoleDetailDrawer;
