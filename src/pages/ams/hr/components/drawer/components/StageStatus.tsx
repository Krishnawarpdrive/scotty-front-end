
import React from 'react';
import { Box, Typography, Chip } from '@mui/material';

interface Stage {
  id: string;
  name: string;
  category: 'internal' | 'external' | 'partner' | 'client' | 'verification';
  order: number;
  config?: any;
}

interface StageStatusProps {
  stage: Stage;
}

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'internal':
      return '#009933';
    case 'external':
      return '#f57c00';
    case 'partner':
      return '#7b1fa2';
    case 'client':
      return '#fbc02d';
    case 'verification':
      return '#616161';
    default:
      return '#e5e7eb';
  }
};

const StageStatus: React.FC<StageStatusProps> = ({ stage }) => {
  const categoryColor = getCategoryColor(stage.category);
  const isConfigured = stage.config && Object.keys(stage.config).length > 0;

  return (
    <Box sx={{ flexGrow: 1, mb: 2 }}>
      {/* Stage Category */}
      <Chip
        label={stage.category}
        size="small"
        sx={{
          backgroundColor: `${categoryColor}15`,
          color: categoryColor,
          fontFamily: 'Rubik, sans-serif',
          fontSize: '11px',
          fontWeight: 500,
          height: '24px',
          mb: 1,
        }}
      />

      {/* Configuration Status */}
      <Typography
        sx={{
          fontFamily: 'Rubik, sans-serif',
          fontSize: '11px',
          color: isConfigured ? '#009933' : '#f59e0b',
          fontWeight: 500,
        }}
      >
        {isConfigured ? 'Configured' : 'Not Configured'}
      </Typography>
    </Box>
  );
};

export default StageStatus;
