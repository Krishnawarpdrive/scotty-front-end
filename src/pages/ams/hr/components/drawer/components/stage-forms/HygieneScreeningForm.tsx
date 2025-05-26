
import React from 'react';
import { Box, TextField, Typography, FormControlLabel, Checkbox, Chip } from '@mui/material';
import { HygieneScreeningConfig } from '../../types/StageConfigTypes';

interface HygieneScreeningFormProps {
  config: HygieneScreeningConfig;
  onChange: (config: HygieneScreeningConfig) => void;
}

const HygieneScreeningForm: React.FC<HygieneScreeningFormProps> = ({ config, onChange }) => {
  const updateField = (field: keyof HygieneScreeningConfig, value: any) => {
    onChange({ ...config, [field]: value });
  };

  const updateChecklistItem = (item: keyof typeof config.eligibilityChecklist, checked: boolean) => {
    updateField('eligibilityChecklist', {
      ...config.eligibilityChecklist,
      [item]: checked,
    });
  };

  const addCustomField = () => {
    const fields = config.customFields || [];
    updateField('customFields', [...fields, { label: '', value: '' }]);
  };

  const updateCustomField = (index: number, field: 'label' | 'value', value: string) => {
    const fields = [...(config.customFields || [])];
    fields[index] = { ...fields[index], [field]: value };
    updateField('customFields', fields);
  };

  const removeCustomField = (index: number) => {
    const fields = config.customFields?.filter((_, i) => i !== index) || [];
    updateField('customFields', fields);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Typography variant="h6" sx={{ fontFamily: 'Rubik, sans-serif', mb: 2 }}>
        Hygiene Screening Configuration
      </Typography>

      <Box>
        <Typography variant="subtitle2" sx={{ mb: 2 }}>Eligibility Checklist</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={config.eligibilityChecklist.idVerified}
                onChange={(e) => updateChecklistItem('idVerified', e.target.checked)}
              />
            }
            label="ID Verified"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={config.eligibilityChecklist.resumeReceived}
                onChange={(e) => updateChecklistItem('resumeReceived', e.target.checked)}
              />
            }
            label="Resume Received"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={config.eligibilityChecklist.contactConfirmed}
                onChange={(e) => updateChecklistItem('contactConfirmed', e.target.checked)}
              />
            }
            label="Contact Confirmed"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={config.eligibilityChecklist.availabilityChecked}
                onChange={(e) => updateChecklistItem('availabilityChecked', e.target.checked)}
              />
            }
            label="Availability Checked"
          />
        </Box>
      </Box>

      <TextField
        label="Checklist Upload URL"
        value={config.checklistUploadUrl || ''}
        onChange={(e) => updateField('checklistUploadUrl', e.target.value)}
        fullWidth
        variant="outlined"
      />

      <Box>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>Custom Fields</Typography>
        {config.customFields?.map((field, index) => (
          <Box key={index} sx={{ display: 'flex', gap: 1, mb: 1 }}>
            <TextField
              value={field.label}
              onChange={(e) => updateCustomField(index, 'label', e.target.value)}
              placeholder="Field Label"
              size="small"
              sx={{ flex: 1 }}
            />
            <TextField
              value={field.value}
              onChange={(e) => updateCustomField(index, 'value', e.target.value)}
              placeholder="Field Value"
              size="small"
              sx={{ flex: 2 }}
            />
            <Chip
              label="Remove"
              onClick={() => removeCustomField(index)}
              variant="outlined"
              size="small"
            />
          </Box>
        ))}
        <Chip
          label="Add Custom Field"
          onClick={addCustomField}
          variant="outlined"
          color="primary"
        />
      </Box>

      <TextField
        label="Remarks"
        value={config.remarks || ''}
        onChange={(e) => updateField('remarks', e.target.value)}
        fullWidth
        multiline
        rows={2}
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

export default HygieneScreeningForm;
