
import React from 'react';
import { Box, Typography } from '@mui/material';
import { CandidateContextualActions } from './CandidateContextualActions';
import { CandidateActivityFeed } from './CandidateActivityFeed';
import { CandidateApplicationsTable } from './CandidateApplicationsTable';
import { CandidateInterviewsTable } from './CandidateInterviewsTable';
import { CandidateDocumentsTable } from './CandidateDocumentsTable';
import { CandidateKPICards } from './CandidateKPICards';

interface CandidateMainContentProps {
  dashboardData: any;
  notifications: any[];
  messages: any[];
  candidateId: string;
  isLoading: boolean;
}

export const CandidateMainContent: React.FC<CandidateMainContentProps> = ({
  dashboardData,
  notifications,
  messages,
  candidateId,
  isLoading
}) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* KPI Cards Section */}
      <CandidateKPICards dashboardData={dashboardData} isLoading={isLoading} />

      {/* Middle Section: Quick Actions and Activity Feed */}
      <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
        <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 66%' }, minWidth: 0 }}>
          <CandidateContextualActions 
            dashboardData={dashboardData}
            candidateId={candidateId}
          />
        </Box>
        <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 33%' }, minWidth: 0 }}>
          <CandidateActivityFeed 
            notifications={notifications}
            messages={messages}
            isLoading={isLoading}
          />
        </Box>
      </Box>

      {/* Tables Section */}
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
          Detailed Information
        </Typography>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {/* Applications Table */}
          <CandidateApplicationsTable candidateId={candidateId} />
          
          {/* Interviews Table */}
          <CandidateInterviewsTable candidateId={candidateId} />
          
          {/* Documents Table */}
          <CandidateDocumentsTable candidateId={candidateId} />
        </Box>
      </Box>
    </Box>
  );
};
