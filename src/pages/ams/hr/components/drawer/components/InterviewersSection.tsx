
import React from 'react';
import {
  FormControl,
  FormLabel,
  Autocomplete,
  TextField,
  Chip,
} from '@mui/material';

interface Interviewer {
  id: string;
  name: string;
  email: string;
}

interface InterviewersSectionProps {
  interviewers: Interviewer[];
  availableInterviewers: Interviewer[];
  onChange: (interviewers: Interviewer[]) => void;
}

const InterviewersSection: React.FC<InterviewersSectionProps> = ({
  interviewers,
  availableInterviewers,
  onChange,
}) => {
  return (
    <FormControl>
      <FormLabel 
        sx={{ 
          fontFamily: 'Rubik, sans-serif',
          fontSize: '14px', 
          fontWeight: 500,
          color: '#262626',
          mb: 1,
        }}
      >
        Interviewers
      </FormLabel>
      <Autocomplete
        multiple
        options={availableInterviewers}
        getOptionLabel={(option) => `${option.name} (${option.email})`}
        value={interviewers}
        onChange={(event, newValue) => onChange(newValue)}
        renderTags={(tagValue, getTagProps) =>
          tagValue.map((option, index) => (
            <Chip
              label={option.name}
              {...getTagProps({ index })}
              key={option.id}
              size="small"
              sx={{ fontFamily: 'Rubik, sans-serif', fontSize: '12px' }}
            />
          ))
        }
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Select interviewers"
            size="small"
            sx={{
              '& .MuiInputBase-input': {
                fontFamily: 'Rubik, sans-serif',
                fontSize: '13px',
              },
            }}
          />
        )}
      />
    </FormControl>
  );
};

export default InterviewersSection;
