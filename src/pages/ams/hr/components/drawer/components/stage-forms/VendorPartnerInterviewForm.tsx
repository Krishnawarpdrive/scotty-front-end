
import React from 'react';
import { Box, TextField, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { VendorPartnerInterviewConfig } from '../../types/StageConfigTypes';

interface VendorPartnerInterviewFormProps {
  config: VendorPartnerInterviewConfig;
  onChange: (config: VendorPartnerInterviewConfig) => void;
}

const VendorPartnerInterviewForm: React.FC<VendorPartnerInterviewFormProps> = ({ config, onChange }) => {
  const updateField = (field: keyof VendorPartnerInterviewConfig, value: any) => {
    onChange({ ...config, [field]: value });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Typography variant="h6" sx={{ fontFamily: 'Rubik, sans-serif', mb: 2 }}>
        Vendor / Partner Interview Configuration
      </Typography>

      <FormControl fullWidth>
        <InputLabel>Type</InputLabel>
        <Select
          value={config.type}
          onChange={(e) => updateField('type', e.target.value)}
          label="Type"
        >
          <MenuItem value="vendor">Vendor</MenuItem>
          <MenuItem value="partner">Partner</MenuItem>
        </Select>
      </FormControl>

      <TextField
        label="Entity Name"
        value={config.entityName || ''}
        onChange={(e) => updateField('entityName', e.target.value)}
        fullWidth
        variant="outlined"
      />

      <TextField
        label="Feedback Form URL"
        value={config.feedbackFormUrl || ''}
        onChange={(e) => updateField('feedbackFormUrl', e.target.value)}
        fullWidth
        variant="outlined"
      />

      <TextField
        label="Role ID"
        value={config.roleId || ''}
        onChange={(e) => updateField('roleId', e.target.value)}
        fullWidth
        variant="outlined"
        helperText="Auto-filled from assigned requirement"
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

export default VendorPartnerInterviewForm;
