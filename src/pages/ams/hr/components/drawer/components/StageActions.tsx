
import React from 'react';
import { Box, IconButton } from '@mui/material';
import { Settings as SettingsIcon } from '@mui/icons-material';

interface StageActionsProps {
  onConfigure: () => void;
}

const StageActions: React.FC<StageActionsProps> = ({ onConfigure }) => {
  return (
    <Box sx={{ mt: 'auto', display: 'flex', justifyContent: 'flex-end' }}>
      <IconButton 
        size="small" 
        onClick={onConfigure} 
        sx={{ 
          p: 1,
          backgroundColor: '#f3f4f6',
          '&:hover': {
            backgroundColor: '#e5e7eb',
          },
        }}
      >
        <SettingsIcon sx={{ fontSize: '16px', color: '#6b7280' }} />
      </IconButton>
    </Box>
  );
};

export default StageActions;
