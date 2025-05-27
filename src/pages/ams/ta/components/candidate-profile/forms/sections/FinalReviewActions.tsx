
import React from 'react';
import { Box, Button } from '@mui/material';
import { Save, Send } from '@mui/icons-material';

export const FinalReviewActions: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
      <Button
        variant="contained"
        startIcon={<Save />}
        sx={{ 
          bgcolor: '#009933', 
          '&:hover': { bgcolor: '#00a341' },
          flex: 1
        }}
      >
        Save Review
      </Button>
      <Button
        variant="outlined"
        startIcon={<Send />}
        sx={{ flex: 1 }}
      >
        Send Offer Letter
      </Button>
    </Box>
  );
};
