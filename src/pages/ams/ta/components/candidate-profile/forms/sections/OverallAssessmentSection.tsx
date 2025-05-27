
import React from 'react';
import { 
  Box, 
  Typography,
  Rating
} from '@mui/material';
import { DesignSystemSelect } from '@/components/ui-mui/DesignSystemSelect';

interface OverallAssessmentData {
  overallRating: number;
  finalDecision: string;
}

interface OverallAssessmentSectionProps {
  formData: OverallAssessmentData;
  onFieldChange: (field: string, value: any) => void;
}

const decisionOptions = [
  { value: 'pending', label: 'Pending' },
  { value: 'selected', label: 'Selected' },
  { value: 'rejected', label: 'Rejected' },
  { value: 'hold', label: 'On Hold' },
  { value: 'waitlist', label: 'Waitlist' }
];

export const OverallAssessmentSection: React.FC<OverallAssessmentSectionProps> = ({
  formData,
  onFieldChange
}) => {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6" sx={{ 
        mb: 2, 
        fontFamily: 'Rubik, sans-serif', 
        fontWeight: 600,
        fontSize: '14px',
        color: '#374151'
      }}>
        Overall Assessment
      </Typography>
      
      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" sx={{ 
          mb: 1, 
          display: 'block', 
          fontFamily: 'Rubik, sans-serif',
          fontSize: '13px',
          color: '#6b7280'
        }}>
          Overall Rating
        </Typography>
        <Rating
          value={formData.overallRating}
          onChange={(event, newValue) => onFieldChange('overallRating', newValue)}
          size="medium"
          sx={{
            '& .MuiRating-iconFilled': {
              color: '#009933',
            },
          }}
        />
      </Box>

      <DesignSystemSelect
        label="Final Decision"
        value={formData.finalDecision}
        onChange={(value) => onFieldChange('finalDecision', value)}
        options={decisionOptions}
        fullWidth
      />
    </Box>
  );
};
