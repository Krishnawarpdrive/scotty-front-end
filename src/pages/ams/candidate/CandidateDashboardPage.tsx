
import React, { useState } from 'react';
import { Box, Container, Grid, Typography, Paper } from '@mui/material';
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

      <Grid container spacing={3}>
        {/* Top Row - Metrics Cards */}
        <Grid item xs={12}>
          <CandidateMetricsCards data={dashboardData} />
        </Grid>

        {/* Second Row - Quick Actions and Profile Completion */}
        <Grid item xs={12} md={8}>
          <QuickActions />
        </Grid>
        <Grid item xs={12} md={4}>
          <ProfileCompletionWidget 
            completionPercentage={dashboardData?.profile_completion_percentage || 0} 
          />
        </Grid>

        {/* Third Row - Applications and Interviews */}
        <Grid item xs={12} md={8}>
          <ApplicationsOverview candidateId={selectedCandidateId} />
        </Grid>
        <Grid item xs={12} md={4}>
          <InterviewsSchedule candidateId={selectedCandidateId} />
        </Grid>

        {/* Fourth Row - Documents and Notifications */}
        <Grid item xs={12} md={6}>
          <DocumentsStatus candidateId={selectedCandidateId} />
        </Grid>
        <Grid item xs={12} md={6}>
          <NotificationsPanel notifications={notifications} />
        </Grid>

        {/* Fifth Row - Messages */}
        <Grid item xs={12}>
          <MessagesPanel messages={messages} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default CandidateDashboardPage;
