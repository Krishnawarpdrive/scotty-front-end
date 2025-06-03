
import React from 'react';
import { Box, Grid2 as Grid, Typography } from '@mui/material';
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
      <Grid container spacing={3}>
        <Grid xs={12} md={8}>
          <CandidateContextualActions 
            dashboardData={dashboardData}
            candidateId={candidateId}
          />
        </Grid>
        <Grid xs={12} md={4}>
          <CandidateActivityFeed 
            notifications={notifications}
            messages={messages}
            isLoading={isLoading}
          />
        </Grid>
      </Grid>

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
