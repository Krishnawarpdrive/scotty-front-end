
import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';

interface TAMappingTabProps {
  roleData: any;
}

const TAMappingTab: React.FC<TAMappingTabProps> = ({ roleData }) => {
  return (
    <Box sx={{ height: '100%' }}>
      <Typography
        variant="h6"
        sx={{
          fontFamily: 'Rubik, sans-serif',
          fontSize: '16px',
          fontWeight: 500,
          color: '#262626',
          mb: 2,
        }}
      >
        TA Mapping for {roleData?.name}
      </Typography>
      
      <Card sx={{ p: 2 }}>
        <CardContent>
          <Typography
            sx={{
              fontFamily: 'Rubik, sans-serif',
              fontSize: '13px',
              color: '#666',
              textAlign: 'center',
              py: 4,
            }}
          >
            TA Mapping functionality will be implemented here.
            This will include assigning Talent Acquisition specialists to different stages
            and managing workload distribution.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default TAMappingTab;
