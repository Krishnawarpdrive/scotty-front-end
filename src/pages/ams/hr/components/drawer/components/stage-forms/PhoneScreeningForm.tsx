
import React from 'react';
import { Box, TextField, Typography, FormControlLabel, Switch, Select, MenuItem, FormControl, InputLabel, Chip } from '@mui/material';
import { PhoneScreeningConfig } from '../../types/StageConfigTypes';

interface PhoneScreeningFormProps {
  config: PhoneScreeningConfig;
  onChange: (config: PhoneScreeningConfig) => void;
}

const PhoneScreeningForm: React.FC<PhoneScreeningFormProps> = ({ config, onChange }) => {
  const updateField = (field: keyof PhoneScreeningConfig, value: any) => {
    onChange({ ...config, [field]: value });
  };

  const addQuestion = () => {
    const questions = config.questionsToAsk || [];
    updateField('questionsToAsk', [...questions, '']);
  };

  const updateQuestion = (index: number, value: string) => {
    const questions = [...(config.questionsToAsk || [])];
    questions[index] = value;
    updateField('questionsToAsk', questions);
  };

  const removeQuestion = (index: number) => {
    const questions = config.questionsToAsk?.filter((_, i) => i !== index) || [];
    updateField('questionsToAsk', questions);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Typography variant="h6" sx={{ fontFamily: 'Rubik, sans-serif', mb: 2 }}>
        Phone Screening Configuration
      </Typography>

      <TextField
        label="Candidate Name"
        value={config.candidateName || ''}
        onChange={(e) => updateField('candidateName', e.target.value)}
        fullWidth
        variant="outlined"
      />

      <TextField
        label="Phone Number"
        value={config.phoneNumber || ''}
        onChange={(e) => updateField('phoneNumber', e.target.value)}
        fullWidth
        variant="outlined"
      />

      <Box>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>Questions to Ask</Typography>
        {config.questionsToAsk?.map((question, index) => (
          <Box key={index} sx={{ display: 'flex', gap: 1, mb: 1 }}>
            <TextField
              value={question}
              onChange={(e) => updateQuestion(index, e.target.value)}
              placeholder={`Question ${index + 1}`}
              fullWidth
              size="small"
            />
            <Chip
              label="Remove"
              onClick={() => removeQuestion(index)}
              variant="outlined"
              size="small"
            />
          </Box>
        ))}
        <Chip
          label="Add Question"
          onClick={addQuestion}
          variant="outlined"
          color="primary"
        />
      </Box>

      <FormControlLabel
        control={
          <Switch
            checked={config.callScheduled}
            onChange={(e) => updateField('callScheduled', e.target.checked)}
          />
        }
        label="Call Scheduled"
      />

      <FormControl fullWidth>
        <InputLabel>Outcome</InputLabel>
        <Select
          value={config.outcome || 'pending'}
          onChange={(e) => updateField('outcome', e.target.value)}
          label="Outcome"
        >
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="pass">Pass</MenuItem>
          <MenuItem value="fail">Fail</MenuItem>
        </Select>
      </FormControl>

      <TextField
        label="Recording URL (Optional)"
        value={config.recordingUrl || ''}
        onChange={(e) => updateField('recordingUrl', e.target.value)}
        fullWidth
        variant="outlined"
      />

      <TextField
        label="Notes"
        value={config.notes || ''}
        onChange={(e) => updateField('notes', e.target.value)}
        fullWidth
        multiline
        rows={3}
        variant="outlined"
      />
    </Box>
  );
};

export default PhoneScreeningForm;
