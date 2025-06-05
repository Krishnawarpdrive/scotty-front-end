
import React from 'react';
import { Box, Typography, Card, CardContent, Chip, Button } from '@mui/material';
import { Event, AccessTime, Videocam, LocationOn, Person, Business } from '@mui/icons-material';
import { Interview } from '../../MyInterviewsPage';
import { format } from 'date-fns';

interface InterviewDetailsFormProps {
  interview: Interview;
}

export const InterviewDetailsForm: React.FC<InterviewDetailsFormProps> = ({
  interview
}) => {
  const interviewDate = new Date(interview.scheduledDate);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return { bgcolor: '#e3f2fd', color: '#1976d2' };
      case 'completed':
        return { bgcolor: '#e8f5e8', color: '#2e7d32' };
      case 'cancelled':
        return { bgcolor: '#ffebee', color: '#d32f2f' };
      case 'in-progress':
        return { bgcolor: '#fff3e0', color: '#f57c00' };
      default:
        return { bgcolor: '#f5f5f5', color: '#666' };
    }
  };

  return (
    <Box sx={{ p: 3, fontFamily: 'Rubik, sans-serif' }}>
      <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold', fontFamily: 'Rubik, sans-serif' }}>
        Interview Details
      </Typography>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3 }}>
            <Box>
              <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                Interview Date & Time
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <Event sx={{ fontSize: 18, color: '#1976d2' }} />
                <Typography variant="body2">
                  {format(interviewDate, 'EEEE, MMMM dd, yyyy')}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <AccessTime sx={{ fontSize: 18, color: '#1976d2' }} />
                <Typography variant="body2">
                  {format(interviewDate, 'hh:mm a')} ({interview.duration} minutes)
                </Typography>
              </Box>
            </Box>

            <Box>
              <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                Status
              </Typography>
              <Chip 
                label={interview.status}
                sx={getStatusColor(interview.status)}
              />
            </Box>
          </Box>
        </CardContent>
      </Card>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold' }}>
            Role Information
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3 }}>
            <Box>
              <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                Role
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Person sx={{ fontSize: 18, color: '#666' }} />
                <Typography variant="body2">{interview.roleName}</Typography>
              </Box>
            </Box>
            <Box>
              <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                Client
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Business sx={{ fontSize: 18, color: '#666' }} />
                <Typography variant="body2">{interview.clientName}</Typography>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold' }}>
            Interview Settings
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3 }}>
            <Box>
              <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                Interview Type
              </Typography>
              <Chip 
                label={interview.interviewType}
                variant="outlined"
                size="small"
              />
            </Box>
            <Box>
              <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                Location
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {interview.meetingLink ? (
                  <>
                    <Videocam sx={{ fontSize: 18, color: '#1976d2' }} />
                    <Typography variant="body2" color="#1976d2">Virtual Meeting</Typography>
                  </>
                ) : (
                  <>
                    <LocationOn sx={{ fontSize: 18, color: '#666' }} />
                    <Typography variant="body2">{interview.location || 'Not specified'}</Typography>
                  </>
                )}
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {interview.notes && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold' }}>
              Interview Notes
            </Typography>
            <Box sx={{ bgcolor: '#f5f5f5', p: 2, borderRadius: 1 }}>
              <Typography variant="body2">{interview.notes}</Typography>
            </Box>
          </CardContent>
        </Card>
      )}

      {interview.meetingLink && (
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            startIcon={<Videocam />}
            onClick={() => window.open(interview.meetingLink, '_blank')}
            sx={{ bgcolor: '#1976d2' }}
          >
            Join Interview
          </Button>
        </Box>
      )}
    </Box>
  );
};
