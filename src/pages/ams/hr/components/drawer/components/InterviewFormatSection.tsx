
import React from 'react';
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
} from '@mui/material';

interface InterviewFormatSectionProps {
  interviewFormat: string;
  isGroupDiscussion: boolean;
  onChange: (format: string) => void;
}

const InterviewFormatSection: React.FC<InterviewFormatSectionProps> = ({
  interviewFormat,
  isGroupDiscussion,
  onChange,
}) => {
  return (
    <FormControl component="fieldset">
      <FormLabel 
        component="legend" 
        sx={{ 
          fontFamily: 'Rubik, sans-serif',
          fontSize: '14px', 
          fontWeight: 500,
          color: '#262626',
          mb: 1,
        }}
      >
        Interview Format
      </FormLabel>
      <RadioGroup
        value={interviewFormat}
        onChange={(e) => onChange(e.target.value)}
      >
        <FormControlLabel
          value="one-to-one"
          control={<Radio size="small" />}
          label="One-to-One"
          disabled={isGroupDiscussion}
          sx={{ '& .MuiFormControlLabel-label': { fontFamily: 'Rubik, sans-serif', fontSize: '13px' } }}
        />
        <FormControlLabel
          value="panel"
          control={<Radio size="small" />}
          label="Panel"
          disabled={isGroupDiscussion}
          sx={{ '& .MuiFormControlLabel-label': { fontFamily: 'Rubik, sans-serif', fontSize: '13px' } }}
        />
        <FormControlLabel
          value="group"
          control={<Radio size="small" />}
          label="Group"
          disabled={!isGroupDiscussion}
          sx={{ '& .MuiFormControlLabel-label': { fontFamily: 'Rubik, sans-serif', fontSize: '13px' } }}
        />
      </RadioGroup>
      {isGroupDiscussion && (
        <Typography
          sx={{
            fontFamily: 'Rubik, sans-serif',
            fontSize: '12px',
            color: '#6b7280',
            mt: 1,
            fontStyle: 'italic',
          }}
        >
          Group format is automatically selected for Group Discussion stages
        </Typography>
      )}
    </FormControl>
  );
};

export default InterviewFormatSection;
