
import React from 'react';
import { Box, Typography, Card, CardContent, Chip } from '@mui/material';
import { Interview } from '../../MyInterviewsPage';
import { format } from 'date-fns';

interface InterviewHistoryFormProps {
  interview: Interview;
}

export const InterviewHistoryForm: React.FC<InterviewHistoryFormProps> = ({
  interview
}) => {
  // Mock interview history data
  const interviewHistory = [
    {
      id: '1',
      date: new Date(interview.scheduledDate),
      type: interview.interviewType,
      status: interview.status,
      interviewer: 'Current Interview',
      notes: 'Initial screening interview'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return { bgcolor: '#e8f5e8', color: '#2e7d32' };
      case 'scheduled':
        return { bgcolor: '#e3f2fd', color: '#1976d2' };
      case 'cancelled':
        return { bgcolor: '#ffebee', color: '#d32f2f' };
      default:
        return { bgcolor: '#f5f5f5', color: '#666' };
    }
  };

  return (
    <Box sx={{ p: 3, fontFamily: 'Rubik, sans-serif' }}>
      <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold', fontFamily: 'Rubik, sans-serif' }}>
        Interview History
      </Typography>

      <Card>
        <CardContent>
          <Typography variant="subtitle1" sx={{ mb: 3, fontWeight: 'bold' }}>
            Previous Interviews for {interview.candidateName}
          </Typography>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {interviewHistory.map((historyItem, index) => (
              <Box 
                key={historyItem.id}
                sx={{
                  border: '1px solid #e0e0e0',
                  borderRadius: 1,
                  p: 3,
                  position: 'relative'
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Typography variant="subtitle2" fontWeight="bold">
                    {historyItem.type} Interview
                  </Typography>
                  <Chip 
                    label={historyItem.status}
                    size="small"
                    sx={getStatusColor(historyItem.status)}
                  />
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {format(historyItem.date, 'MMM dd, yyyy')} • {historyItem.interviewer}
                </Typography>
                <Typography variant="body2">
                  {historyItem.notes}
                </Typography>
              </Box>
            ))}
          </Box>

          {interviewHistory.length === 1 && (
            <Box sx={{ textAlign: 'center', py: 4, color: 'text.secondary' }}>
              <Typography variant="body2">
                This is the first interview for this candidate
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};
