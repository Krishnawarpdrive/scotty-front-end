
import React from 'react';
import { Box, Card, CardContent, Typography, Chip, Button } from '@mui/material';
import { Calendar, Clock, Video } from 'lucide-react';
import { Interview } from '../../../MyInterviewsPage';

interface ScheduledInterviewsTabProps {
  interview: Interview;
}

export const ScheduledInterviewsTab: React.FC<ScheduledInterviewsTabProps> = ({
  interview
}) => {
  const upcomingInterviews = [
    {
      id: '1',
      title: 'Technical Round 2',
      date: '2024-01-20',
      time: '14:00',
      duration: '60 minutes',
      type: 'Technical Interview',
      status: 'scheduled'
    },
    {
      id: '2',
      title: 'Client Final Round',
      date: '2024-01-22',
      time: '10:00',
      duration: '45 minutes',
      type: 'Client Interview',
      status: 'scheduled'
    }
  ];

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
        Upcoming Interviews
      </Typography>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {upcomingInterviews.map((interviewItem) => (
          <Card key={interviewItem.id} sx={{ border: '1px solid #e0e0e0' }}>
            <CardContent sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {interviewItem.title}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2, mb: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <Calendar className="h-4 w-4 text-gray-600" />
                      <Typography variant="body2" color="text.secondary">
                        {interviewItem.date}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <Clock className="h-4 w-4 text-gray-600" />
                      <Typography variant="body2" color="text.secondary">
                        {interviewItem.time} ({interviewItem.duration})
                      </Typography>
                    </Box>
                  </Box>
                  <Chip 
                    label={interviewItem.type}
                    size="small"
                    variant="outlined"
                  />
                </Box>
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<Video />}
                  sx={{ borderRadius: 2 }}
                >
                  Join
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};
