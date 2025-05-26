
import React from 'react';
import { Box, TextField, Typography, Select, MenuItem, FormControl, InputLabel, FormControlLabel, Checkbox } from '@mui/material';
import { ClientInterviewConfig } from '../../types/StageConfigTypes';

interface ClientInterviewFormProps {
  config: ClientInterviewConfig;
  onChange: (config: ClientInterviewConfig) => void;
}

const ClientInterviewForm: React.FC<ClientInterviewFormProps> = ({ config, onChange }) => {
  const updateField = (field: keyof ClientInterviewConfig, value: any) => {
    onChange({ ...config, [field]: value });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Typography variant="h6" sx={{ fontFamily: 'Rubik, sans-serif', mb: 2 }}>
        Client Interview Configuration
      </Typography>

      <TextField
        label="Client Name"
        value={config.clientName || ''}
        onChange={(e) => updateField('clientName', e.target.value)}
        fullWidth
        variant="outlined"
        helperText="Auto-filled from Role ID"
      />

      <TextField
        label="Interviewer Name"
        value={config.interviewerName || ''}
        onChange={(e) => updateField('interviewerName', e.target.value)}
        fullWidth
        variant="outlined"
      />

      <TextField
        label="Interviewer Contact"
        value={config.interviewerContact || ''}
        onChange={(e) => updateField('interviewerContact', e.target.value)}
        fullWidth
        variant="outlined"
      />

      <TextField
        label="Round Type"
        value={config.roundType || ''}
        onChange={(e) => updateField('roundType', e.target.value)}
        fullWidth
        variant="outlined"
      />

      <TextField
        label="TA Coordinator"
        value={config.taCoordinator || ''}
        onChange={(e) => updateField('taCoordinator', e.target.value)}
        fullWidth
        variant="outlined"
      />

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

      <FormControlLabel
        control={
          <Checkbox
            checked={config.ndaSigned}
            onChange={(e) => updateField('ndaSigned', e.target.checked)}
          />
        }
        label="NDA Signed"
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

export default ClientInterviewForm;
