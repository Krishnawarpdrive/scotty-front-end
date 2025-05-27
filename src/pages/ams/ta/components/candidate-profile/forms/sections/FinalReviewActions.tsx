
import React from 'react';
import { Box } from '@mui/material';
import { Save, Send } from '@mui/icons-material';
import { DesignSystemButton } from '@/components/ui-mui/DesignSystemButton';

export const FinalReviewActions: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
      <DesignSystemButton
        variant="contained"
        startIcon={<Save />}
        sx={{ flex: 1 }}
      >
        Save Review
      </DesignSystemButton>
      <DesignSystemButton
        variant="outlined"
        startIcon={<Send />}
        sx={{ flex: 1 }}
      >
        Send Offer Letter
      </DesignSystemButton>
    </Box>
  );
};
