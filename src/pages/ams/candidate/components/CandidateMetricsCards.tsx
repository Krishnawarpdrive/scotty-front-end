
import React from 'react';
import { Grid, Card, CardContent, Typography, Box, Icon } from '@mui/material';
import { 
  Work, 
  Schedule, 
  Assignment, 
  Description,
  CheckCircle,
  TrendingUp 
} from '@mui/icons-material';

interface MetricCardProps {
  title: string;
  value: number;
  icon: React.ReactElement;
  color: string;
  subtitle?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, icon, color, subtitle }) => (
  <Card sx={{ height: '100%', border: `2px solid ${color}20`, borderRadius: 2 }}>
    <CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Box sx={{ 
          backgroundColor: `${color}20`, 
          borderRadius: 2, 
          p: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {React.cloneElement(icon, { sx: { color, fontSize: 24 } })}
        </Box>
        <Typography variant="h4" sx={{ fontWeight: 700, color }}>
          {value}
        </Typography>
      </Box>
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="body2" color="text.secondary">
          {subtitle}
        </Typography>
      )}
    </CardContent>
  </Card>
);

interface CandidateMetricsCardsProps {
  data: any;
}

export const CandidateMetricsCards: React.FC<CandidateMetricsCardsProps> = ({ data }) => {
  const metrics = [
    {
      title: 'Total Applications',
      value: data?.total_applications || 0,
      icon: <Work />,
      color: '#1976d2',
      subtitle: `${data?.active_applications || 0} active`
    },
    {
      title: 'Interviews Scheduled',
      value: data?.interviews_scheduled || 0,
      icon: <Schedule />,
      color: '#ed6c02',
      subtitle: 'Upcoming sessions'
    },
    {
      title: 'Interviews Completed',
      value: data?.interviews_completed || 0,
      icon: <CheckCircle />,
      color: '#2e7d32',
      subtitle: 'Awaiting results'
    },
    {
      title: 'Pending Assessments',
      value: data?.pending_assessments || 0,
      icon: <Assignment />,
      color: '#9c27b0',
      subtitle: 'To be completed'
    },
    {
      title: 'Documents Uploaded',
      value: data?.documents_uploaded || 0,
      icon: <Description />,
      color: '#d32f2f',
      subtitle: `${data?.documents_verified || 0} verified`
    },
    {
      title: 'Profile Completion',
      value: data?.profile_completion_percentage || 0,
      icon: <TrendingUp />,
      color: '#0288d1',
      subtitle: 'Percentage complete'
    }
  ];

  return (
    <Grid container spacing={2}>
      {metrics.map((metric, index) => (
        <Grid item xs={12} sm={6} md={4} lg={2} key={index}>
          <MetricCard {...metric} />
        </Grid>
      ))}
    </Grid>
  );
};
