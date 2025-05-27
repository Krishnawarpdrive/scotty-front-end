
import React from 'react';
import { Box, Typography } from '@mui/material';
import { CheckCircle, RadioButtonUnchecked, Schedule } from '@mui/icons-material';
import { TimelineItemData } from '../../types/CandidateTypes';

interface TimelineItemProps {
  data: TimelineItemData;
  isLast?: boolean;
}

export const TimelineItem: React.FC<TimelineItemProps> = ({
  data,
  isLast = false
}) => {
  const getStatusIcon = () => {
    switch (data.status) {
      case 'completed':
        return <CheckCircle sx={{ fontSize: 18, color: '#009933' }} />;
      case 'in-progress':
        return <Schedule sx={{ fontSize: 18, color: '#f59e0b' }} />;
      case 'pending':
        return <RadioButtonUnchecked sx={{ fontSize: 18, color: '#d1d5db' }} />;
      default:
        return <RadioButtonUnchecked sx={{ fontSize: 18, color: '#d1d5db' }} />;
    }
  };

  const getStatusColor = () => {
    switch (data.status) {
      case 'completed': return '#009933';
      case 'in-progress': return '#f59e0b';
      case 'pending': return '#d1d5db';
      default: return '#d1d5db';
    }
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      alignItems: 'flex-start', 
      mb: isLast ? 0 : 2,
      position: 'relative'
    }}>
      {/* Timeline Line */}
      {!isLast && (
        <Box sx={{
          position: 'absolute',
          left: 8,
          top: 24,
          width: 2,
          height: 24,
          bgcolor: data.status === 'completed' ? '#009933' : '#e5e7eb'
        }} />
      )}
      
      {/* Status Icon */}
      <Box sx={{ 
        mr: 2, 
        zIndex: 1,
        backgroundColor: 'white',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {getStatusIcon()}
      </Box>
      
      {/* Content */}
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography 
          variant="subtitle2" 
          sx={{ 
            fontFamily: 'Rubik, sans-serif', 
            fontWeight: 600,
            fontSize: '13px',
            color: data.status === 'pending' ? '#9ca3af' : '#374151'
          }}
        >
          {data.title}
        </Typography>
        
        {data.date && (
          <Typography 
            variant="caption" 
            sx={{ 
              fontFamily: 'Rubik, sans-serif',
              fontSize: '11px',
              color: '#6b7280',
              display: 'block',
              mt: 0.5
            }}
          >
            {data.date}
          </Typography>
        )}
        
        <Typography 
          variant="body2" 
          sx={{ 
            fontFamily: 'Rubik, sans-serif',
            fontSize: '11px',
            color: '#9ca3af',
            mt: 0.5
          }}
        >
          {data.description}
        </Typography>
      </Box>
    </Box>
  );
};
