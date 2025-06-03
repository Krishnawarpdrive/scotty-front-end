
import React, { useState } from 'react';
import { Box, Container } from '@mui/material';
import { CandidateSidebar } from './components/redesign/CandidateSidebar';
import { CandidateTopNavigation } from './components/redesign/CandidateTopNavigation';
import { CandidateMainContent } from './components/redesign/CandidateMainContent';
import { useCandidateDashboardData } from './hooks/useCandidateDashboardData';

const CandidateDashboardPage: React.FC = () => {
  const [selectedCandidateId] = useState('123e4567-e89b-12d3-a456-426614174000'); // Demo candidate ID
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { dashboardData, notifications, messages, isLoading } = useCandidateDashboardData(selectedCandidateId);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f8fafc' }}>
      {/* Sidebar */}
      <CandidateSidebar 
        open={sidebarOpen}
        onClose={toggleSidebar}
        dashboardData={dashboardData}
        isLoading={isLoading}
      />

      {/* Main Content Area */}
      <Box 
        sx={{ 
          flexGrow: 1, 
          display: 'flex', 
          flexDirection: 'column',
          marginLeft: sidebarOpen ? '280px' : '0px',
          transition: 'margin-left 0.3s ease',
          minHeight: '100vh'
        }}
      >
        {/* Top Navigation */}
        <CandidateTopNavigation 
          onMenuClick={toggleSidebar}
          notifications={notifications}
          dashboardData={dashboardData}
          isLoading={isLoading}
        />

        {/* Main Content */}
        <Box sx={{ flexGrow: 1, p: 3 }}>
          <CandidateMainContent 
            dashboardData={dashboardData}
            notifications={notifications}
            messages={messages}
            candidateId={selectedCandidateId}
            isLoading={isLoading}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default CandidateDashboardPage;
