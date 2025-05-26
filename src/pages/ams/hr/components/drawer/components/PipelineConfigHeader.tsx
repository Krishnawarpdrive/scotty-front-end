
import React from 'react';
import { Typography } from '@mui/material';

interface PipelineConfigHeaderProps {
  roleName?: string;
}

const PipelineConfigHeader: React.FC<PipelineConfigHeaderProps> = ({
  roleName
}) => {
  return (
    <div className="mb-6">
      <Typography variant="h5" sx={{
        fontFamily: 'Rubik, sans-serif',
        fontSize: '20px',
        fontWeight: 600,
        color: '#1a1a1a',
        mb: 1
      }}>
        Configure Hiring Pipeline
      </Typography>
      {roleName && (
        <Typography variant="subtitle1" sx={{
          fontFamily: 'Rubik, sans-serif',
          fontSize: '14px',
          color: '#666',
          mb: 2
        }}>
          Role: {roleName}
        </Typography>
      )}
    </div>
  );
};

export default PipelineConfigHeader;
