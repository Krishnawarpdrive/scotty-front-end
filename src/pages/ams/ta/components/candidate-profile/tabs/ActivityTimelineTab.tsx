
import React from 'react';
import { Box, Typography } from '@mui/material';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from '@mui/lab';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface ActivityTimelineTabProps {
  candidate: any;
  role: string;
}

// Mock timeline data
const mockActivities = [
  {
    id: '1',
    title: 'Application Submitted',
    description: 'Candidate applied for the position',
    timestamp: '2024-01-10 09:00',
    status: 'completed' as const,
    type: 'application'
  },
  {
    id: '2',
    title: 'Resume Screened',
    description: 'Initial resume review completed successfully',
    timestamp: '2024-01-11 14:30',
    status: 'completed' as const,
    type: 'screening'
  },
  {
    id: '3',
    title: 'Phone Screening Scheduled',
    description: 'Phone screening scheduled for tomorrow',
    timestamp: '2024-01-12 16:45',
    status: 'in-progress' as const,
    type: 'interview'
  },
  {
    id: '4',
    title: 'Technical Interview',
    description: 'Technical interview pending',
    timestamp: '2024-01-15 10:00',
    status: 'pending' as const,
    type: 'interview'
  }
];

export const ActivityTimelineTab: React.FC<ActivityTimelineTabProps> = ({
  candidate,
  role
}) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'in-progress':
        return <Clock className="h-4 w-4 text-blue-600" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return '#10b981';
      case 'in-progress':
        return '#3b82f6';
      default:
        return '#9ca3af';
    }
  };

  return (
    <Box sx={{ p: 3, height: '100%', overflow: 'auto' }}>
      <Typography 
        variant="h6" 
        sx={{ 
          fontFamily: 'Rubik, sans-serif',
          fontWeight: 600,
          mb: 3,
          color: '#111827'
        }}
      >
        Activity Timeline - {role}
      </Typography>

      <Timeline>
        {mockActivities.map((activity, index) => (
          <TimelineItem key={activity.id}>
            <TimelineSeparator>
              <TimelineDot sx={{ bgcolor: getStatusColor(activity.status), p: 1 }}>
                {getStatusIcon(activity.status)}
              </TimelineDot>
              {index < mockActivities.length - 1 && <TimelineConnector />}
            </TimelineSeparator>
            <TimelineContent>
              <Box sx={{ mb: 2 }}>
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontFamily: 'Rubik, sans-serif',
                    fontWeight: 600,
                    color: '#111827',
                    mb: 0.5
                  }}
                >
                  {activity.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontFamily: 'Rubik, sans-serif',
                    color: '#6b7280',
                    mb: 0.5
                  }}
                >
                  {activity.description}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    fontFamily: 'Rubik, sans-serif',
                    color: '#9ca3af'
                  }}
                >
                  {activity.timestamp}
                </Typography>
              </Box>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </Box>
  );
};
