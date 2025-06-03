
import React from 'react';
import { Box, Card, CardContent, Typography, LinearProgress } from '@mui/material';
import { 
  Work, 
  Schedule, 
  Assignment, 
  Description,
  CheckCircle,
  TrendingUp,
  Timeline,
  Assessment
} from '@mui/icons-material';

interface CandidateKPICardsProps {
  dashboardData: any;
  isLoading: boolean;
}

const KPICard: React.FC<{
  title: string;
  value: number;
  icon: React.ReactElement;
  color: string;
  trend?: string;
  progress?: number;
  subtitle?: string;
}> = ({ title, value, icon, color, trend, progress, subtitle }) => (
  <Card sx={{ height: '100%', border: `2px solid ${color}20`, borderRadius: 2 }}>
    <CardContent sx={{ p: 2.5 }}>
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
      
      <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5 }}>
        {title}
      </Typography>
      
      {subtitle && (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {subtitle}
        </Typography>
      )}
      
      {progress !== undefined && (
        <Box sx={{ mt: 1 }}>
          <LinearProgress 
            variant="determinate" 
            value={progress} 
            sx={{ 
              height: 4, 
              borderRadius: 2,
              backgroundColor: `${color}20`,
              '& .MuiLinearProgress-bar': {
                backgroundColor: color
              }
            }} 
          />
        </Box>
      )}
      
      {trend && (
        <Typography variant="caption" color="success.main" sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
          <TrendingUp sx={{ fontSize: 14, mr: 0.5 }} />
          {trend}
        </Typography>
      )}
    </CardContent>
  </Card>
);

export const CandidateKPICards: React.FC<CandidateKPICardsProps> = ({ dashboardData, isLoading }) => {
  const kpiData = [
    {
      title: 'Total Applications',
      value: dashboardData?.total_applications || 0,
      icon: <Work />,
      color: '#2563eb',
      subtitle: `${dashboardData?.active_applications || 0} active`,
      progress: dashboardData?.active_applications ? (dashboardData.active_applications / dashboardData.total_applications) * 100 : 0
    },
    {
      title: 'Interviews Scheduled',
      value: dashboardData?.interviews_scheduled || 0,
      icon: <Schedule />,
      color: '#ea580c',
      subtitle: 'Upcoming sessions',
      trend: '+2 this week'
    },
    {
      title: 'Interviews Completed',
      value: dashboardData?.interviews_completed || 0,
      icon: <CheckCircle />,
      color: '#16a34a',
      subtitle: 'Awaiting results',
      progress: dashboardData?.interviews_completed ? Math.min(100, (dashboardData.interviews_completed / 10) * 100) : 0
    },
    {
      title: 'Pending Assessments',
      value: dashboardData?.pending_assessments || 0,
      icon: <Assignment />,
      color: '#9333ea',
      subtitle: 'To be completed'
    },
    {
      title: 'Documents Status',
      value: dashboardData?.documents_verified || 0,
      icon: <Description />,
      color: '#dc2626',
      subtitle: `${dashboardData?.documents_uploaded || 0} uploaded`,
      progress: dashboardData?.documents_uploaded ? (dashboardData.documents_verified / dashboardData.documents_uploaded) * 100 : 0
    },
    {
      title: 'Profile Score',
      value: dashboardData?.profile_completion_percentage || 0,
      icon: <Assessment />,
      color: '#0284c7',
      subtitle: 'Completion rate',
      progress: dashboardData?.profile_completion_percentage || 0
    }
  ];

  if (isLoading) {
    return (
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: { 
          xs: 'repeat(1, 1fr)', 
          sm: 'repeat(2, 1fr)', 
          md: 'repeat(3, 1fr)', 
          lg: 'repeat(6, 1fr)' 
        }, 
        gap: 2 
      }}>
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <Card key={item} sx={{ height: 120 }}>
            <CardContent>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Box sx={{ backgroundColor: '#f1f5f9', height: 20, borderRadius: 1 }} />
                <Box sx={{ backgroundColor: '#f1f5f9', height: 32, borderRadius: 1 }} />
                <Box sx={{ backgroundColor: '#f1f5f9', height: 16, borderRadius: 1 }} />
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    );
  }

  return (
    <Box sx={{ 
      display: 'grid', 
      gridTemplateColumns: { 
        xs: 'repeat(1, 1fr)', 
        sm: 'repeat(2, 1fr)', 
        md: 'repeat(3, 1fr)', 
        lg: 'repeat(6, 1fr)' 
      }, 
      gap: 2 
    }}>
      {kpiData.map((kpi, index) => (
        <KPICard key={index} {...kpi} />
      ))}
    </Box>
  );
};
