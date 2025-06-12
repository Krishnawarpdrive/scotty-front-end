
import React from 'react';
import { Box, Card, CardContent, Typography, Chip } from '@mui/material';
import { Phone, CheckCircle } from 'lucide-react';
import { Interview } from '../../../MyInterviewsPage';

interface PhoneScreeningStageProps {
  interview: Interview;
}

export const PhoneScreeningStage: React.FC<PhoneScreeningStageProps> = ({
  interview
}) => {
  return (
    <Box sx={{ p: 3, fontFamily: 'Rubik, sans-serif' }}>
      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
            <Phone className="h-6 w-6 text-green-600" />
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              Phone Screening
            </Typography>
            <Chip 
              label="Completed" 
              color="success" 
              size="small"
              icon={<CheckCircle className="h-4 w-4" />}
            />
          </Box>
          
          <Typography variant="body1" color="text.secondary">
            Phone screening has been completed successfully. The candidate has passed the initial assessment.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};
