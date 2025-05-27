
import React from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  FormControlLabel, 
  Switch,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';

interface ClientAssessmentData {
  culturalFit: string;
  technicalFit: string;
  clientFeedback: string;
  followUpRequired: boolean;
}

interface ClientAssessmentSectionProps {
  formData: ClientAssessmentData;
  onFieldChange: (field: string, value: any) => void;
}

export const ClientAssessmentSection: React.FC<ClientAssessmentSectionProps> = ({
  formData,
  onFieldChange
}) => {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="subtitle2" sx={{ mb: 2, fontFamily: 'Rubik, sans-serif', fontWeight: 600 }}>
        Client Assessment
      </Typography>
      
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 2 }}>
        <FormControl fullWidth>
          <InputLabel>Cultural Fit</InputLabel>
          <Select
            value={formData.culturalFit}
            onChange={(e) => onFieldChange('culturalFit', e.target.value)}
            label="Cultural Fit"
          >
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="excellent">Excellent</MenuItem>
            <MenuItem value="good">Good</MenuItem>
            <MenuItem value="average">Average</MenuItem>
            <MenuItem value="poor">Poor</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Technical Fit</InputLabel>
          <Select
            value={formData.technicalFit}
            onChange={(e) => onFieldChange('technicalFit', e.target.value)}
            label="Technical Fit"
          >
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="excellent">Excellent</MenuItem>
            <MenuItem value="good">Good</MenuItem>
            <MenuItem value="average">Average</MenuItem>
            <MenuItem value="poor">Poor</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <TextField
        label="Client Feedback"
        value={formData.clientFeedback}
        onChange={(e) => onFieldChange('clientFeedback', e.target.value)}
        fullWidth
        multiline
        rows={3}
        sx={{ mb: 2 }}
      />

      <FormControlLabel
        control={
          <Switch
            checked={formData.followUpRequired}
            onChange={(e) => onFieldChange('followUpRequired', e.target.checked)}
          />
        }
        label="Follow-up Required"
        sx={{ fontFamily: 'Rubik, sans-serif' }}
      />
    </Box>
  );
};
