
import React from 'react';
import { Box, Typography, Card, CardContent, Avatar, Chip } from '@mui/material';
import { Person, Email, Phone, LocationOn } from '@mui/icons-material';
import { Interview } from '../../MyInterviewsPage';

interface CandidateProfileFormProps {
  interview: Interview;
}

export const CandidateProfileForm: React.FC<CandidateProfileFormProps> = ({
  interview
}) => {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <Box sx={{ p: 3, fontFamily: 'Rubik, sans-serif' }}>
      <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold', fontFamily: 'Rubik, sans-serif' }}>
        Candidate Profile
      </Typography>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'start', gap: 3 }}>
            <Avatar sx={{ width: 64, height: 64, bgcolor: '#1976d2' }}>
              {getInitials(interview.candidateName)}
            </Avatar>
            
            <Box sx={{ flex: 1 }}>
              <Typography variant="h5" sx={{ mb: 1, fontWeight: 'bold' }}>
                {interview.candidateName}
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Email sx={{ fontSize: 16, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary">
                    {interview.candidateEmail}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <Chip 
                  label={`Applied for: ${interview.roleName}`}
                  variant="outlined"
                  size="small"
                />
                <Chip 
                  label={`Client: ${interview.clientName}`}
                  variant="outlined"
                  size="small"
                />
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold' }}>
            Application Details
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3 }}>
            <Box>
              <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                Role Applied
              </Typography>
              <Typography variant="body2">{interview.roleName}</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                Company
              </Typography>
              <Typography variant="body2">{interview.clientName}</Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};
