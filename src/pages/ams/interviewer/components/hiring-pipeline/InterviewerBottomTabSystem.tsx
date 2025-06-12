
import React from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import { Calendar, History, Upload } from 'lucide-react';
import { Interview } from '../../MyInterviewsPage';
import { ScheduledInterviewsTab } from './bottom-tabs/ScheduledInterviewsTab';
import { InterviewHistoryTab } from './bottom-tabs/InterviewHistoryTab';
import { DocumentsTab } from './bottom-tabs/DocumentsTab';

interface InterviewerBottomTabSystemProps {
  interview: Interview;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const bottomTabs = [
  { id: 'scheduled-interviews', label: 'Scheduled Interviews', icon: Calendar },
  { id: 'interview-history', label: 'Interview History', icon: History },
  { id: 'documents', label: 'Documents', icon: Upload }
];

export const InterviewerBottomTabSystem: React.FC<InterviewerBottomTabSystemProps> = ({
  interview,
  activeTab,
  onTabChange
}) => {
  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    onTabChange(newValue);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'scheduled-interviews':
        return <ScheduledInterviewsTab interview={interview} />;
      case 'interview-history':
        return <InterviewHistoryTab interview={interview} />;
      case 'documents':
        return <DocumentsTab interview={interview} />;
      default:
        return <ScheduledInterviewsTab interview={interview} />;
    }
  };

  return (
    <Box sx={{ 
      borderTop: '1px solid #e0e0e0',
      backgroundColor: 'white',
      height: '300px',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Tab Navigation */}
      <Box sx={{ 
        borderBottom: '1px solid #e0e0e0', 
        px: 2,
        backgroundColor: '#f8f9fa'
      }}>
        <Tabs 
          value={activeTab} 
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            minHeight: '42px',
            '& .MuiTab-root': {
              fontFamily: 'Rubik, sans-serif',
              fontSize: '13px',
              textTransform: 'none',
              minHeight: '42px',
              fontWeight: 500,
              color: '#666',
              padding: '8px 16px',
              minWidth: 'auto',
              '&.Mui-selected': {
                color: '#1976d2',
                fontWeight: 600
              }
            },
            '& .MuiTabs-indicator': {
              backgroundColor: '#1976d2',
              height: '2px'
            }
          }}
        >
          {bottomTabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <Tab 
                key={tab.id} 
                value={tab.id}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <IconComponent className="h-4 w-4" />
                    {tab.label}
                  </Box>
                }
              />
            );
          })}
        </Tabs>
      </Box>

      {/* Tab Content */}
      <Box sx={{ flex: 1, overflow: 'auto', p: 2 }}>
        {renderTabContent()}
      </Box>
    </Box>
  );
};
