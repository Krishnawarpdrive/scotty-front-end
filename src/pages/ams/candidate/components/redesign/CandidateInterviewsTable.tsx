
import React from 'react';
import { Card, CardContent, Typography, Box, Button } from '@mui/material';
import { Schedule, VideoCall } from '@mui/icons-material';

interface CandidateInterviewsTableProps {
  candidateId: string;
}

export const CandidateInterviewsTable: React.FC<CandidateInterviewsTableProps> = ({ candidateId }) => {
  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Upcoming Interviews
          </Typography>
          <Button size="small" variant="outlined" startIcon={<Schedule />}>
            Schedule Interview
          </Button>
        </Box>
        
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography color="text.secondary">
            No upcoming interviews scheduled
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
