
import React from 'react';
import { Box, Typography, Avatar, Chip } from '@mui/material';
import { Person, Phone, Email } from '@mui/icons-material';
import { Candidate } from '../../../types/CandidateTypes';
import { PhoneScreeningFormData } from '../hooks/usePhoneScreeningForm';

interface EnhancedCandidateHeaderProps {
  candidate: Candidate;
}

export const EnhancedCandidateHeader: React.FC<EnhancedCandidateHeaderProps> = ({
  candidate
}) => {
  return (
    <Box sx={{ 
      p: 3, 
      backgroundColor: '#f8f9fa',
      borderBottom: '1px solid #e0e0e0'
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
        <Avatar sx={{ width: 64, height: 64, bgcolor: '#1976d2' }}>
          <Person sx={{ fontSize: 32 }} />
        </Avatar>
        
        <Box sx={{ flex: 1 }}>
          <Typography variant="h5" fontWeight="bold" sx={{ mb: 1 }}>
            {candidate.name}
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            {candidate.email && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Email sx={{ fontSize: 16, color: 'text.secondary' }} />
                <Typography variant="body2" color="text.secondary">
                  {candidate.email}
                </Typography>
              </Box>
            )}
            
            {candidate.phone && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Phone sx={{ fontSize: 16, color: 'text.secondary' }} />
                <Typography variant="body2" color="text.secondary">
                  {candidate.phone}
                </Typography>
              </Box>
            )}
          </Box>
          
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {candidate.appliedRole && (
              <Chip 
                label={`Applied: ${candidate.appliedRole}`}
                color="primary"
                variant="outlined"
                size="small"
              />
            )}
            
            {candidate.experience && (
              <Chip 
                label={`${candidate.experience} exp`}
                color="secondary"
                variant="outlined"
                size="small"
              />
            )}
            
            {candidate.location && (
              <Chip 
                label={candidate.location}
                variant="outlined"
                size="small"
              />
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
