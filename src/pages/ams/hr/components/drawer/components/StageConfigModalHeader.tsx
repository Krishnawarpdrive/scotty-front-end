
import React from 'react';
import { DialogTitle, Typography } from '@mui/material';

interface StageConfigModalHeaderProps {
  stageName: string;
}

const StageConfigModalHeader: React.FC<StageConfigModalHeaderProps> = ({
  stageName,
}) => {
  return (
    <DialogTitle>
      <Typography
        variant="h6"
        sx={{
          fontFamily: 'Rubik, sans-serif',
          fontSize: '18px',
          fontWeight: 500,
          color: '#262626',
        }}
      >
        Configure {stageName}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          fontFamily: 'Rubik, sans-serif',
          fontSize: '13px',
          color: '#6b7280',
          mt: 0.5,
        }}
      >
        Set up the interview format and assign interviewers
      </Typography>
    </DialogTitle>
  );
};

export default StageConfigModalHeader;
