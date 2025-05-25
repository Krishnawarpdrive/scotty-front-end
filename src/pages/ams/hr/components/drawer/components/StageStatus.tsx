
import React from 'react';
import { Box, Typography } from '@mui/material';
import {
  CheckCircle as CheckIcon,
  Warning as WarningIcon,
} from '@mui/icons-material';

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

const StageStatus: React.FC<StageStatusProps> = ({ stage }) => {
  const isConfigured = stage.config && Object.keys(stage.config).length > 0;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
      {isConfigured ? (
        <CheckIcon sx={{ fontSize: '16px', color: '#009933', mr: 1 }} />
      ) : (
        <WarningIcon sx={{ fontSize: '16px', color: '#f59e0b', mr: 1 }} />
      )}
      <Typography
        sx={{
          fontFamily: 'Rubik, sans-serif',
          fontSize: '12px',
          color: isConfigured ? '#009933' : '#f59e0b',
          fontWeight: 500,
        }}
      >
        {isConfigured ? 'Configured' : 'Not configured'}
      </Typography>
    </Box>
  );
};

export default StageStatus;
