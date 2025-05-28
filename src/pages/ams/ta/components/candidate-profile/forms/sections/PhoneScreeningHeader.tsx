
import React from 'react';
import { Box, Typography, Chip } from '@mui/material';
import { Phone, Calendar, User } from 'lucide-react';

interface PhoneScreeningHeaderProps {
  candidateName: string;
  phoneNumber: string;
  scheduledDate?: string;
  duration?: string;
  status: 'pending' | 'in-progress' | 'completed';
}

export const PhoneScreeningHeader: React.FC<PhoneScreeningHeaderProps> = ({
  candidateName,
  phoneNumber,
  scheduledDate,
  duration,
  status
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return { color: '#10b981', bgcolor: '#ecfdf5' };
      case 'in-progress': return { color: '#f59e0b', bgcolor: '#fffbeb' };
      default: return { color: '#6b7280', bgcolor: '#f9fafb' };
    }
  };

  return (
    <Box sx={{ mb: 3, p: 3, bgcolor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6" sx={{ 
          fontFamily: 'Rubik, sans-serif', 
          fontWeight: 600,
          fontSize: '18px',
          color: '#111827'
        }}>
          Phone Screening Session
        </Typography>
        <Chip
          label={status.replace('-', ' ').toUpperCase()}
          sx={{
            ...getStatusColor(status),
            fontFamily: 'Rubik, sans-serif',
            fontSize: '11px',
            fontWeight: 500,
            textTransform: 'uppercase'
          }}
        />
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <User className="h-4 w-4 text-gray-500" />
          <Typography variant="body2" sx={{ fontFamily: 'Rubik, sans-serif', color: '#374151' }}>
            <strong>Candidate:</strong> {candidateName}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Phone className="h-4 w-4 text-gray-500" />
          <Typography variant="body2" sx={{ fontFamily: 'Rubik, sans-serif', color: '#374151' }}>
            <strong>Phone:</strong> {phoneNumber}
          </Typography>
        </Box>

        {scheduledDate && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Calendar className="h-4 w-4 text-gray-500" />
            <Typography variant="body2" sx={{ fontFamily: 'Rubik, sans-serif', color: '#374151' }}>
              <strong>Scheduled:</strong> {scheduledDate}
            </Typography>
          </Box>
        )}

        {duration && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2" sx={{ fontFamily: 'Rubik, sans-serif', color: '#374151' }}>
              <strong>Duration:</strong> {duration}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};
