
import React from 'react';
import { Typography } from '@mui/material';

interface PipelineConfigHeaderProps {
  roleName?: string;
}

const PipelineConfigHeader: React.FC<PipelineConfigHeaderProps> = ({ roleName }) => {
  return (
    <Typography
      variant="h6"
      sx={{
        fontFamily: 'Rubik, sans-serif',
        fontSize: '16px',
        fontWeight: 500,
        color: '#262626',
        mb: 3,
      }}
    >
      Configure Hiring Pipeline for {roleName}
    </Typography>
  );
};

export default PipelineConfigHeader;
