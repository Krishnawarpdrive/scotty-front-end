
import React from 'react';
import { 
  Box, 
  TextField, 
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';

interface InterviewOutcomeData {
  outcome: string;
  interviewNotes: string;
}

interface InterviewOutcomeSectionProps {
  formData: InterviewOutcomeData;
  onFieldChange: (field: string, value: any) => void;
}

export const InterviewOutcomeSection: React.FC<InterviewOutcomeSectionProps> = ({
  formData,
  onFieldChange
}) => {
  return (
    <Box sx={{ mb: 3 }}>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Interview Outcome</InputLabel>
        <Select
          value={formData.outcome}
          onChange={(e) => onFieldChange('outcome', e.target.value)}
          label="Interview Outcome"
        >
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="pass">Pass</MenuItem>
          <MenuItem value="fail">Fail</MenuItem>
          <MenuItem value="strong-pass">Strong Pass</MenuItem>
        </Select>
      </FormControl>

      <TextField
        label="Interview Notes"
        value={formData.interviewNotes}
        onChange={(e) => onFieldChange('interviewNotes', e.target.value)}
        fullWidth
        multiline
        rows={4}
        placeholder="Client feedback, cultural fit assessment, next steps..."
      />
    </Box>
  );
};
