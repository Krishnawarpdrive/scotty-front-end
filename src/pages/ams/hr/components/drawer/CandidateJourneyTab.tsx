
import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';

interface CandidateJourneyTabProps {
  roleData: any;
}

const CandidateJourneyTab: React.FC<CandidateJourneyTabProps> = ({ roleData }) => {
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
        Candidate Journey for {roleData?.name}
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
            Candidate Journey tracking will be implemented here.
            This will show the complete candidate experience flow
            and touchpoints throughout the hiring process.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CandidateJourneyTab;
