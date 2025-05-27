
import React from 'react';
import { Box, Typography } from '@mui/material';
import { CheckCircle, RadioButtonUnchecked, Schedule } from '@mui/icons-material';

interface TimelineItemData {
  id: string;
  title: string;
  date: string;
  status: 'completed' | 'in-progress' | 'pending';
  description: string;
}

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
        return <Schedule sx={{ color: '#f59e0b', fontSize: 24 }} />;
      default:
        return <RadioButtonUnchecked sx={{ color: '#e0e0e0', fontSize: 24 }} />;
    }
  };

  const getStatusColor = () => {
    switch (item.status) {
      case 'completed':
        return '#009933';
      case 'in-progress':
        return '#f59e0b';
      default:
        return '#9ca3af';
    }
  };

  return (
    <Box sx={{ 
      position: 'relative', 
      pb: isLast ? 0 : 3,
      ml: 3
    }}>
      {/* Status Icon */}
      <Box sx={{
        position: 'absolute',
        left: -15,
        top: 0,
        bgcolor: 'white',
        border: isActive ? `2px solid ${getStatusColor()}` : 'none',
        borderRadius: '50%',
        p: isActive ? 0.5 : 0
      }}>
        {getStatusIcon()}
      </Box>

      {/* Content */}
      <Box sx={{ ml: 2 }}>
        <Typography variant="subtitle2" sx={{ 
          fontFamily: 'Rubik, sans-serif', 
          fontWeight: 600,
          color: isActive ? getStatusColor() : 'text.primary'
        }}>
          {item.title}
        </Typography>
        <Typography variant="caption" sx={{ 
          color: 'text.secondary',
          fontFamily: 'Rubik, sans-serif'
        }}>
          {item.date}
        </Typography>
        <Typography variant="body2" sx={{ 
          mt: 0.5,
          color: 'text.secondary',
          fontFamily: 'Rubik, sans-serif',
          fontSize: '0.875rem'
        }}>
          {item.description}
        </Typography>
      </Box>
    </Box>
  );
};
