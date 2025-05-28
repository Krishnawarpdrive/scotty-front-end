
import React from 'react';
import { Box, Typography, Card, CardContent, Avatar } from '@mui/material';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from '@mui/lab';
import { CheckCircle, Schedule, PersonOutline, Assignment } from '@mui/icons-material';

interface Stage {
  id: string;
  name: string;
  status: 'completed' | 'current' | 'pending';
  order: number;
}

interface Role {
  id: string;
  name: string;
  stages: Stage[];
}

interface ActivityTimelineTabProps {
  candidate: any;
  role: Role;
}

// Mock activity data
const mockActivities = [
  {
    id: '1',
    type: 'stage_completed',
    title: 'Phone Screening Completed',
    description: 'Successfully passed initial phone screening with Sarah Johnson',
    timestamp: '2024-01-15 14:30',
    user: 'Sarah Johnson',
    icon: 'completed'
  },
  {
    id: '2',
    type: 'note_added',
    title: 'Interview Notes Added',
    description: 'Technical assessment notes added after phone screening',
    timestamp: '2024-01-15 14:35',
    user: 'Sarah Johnson',
    icon: 'note'
  },
  {
    id: '3',
    type: 'stage_scheduled',
    title: 'Technical Interview Scheduled',
    description: 'Technical interview scheduled for tomorrow at 2:00 PM',
    timestamp: '2024-01-15 15:00',
    user: 'System',
    icon: 'scheduled'
  },
  {
    id: '4',
    type: 'application_submitted',
    title: 'Application Submitted',
    description: 'Initial application received for Network Administrator position',
    timestamp: '2024-01-14 09:15',
    user: 'Candidate',
    icon: 'submitted'
  }
];

export const ActivityTimelineTab: React.FC<ActivityTimelineTabProps> = ({
  candidate,
  role
}) => {
  const getActivityIcon = (iconType: string) => {
    switch (iconType) {
      case 'completed':
        return <CheckCircle sx={{ color: '#009933' }} />;
      case 'scheduled':
        return <Schedule sx={{ color: '#2196F3' }} />;
      case 'note':
        return <PersonOutline sx={{ color: '#FF9800' }} />;
      case 'submitted':
        return <Assignment sx={{ color: '#9C27B0' }} />;
      default:
        return <PersonOutline sx={{ color: '#666' }} />;
    }
  };

  const getActivityColor = (iconType: string) => {
    switch (iconType) {
      case 'completed': return '#009933';
      case 'scheduled': return '#2196F3';
      case 'note': return '#FF9800';
      case 'submitted': return '#9C27B0';
      default: return '#666';
    }
  };

  return (
    <Box sx={{ p: 3, height: '100%', overflow: 'auto' }}>
      <Typography 
        variant="subtitle2" 
        sx={{ 
          fontFamily: 'Rubik, sans-serif',
          fontWeight: 600,
          mb: 3,
          color: '#262626'
        }}
      >
        Activity Timeline for {role.name}
      </Typography>

      <Timeline sx={{ p: 0 }}>
        {mockActivities.map((activity, index) => (
          <TimelineItem key={activity.id}>
            <TimelineSeparator>
              <TimelineDot sx={{ bgcolor: 'transparent', p: 0, boxShadow: 'none' }}>
                {getActivityIcon(activity.icon)}
              </TimelineDot>
              {index < mockActivities.length - 1 && (
                <TimelineConnector sx={{ bgcolor: '#e0e0e0' }} />
              )}
            </TimelineSeparator>
            
            <TimelineContent sx={{ py: 1, px: 2 }}>
              <Card sx={{ 
                borderRadius: '8px', 
                border: '1px solid #e0e0e0',
                boxShadow: 'none'
              }}>
                <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                    <Box sx={{ flex: 1 }}>
                      <Typography
                        sx={{
                          fontFamily: 'Rubik, sans-serif',
                          fontSize: '13px',
                          fontWeight: 600,
                          color: getActivityColor(activity.icon),
                          mb: 0.5
                        }}
                      >
                        {activity.title}
                      </Typography>
                      
                      <Typography
                        sx={{
                          fontFamily: 'Rubik, sans-serif',
                          fontSize: '12px',
                          color: '#666',
                          mb: 1,
                          lineHeight: 1.4
                        }}
                      >
                        {activity.description}
                      </Typography>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Avatar sx={{ width: 16, height: 16, fontSize: '10px' }}>
                          {activity.user.charAt(0)}
                        </Avatar>
                        <Typography
                          sx={{
                            fontFamily: 'Rubik, sans-serif',
                            fontSize: '11px',
                            color: '#999'
                          }}
                        >
                          {activity.user} • {activity.timestamp}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </Box>
  );
};
