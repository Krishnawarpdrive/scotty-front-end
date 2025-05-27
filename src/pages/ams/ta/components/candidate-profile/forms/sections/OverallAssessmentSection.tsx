
import React from 'react';
import { 
  Box, 
  Typography, 
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Rating
} from '@mui/material';

interface OverallAssessmentData {
  overallRating: number;
  finalDecision: string;
}

interface OverallAssessmentSectionProps {
  formData: OverallAssessmentData;
  onFieldChange: (field: string, value: any) => void;
}

export const OverallAssessmentSection: React.FC<OverallAssessmentSectionProps> = ({
  formData,
  onFieldChange
}) => {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="subtitle2" sx={{ mb: 2, fontFamily: 'Rubik, sans-serif', fontWeight: 600 }}>
        Overall Assessment
      </Typography>
      
      <Box sx={{ mb: 2 }}>
        <Typography variant="caption" sx={{ mb: 1, display: 'block', fontFamily: 'Rubik, sans-serif' }}>
          Overall Rating
        </Typography>
        <Rating
          value={formData.overallRating}
          onChange={(event, newValue) => onFieldChange('overallRating', newValue)}
          size="large"
        />
      </Box>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Final Decision</InputLabel>
        <Select
          value={formData.finalDecision}
          onChange={(e) => onFieldChange('finalDecision', e.target.value)}
          label="Final Decision"
        >
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="selected">Selected</MenuItem>
          <MenuItem value="rejected">Rejected</MenuItem>
          <MenuItem value="hold">On Hold</MenuItem>
          <MenuItem value="waitlist">Waitlist</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};
