
import React from 'react';
import { Box, TextField, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { AptitudeTestConfig } from '../../types/StageConfigTypes';

interface AptitudeTestFormProps {
  config: AptitudeTestConfig;
  onChange: (config: AptitudeTestConfig) => void;
}

const AptitudeTestForm: React.FC<AptitudeTestFormProps> = ({ config, onChange }) => {
  const updateField = (field: keyof AptitudeTestConfig, value: any) => {
    onChange({ ...config, [field]: value });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Typography variant="h6" sx={{ fontFamily: 'Rubik, sans-serif', mb: 2 }}>
        Aptitude Test Configuration
      </Typography>

      <TextField
        label="Test Link"
        value={config.testLink || ''}
        onChange={(e) => updateField('testLink', e.target.value)}
        fullWidth
        variant="outlined"
      />

      <TextField
        label="Password"
        value={config.password || ''}
        onChange={(e) => updateField('password', e.target.value)}
        fullWidth
        variant="outlined"
        type="password"
      />

      <TextField
        label="Duration (minutes)"
        type="number"
        value={config.duration || ''}
        onChange={(e) => updateField('duration', parseInt(e.target.value) || 0)}
        fullWidth
        variant="outlined"
      />

      <FormControl fullWidth>
        <InputLabel>Result Source</InputLabel>
        <Select
          value={config.resultSource}
          onChange={(e) => updateField('resultSource', e.target.value)}
          label="Result Source"
        >
          <MenuItem value="auto">Auto</MenuItem>
          <MenuItem value="manual">Manual</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>Status</InputLabel>
        <Select
          value={config.status}
          onChange={(e) => updateField('status', e.target.value)}
          label="Status"
        >
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="scheduled">Scheduled</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
          <MenuItem value="failed">Failed</MenuItem>
        </Select>
      </FormControl>

      <TextField
        label="Score"
        type="number"
        value={config.score || ''}
        onChange={(e) => updateField('score', parseInt(e.target.value) || 0)}
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

export default AptitudeTestForm;
