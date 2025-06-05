
import React from 'react';
import { Box, Card, CardContent, Typography, Chip } from '@mui/material';
import { Users, Clock } from 'lucide-react';
import { Interview } from '../../../MyInterviewsPage';

interface ClientScreeningStageProps {
  interview: Interview;
}

export const ClientScreeningStage: React.FC<ClientScreeningStageProps> = ({
  interview
}) => {
  return (
    <Box sx={{ p: 3, fontFamily: 'Rubik, sans-serif' }}>
      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
            <Users className="h-6 w-6 text-orange-600" />
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              Client Screening
            </Typography>
            <Chip 
              label="Pending" 
              color="warning" 
              size="small"
              icon={<Clock className="h-4 w-4" />}
            />
          </Box>
          
          <Typography variant="body1" color="text.secondary">
            Client screening will be scheduled after successful completion of the technical screening.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};
