
import React from 'react';
import { Box, TextField, Typography, FormControlLabel, Checkbox, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { BackgroundVerificationConfig } from '../../types/StageConfigTypes';

interface BackgroundVerificationFormProps {
  config: BackgroundVerificationConfig;
  onChange: (config: BackgroundVerificationConfig) => void;
}

const BackgroundVerificationForm: React.FC<BackgroundVerificationFormProps> = ({ config, onChange }) => {
  const updateField = (field: keyof BackgroundVerificationConfig, value: any) => {
    onChange({ ...config, [field]: value });
  };

  const updateDocumentStatus = (document: keyof typeof config.documentsUploaded, uploaded: boolean) => {
    updateField('documentsUploaded', {
      ...config.documentsUploaded,
      [document]: uploaded,
    });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Typography variant="h6" sx={{ fontFamily: 'Rubik, sans-serif', mb: 2 }}>
        Background Verification Configuration
      </Typography>

      <TextField
        label="PAN ID"
        value={config.panId || ''}
        onChange={(e) => updateField('panId', e.target.value)}
        fullWidth
        variant="outlined"
      />

      <TextField
        label="ID Number"
        value={config.idNumber || ''}
        onChange={(e) => updateField('idNumber', e.target.value)}
        fullWidth
        variant="outlined"
      />

      <Box>
        <Typography variant="subtitle2" sx={{ mb: 2 }}>Documents Upload Status</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={config.documentsUploaded.resume}
                onChange={(e) => updateDocumentStatus('resume', e.target.checked)}
              />
            }
            label="Resume Uploaded"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={config.documentsUploaded.id}
                onChange={(e) => updateDocumentStatus('id', e.target.checked)}
              />
            }
            label="ID Document Uploaded"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={config.documentsUploaded.offerLetter}
                onChange={(e) => updateDocumentStatus('offerLetter', e.target.checked)}
              />
            }
            label="Offer Letter Uploaded"
          />
        </Box>
      </Box>

      <TextField
        label="Verification Partner"
        value={config.verificationPartner || ''}
        onChange={(e) => updateField('verificationPartner', e.target.value)}
        fullWidth
        variant="outlined"
      />

      <FormControl fullWidth>
        <InputLabel>Verification Status</InputLabel>
        <Select
          value={config.verificationStatus}
          onChange={(e) => updateField('verificationStatus', e.target.value)}
          label="Verification Status"
        >
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="in-progress">In Progress</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
          <MenuItem value="failed">Failed</MenuItem>
        </Select>
      </FormControl>

      <TextField
        label="SLA Date"
        type="date"
        value={config.slaDate || ''}
        onChange={(e) => updateField('slaDate', e.target.value)}
        fullWidth
        variant="outlined"
        InputLabelProps={{ shrink: true }}
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

export default BackgroundVerificationForm;
