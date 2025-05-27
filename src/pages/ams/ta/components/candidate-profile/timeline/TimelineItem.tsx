
import React from 'react';
import { Box, Typography, Chip } from '@mui/material';
import { CheckCircle, RadioButtonUnchecked, Schedule } from '@mui/icons-material';
import { TimelineItemData } from '../../types/CandidateTypes';

interface TimelineItemProps {
  item: TimelineItemData;
  isLast: boolean;
  isActive: boolean;
}

export const TimelineItem: React.FC<TimelineItemProps> = ({
  item,
  isLast,
  isActive
}) => {
  const getStatusIcon = () => {
    switch (item.status) {
      case 'completed':
        return <CheckCircle sx={{ color: '#009933', fontSize: 24 }} />;
      case 'in-progress':
        return <Schedule sx={{ color: '#FFC107', fontSize: 24 }} />;
      case 'pending':
        return <RadioButtonUnchecked sx={{ color: '#e0e0e0', fontSize: 24 }} />;
    }
  };

  const getStatusColor = () => {
    switch (item.status) {
      case 'completed':
        return '#009933';
      case 'in-progress':
        return '#FFC107';
      case 'pending':
        return '#e0e0e0';
    }
  };

  return (
    <Box sx={{ position: 'relative', pb: isLast ? 0 : 3 }}>
      {/* Timeline connector line */}
      {!isLast && (
        <Box sx={{
          position: 'absolute',
          left: 12,
          top: 24,
          bottom: -12,
          width: 2,
          bgcolor: item.status === 'completed' ? '#009933' : '#e0e0e0'
        }} />
      )}

      <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
        {/* Status Icon */}
        <Box sx={{ mt: 0.5 }}>
          {getStatusIcon()}
        </Box>

        {/* Content */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
            <Typography 
              variant="subtitle2" 
              sx={{ 
                fontFamily: 'Rubik, sans-serif', 
                fontWeight: 600,
                color: isActive ? '#009933' : '#262626'
              }}
            >
              {item.title}
            </Typography>
            {isActive && (
              <Chip 
                label="Current" 
                size="small" 
                sx={{ 
                  bgcolor: '#e8f5e8', 
                  color: '#009933',
                  fontSize: '10px',
                  height: '20px'
                }} 
              />
            )}
          </Box>
          
          <Typography 
            variant="caption" 
            sx={{ 
              fontFamily: 'Rubik, sans-serif', 
              color: '#666',
              display: 'block',
              mb: 0.5
            }}
          >
            {item.date}
          </Typography>
          
          <Typography 
            variant="body2" 
            sx={{ 
              fontFamily: 'Rubik, sans-serif', 
              color: '#444',
              fontSize: '12px',
              lineHeight: 1.4
            }}
          >
            {item.description}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
