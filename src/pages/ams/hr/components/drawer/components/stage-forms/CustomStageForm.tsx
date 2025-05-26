
import React from 'react';
import { Box, TextField, Typography, Select, MenuItem, FormControl, InputLabel, Chip } from '@mui/material';
import { CustomStageConfig } from '../../types/StageConfigTypes';

interface CustomStageFormProps {
  config: CustomStageConfig;
  onChange: (config: CustomStageConfig) => void;
}

const CustomStageForm: React.FC<CustomStageFormProps> = ({ config, onChange }) => {
  const updateField = (field: keyof CustomStageConfig, value: any) => {
    onChange({ ...config, [field]: value });
  };

  const addDynamicField = () => {
    const fields = config.dynamicFields || [];
    updateField('dynamicFields', [...fields, { label: '', value: '', type: 'text' }]);
  };

  const updateDynamicField = (index: number, field: 'label' | 'value' | 'type', value: string) => {
    const fields = [...(config.dynamicFields || [])];
    fields[index] = { ...fields[index], [field]: value };
    updateField('dynamicFields', fields);
  };

  const removeDynamicField = (index: number) => {
    const fields = config.dynamicFields?.filter((_, i) => i !== index) || [];
    updateField('dynamicFields', fields);
  };

  const addFileUpload = () => {
    const uploads = config.fileUploads || [];
    updateField('fileUploads', [...uploads, '']);
  };

  const updateFileUpload = (index: number, value: string) => {
    const uploads = [...(config.fileUploads || [])];
    uploads[index] = value;
    updateField('fileUploads', uploads);
  };

  const removeFileUpload = (index: number) => {
    const uploads = config.fileUploads?.filter((_, i) => i !== index) || [];
    updateField('fileUploads', uploads);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Typography variant="h6" sx={{ fontFamily: 'Rubik, sans-serif', mb: 2 }}>
        Custom Stage Configuration
      </Typography>

      <TextField
        label="Stage Name"
        value={config.stageName || ''}
        onChange={(e) => updateField('stageName', e.target.value)}
        fullWidth
        variant="outlined"
      />

      <TextField
        label="Type"
        value={config.type || ''}
        onChange={(e) => updateField('type', e.target.value)}
        fullWidth
        variant="outlined"
        placeholder="e.g., Salary Discussion"
      />

      <TextField
        label="Description"
        value={config.description || ''}
        onChange={(e) => updateField('description', e.target.value)}
        fullWidth
        multiline
        rows={2}
        variant="outlined"
      />

      <Box>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>Dynamic Fields</Typography>
        {config.dynamicFields?.map((field, index) => (
          <Box key={index} sx={{ display: 'flex', gap: 1, mb: 1, alignItems: 'center' }}>
            <TextField
              value={field.label}
              onChange={(e) => updateDynamicField(index, 'label', e.target.value)}
              placeholder="Field Label"
              size="small"
              sx={{ flex: 2 }}
            />
            <FormControl size="small" sx={{ flex: 1 }}>
              <Select
                value={field.type}
                onChange={(e) => updateDynamicField(index, 'type', e.target.value)}
              >
                <MenuItem value="text">Text</MenuItem>
                <MenuItem value="number">Number</MenuItem>
                <MenuItem value="date">Date</MenuItem>
                <MenuItem value="file">File</MenuItem>
              </Select>
            </FormControl>
            <TextField
              value={field.value}
              onChange={(e) => updateDynamicField(index, 'value', e.target.value)}
              placeholder="Field Value"
              size="small"
              sx={{ flex: 2 }}
            />
            <Chip
              label="Remove"
              onClick={() => removeDynamicField(index)}
              variant="outlined"
              size="small"
            />
          </Box>
        ))}
        <Chip
          label="Add Field"
          onClick={addDynamicField}
          variant="outlined"
          color="primary"
        />
      </Box>

      <Box>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>File Uploads</Typography>
        {config.fileUploads?.map((upload, index) => (
          <Box key={index} sx={{ display: 'flex', gap: 1, mb: 1 }}>
            <TextField
              value={upload}
              onChange={(e) => updateFileUpload(index, e.target.value)}
              placeholder="File URL or description"
              fullWidth
              size="small"
            />
            <Chip
              label="Remove"
              onClick={() => removeFileUpload(index)}
              variant="outlined"
              size="small"
            />
          </Box>
        ))}
        <Chip
          label="Add File Upload"
          onClick={addFileUpload}
          variant="outlined"
          color="primary"
        />
      </Box>

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

export default CustomStageForm;
