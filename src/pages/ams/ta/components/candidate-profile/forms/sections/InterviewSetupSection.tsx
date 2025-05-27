
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

interface InterviewSetupData {
  interviewScheduled: boolean;
  interviewType: string;
  duration: string;
  clientInterviewerName: string;
}

interface InterviewSetupSectionProps {
  formData: InterviewSetupData;
  onFieldChange: (field: string, value: any) => void;
}

export const InterviewSetupSection: React.FC<InterviewSetupSectionProps> = ({
  formData,
  onFieldChange
}) => {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="subtitle2" sx={{ mb: 2, fontFamily: 'Rubik, sans-serif', fontWeight: 600 }}>
        Interview Setup
      </Typography>
      
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 2 }}>
        <FormControl fullWidth>
          <InputLabel>Interview Type</InputLabel>
          <Select
            value={formData.interviewType}
            onChange={(e) => onFieldChange('interviewType', e.target.value)}
            label="Interview Type"
          >
            <MenuItem value="video">Video Call</MenuItem>
            <MenuItem value="in-person">In Person</MenuItem>
            <MenuItem value="phone">Phone</MenuItem>
          </Select>
        </FormControl>
        
        <TextField
          label="Duration (minutes)"
          value={formData.duration}
          onChange={(e) => onFieldChange('duration', e.target.value)}
          type="number"
        />
      </Box>

      <TextField
        label="Client Interviewer Name"
        value={formData.clientInterviewerName}
        onChange={(e) => onFieldChange('clientInterviewerName', e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
      />

      <FormControlLabel
        control={
          <Switch
            checked={formData.interviewScheduled}
            onChange={(e) => onFieldChange('interviewScheduled', e.target.checked)}
          />
        }
        label="Interview Scheduled"
        sx={{ fontFamily: 'Rubik, sans-serif' }}
      />
    </Box>
  );
};
