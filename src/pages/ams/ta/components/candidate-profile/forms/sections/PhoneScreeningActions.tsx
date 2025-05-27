
import React from 'react';
import { Box } from '@mui/material';
import { Save, Phone } from '@mui/icons-material';
import { DesignSystemButton } from '@/components/ui-mui/DesignSystemButton';

export const PhoneScreeningActions: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
      <DesignSystemButton
        variant="contained"
        startIcon={<Save />}
        sx={{ flex: 1 }}
      >
        Save Progress
      </DesignSystemButton>
      <DesignSystemButton
        variant="outlined"
        startIcon={<Phone />}
        sx={{ flex: 1 }}
      >
        Schedule Call
      </DesignSystemButton>
    </Box>
  );
};
