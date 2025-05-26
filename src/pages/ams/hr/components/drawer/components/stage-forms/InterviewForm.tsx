
import React from 'react';
import { Box, TextField, Typography, Select, MenuItem, FormControl, InputLabel, Chip } from '@mui/material';
import { InterviewConfig } from '../../types/StageConfigTypes';

interface InterviewFormProps {
  config: InterviewConfig;
  onChange: (config: InterviewConfig) => void;
}

const InterviewForm: React.FC<InterviewFormProps> = ({ config, onChange }) => {
  const updateField = (field: keyof InterviewConfig, value: any) => {
    onChange({ ...config, [field]: value });
  };

  const addInterviewer = () => {
    const interviewers = config.interviewers || [];
    updateField('interviewers', [...interviewers, '']);
  };

  const updateInterviewer = (index: number, value: string) => {
    const interviewers = [...(config.interviewers || [])];
    interviewers[index] = value;
    updateField('interviewers', interviewers);
  };

  const removeInterviewer = (index: number) => {
    const interviewers = config.interviewers?.filter((_, i) => i !== index) || [];
    updateField('interviewers', interviewers);
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
        Interview Configuration
      </Typography>

      <FormControl fullWidth>
        <InputLabel>Interview Type</InputLabel>
        <Select
          value={config.interviewType}
          onChange={(e) => updateField('interviewType', e.target.value)}
          label="Interview Type"
        >
          <MenuItem value="one-on-one">One-on-One</MenuItem>
          <MenuItem value="panel">Panel</MenuItem>
          <MenuItem value="group">Group</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>Mode</InputLabel>
        <Select
          value={config.mode}
          onChange={(e) => updateField('mode', e.target.value)}
          label="Mode"
        >
          <MenuItem value="in-person">In-Person</MenuItem>
          <MenuItem value="virtual">Virtual</MenuItem>
        </Select>
      </FormControl>

      <Box>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>Interviewers</Typography>
        {config.interviewers?.map((interviewer, index) => (
          <Box key={index} sx={{ display: 'flex', gap: 1, mb: 1 }}>
            <TextField
              value={interviewer}
              onChange={(e) => updateInterviewer(index, e.target.value)}
              placeholder={`Interviewer ${index + 1}`}
              fullWidth
              size="small"
            />
            <Chip
              label="Remove"
              onClick={() => removeInterviewer(index)}
              variant="outlined"
              size="small"
            />
          </Box>
        ))}
        <Chip
          label="Add Interviewer"
          onClick={addInterviewer}
          variant="outlined"
          color="primary"
        />
      </Box>

      <TextField
        label="Date & Time"
        type="datetime-local"
        value={config.dateTime || ''}
        onChange={(e) => updateField('dateTime', e.target.value)}
        fullWidth
        variant="outlined"
        InputLabelProps={{ shrink: true }}
      />

      <TextField
        label="Meeting Link"
        value={config.meetingLink || ''}
        onChange={(e) => updateField('meetingLink', e.target.value)}
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

      <TextField
        label="Feedback Template"
        value={config.feedbackTemplate || ''}
        onChange={(e) => updateField('feedbackTemplate', e.target.value)}
        fullWidth
        variant="outlined"
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

export default InterviewForm;
