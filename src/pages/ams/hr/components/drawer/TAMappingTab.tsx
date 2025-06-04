
import React from 'react';
import { Box, Typography } from '@mui/material';
import { EnhancedTAMappingInterface } from '../ta-mapping/EnhancedTAMappingInterface';

interface TAMappingTabProps {
  roleData: any;
}

const TAMappingTab: React.FC<TAMappingTabProps> = ({ roleData }) => {
  return (
    <Box sx={{ height: '100%', p: 2 }}>
      <Typography
        variant="h6"
        sx={{
          fontFamily: 'Rubik, sans-serif',
          fontSize: '18px',
          fontWeight: 600,
          color: '#262626',
          mb: 3,
        }}
      >
        TA Mapping for {roleData?.name}
      </Typography>
      
      <EnhancedTAMappingInterface roleData={roleData} />
    </Box>
  );
};

export default TAMappingTab;
