
import React from 'react';
import { Box, Button } from '@mui/material';
import { Settings as SettingsIcon } from '@mui/icons-material';

interface StageActionsProps {
  onConfigure: () => void;
}

const StageActions: React.FC<StageActionsProps> = ({ onConfigure }) => {
  return (
    <Box sx={{ mt: 'auto' }}>
      <Button
        variant="outlined"
        size="small"
        startIcon={<SettingsIcon sx={{ fontSize: '14px' }} />}
        onClick={onConfigure}
        sx={{
          fontFamily: 'Rubik, sans-serif',
          fontSize: '11px',
          textTransform: 'none',
          borderColor: '#d1d5db',
          color: '#6b7280',
          '&:hover': {
            borderColor: '#009933',
            color: '#009933',
          },
        }}
      >
        Configure
      </Button>
    </Box>
  );
};

export default StageActions;
