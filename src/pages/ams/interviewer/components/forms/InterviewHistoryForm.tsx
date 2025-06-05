
import React from 'react';
import { Box, Typography, Card, CardContent, Chip, Timeline, TimelineItem, TimelineSeparator, TimelineDot, TimelineContent } from '@mui/material';
import { Event, Person, Star } from '@mui/icons-material';
import { Interview } from '../../MyInterviewsPage';

interface InterviewHistoryFormProps {
  interview: Interview;
}

export const InterviewHistoryForm: React.FC<InterviewHistoryFormProps> = ({
  interview
}) => {
  // Mock historical data
  const interviewHistory = [
    {
      id: '1',
      date: '2024-01-15',
      stage: 'Phone Screening',
      interviewer: 'Sarah Johnson',
      rating: 4,
      status: 'Passed',
      notes: 'Good communication skills, strong technical background'
    },
    {
      id: '2',
      date: '2024-01-20',
      stage: 'Technical Interview',
      interviewer: 'Mike Chen',
      rating: 4,
      status: 'Passed',
      notes: 'Excellent problem-solving approach, clean code'
    },
    {
      id: '3',
      date: '2024-01-25',
      stage: 'Behavioral Interview',
      interviewer: 'Current Session',
      rating: 0,
      status: 'In Progress',
      notes: 'Current interview session'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Passed':
        return { bgcolor: '#e8f5e8', color: '#2e7d32' };
      case 'Failed':
        return { bgcolor: '#ffebee', color: '#d32f2f' };
      case 'In Progress':
        return { bgcolor: '#fff3e0', color: '#f57c00' };
      default:
        return { bgcolor: '#f5f5f5', color: '#666' };
    }
  };

  return (
    <Box sx={{ p: 3, fontFamily: 'Rubik, sans-serif' }}>
      <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
        Interview History
      </Typography>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold' }}>
            Candidate Journey
          </Typography>
          
          <Timeline sx={{ padding: 0 }}>
            {interviewHistory.map((item, index) => (
              <TimelineItem key={item.id}>
                <TimelineSeparator>
                  <TimelineDot 
                    color={item.status === 'Passed' ? 'success' : item.status === 'In Progress' ? 'warning' : 'error'}
                  >
                    {item.status === 'In Progress' ? <Person /> : <Event />}
                  </TimelineDot>
                  {index < interviewHistory.length - 1 && <Box sx={{ height: '60px', borderLeft: '2px solid #e0e0e0' }} />}
                </TimelineSeparator>
                
                <TimelineContent sx={{ py: 0, px: 2 }}>
                  <Card variant="outlined" sx={{ mb: 2 }}>
                    <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                        <Typography variant="subtitle2" fontWeight="bold">
                          {item.stage}
                        </Typography>
                        <Chip 
                          label={item.status}
                          size="small"
                          sx={getStatusColor(item.status)}
                        />
                      </Box>
                      
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                        {new Date(item.date).toLocaleDateString()} • Interviewer: {item.interviewer}
                      </Typography>
                      
                      {item.rating > 0 && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <Star sx={{ fontSize: 16, color: '#ffd700' }} />
                          <Typography variant="body2">{item.rating}/5</Typography>
                        </Box>
                      )}
                      
                      <Typography variant="body2" color="text.secondary">
                        {item.notes}
                      </Typography>
                    </CardContent>
                  </Card>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold' }}>
            Overall Progress
          </Typography>
          
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 2 }}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="success.main" fontWeight="bold">2</Typography>
              <Typography variant="caption" color="text.secondary">Stages Passed</Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="warning.main" fontWeight="bold">1</Typography>
              <Typography variant="caption" color="text.secondary">In Progress</Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" color="primary.main" fontWeight="bold">4.0</Typography>
              <Typography variant="caption" color="text.secondary">Avg Rating</Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};
