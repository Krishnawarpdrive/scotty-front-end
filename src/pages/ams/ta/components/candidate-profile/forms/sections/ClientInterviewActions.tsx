
import React from 'react';
import { Box, Button } from '@mui/material';
import { VideoCall, Save } from '@mui/icons-material';

export const ClientInterviewActions: React.FC = () => {
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
        Save Progress
      </Button>
      <Button
        variant="outlined"
        startIcon={<VideoCall />}
        sx={{ flex: 1 }}
      >
        Schedule Client Interview
      </Button>
    </Box>
  );
};
