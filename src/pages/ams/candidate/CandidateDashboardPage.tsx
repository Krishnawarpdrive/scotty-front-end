
import React, { useState } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { CandidateMetricsCards } from './components/CandidateMetricsCards';
import { ApplicationsOverview } from './components/ApplicationsOverview';
import { InterviewsSchedule } from './components/InterviewsSchedule';
import { DocumentsStatus } from './components/DocumentsStatus';
import { NotificationsPanel } from './components/NotificationsPanel';
import { MessagesPanel } from './components/MessagesPanel';
import { ProfileCompletionWidget } from './components/ProfileCompletionWidget';
import { QuickActions } from './components/QuickActions';
import { useCandidateDashboardData } from './hooks/useCandidateDashboardData';

const CandidateDashboardPage: React.FC = () => {
  const [selectedCandidateId] = useState('123e4567-e89b-12d3-a456-426614174000'); // Demo candidate ID
  const { dashboardData, notifications, messages, isLoading } = useCandidateDashboardData(selectedCandidateId);

  if (isLoading) {
    return (
      <Container maxWidth="xl" sx={{ py: 3 }}>
        <Typography>Loading dashboard...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
          Candidate Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Welcome back! Here's what's happening with your applications.
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {/* Top Row - Metrics Cards */}
        <Box>
          <CandidateMetricsCards data={dashboardData} />
        </Box>

        {/* Second Row - Quick Actions and Profile Completion */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' }, gap: 3 }}>
          <Box>
            <QuickActions />
          </Box>
          <Box>
            <ProfileCompletionWidget 
              completionPercentage={dashboardData?.profile_completion_percentage || 0} 
            />
          </Box>
        </Box>

        {/* Third Row - Applications and Interviews */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' }, gap: 3 }}>
          <Box>
            <ApplicationsOverview candidateId={selectedCandidateId} />
          </Box>
          <Box>
            <InterviewsSchedule candidateId={selectedCandidateId} />
          </Box>
        </Box>

        {/* Fourth Row - Documents and Notifications */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
          <Box>
            <DocumentsStatus candidateId={selectedCandidateId} />
          </Box>
          <Box>
            <NotificationsPanel notifications={notifications} />
          </Box>
        </Box>

        {/* Fifth Row - Messages */}
        <Box>
          <MessagesPanel messages={messages} />
        </Box>
      </Box>
    </Container>
  );
};

export default CandidateDashboardPage;
