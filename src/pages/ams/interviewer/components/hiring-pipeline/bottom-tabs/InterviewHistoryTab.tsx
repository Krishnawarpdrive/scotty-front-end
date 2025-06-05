
import React from 'react';
import { Box, Card, CardContent, Typography, Chip } from '@mui/material';
import { Calendar, Clock, CheckCircle, XCircle } from 'lucide-react';
import { Interview } from '../../../MyInterviewsPage';

interface InterviewHistoryTabProps {
  interview: Interview;
}

export const InterviewHistoryTab: React.FC<InterviewHistoryTabProps> = ({
  interview
}) => {
  const interviewHistory = [
    {
      id: '1',
      title: 'Phone Screening',
      date: '2024-01-15',
      time: '10:00',
      duration: '30 minutes',
      status: 'completed',
      outcome: 'passed'
    },
    {
      id: '2',
      title: 'Technical Round 1',
      date: '2024-01-18',
      time: '15:00',
      duration: '60 minutes',
      status: 'completed',
      outcome: 'passed'
    }
  ];

  const getStatusIcon = (outcome: string) => {
    return outcome === 'passed' ? 
      <CheckCircle className="h-4 w-4 text-green-600" /> : 
      <XCircle className="h-4 w-4 text-red-600" />;
  };

  const getStatusColor = (outcome: string) => {
    return outcome === 'passed' ? 'success' : 'error';
  };

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
        Interview History
      </Typography>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {interviewHistory.map((historyItem) => (
          <Card key={historyItem.id} sx={{ border: '1px solid #e0e0e0' }}>
            <CardContent sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {historyItem.title}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2, mb: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <Calendar className="h-4 w-4 text-gray-600" />
                      <Typography variant="body2" color="text.secondary">
                        {historyItem.date}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <Clock className="h-4 w-4 text-gray-600" />
                      <Typography variant="body2" color="text.secondary">
                        {historyItem.time} ({historyItem.duration})
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {getStatusIcon(historyItem.outcome)}
                  <Chip 
                    label={historyItem.outcome === 'passed' ? 'Passed' : 'Failed'}
                    size="small"
                    color={getStatusColor(historyItem.outcome)}
                  />
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};
