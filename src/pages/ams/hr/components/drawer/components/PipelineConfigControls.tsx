
import React from 'react';
import { Box, Button, FormControlLabel, Switch, Typography } from '@mui/material';

interface PipelineConfigControlsProps {
  saveAsTemplate: boolean;
  setSaveAsTemplate: (value: boolean) => void;
  applyToAll: boolean;
  setApplyToAll: (value: boolean) => void;
  onSave: () => void;
  onCancel: () => void;
}

const PipelineConfigControls: React.FC<PipelineConfigControlsProps> = ({
  saveAsTemplate,
  setSaveAsTemplate,
  applyToAll,
  setApplyToAll,
  onSave,
  onCancel,
}) => {
  return (
    <Box
      sx={{
        borderTop: '1px solid #e5e7eb',
        pt: 3,
        mt: 'auto',
      }}
    >
      {/* Toggle Options */}
      <Box sx={{ mb: 3 }}>
        <FormControlLabel
          control={
            <Switch
              checked={saveAsTemplate}
              onChange={(e) => setSaveAsTemplate(e.target.checked)}
              size="small"
              sx={{
                '& .MuiSwitch-switchBase.Mui-checked': {
                  color: '#009933',
                },
                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                  backgroundColor: '#009933',
                },
              }}
            />
          }
          label={
            <Typography
              sx={{
                fontFamily: 'Rubik, sans-serif',
                fontSize: '13px',
                color: '#262626',
              }}
            >
              Save as Template
            </Typography>
          }
        />
      </Box>

      <Box sx={{ mb: 3 }}>
        <FormControlLabel
          control={
            <Switch
              checked={applyToAll}
              onChange={(e) => setApplyToAll(e.target.checked)}
              size="small"
              sx={{
                '& .MuiSwitch-switchBase.Mui-checked': {
                  color: '#009933',
                },
                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                  backgroundColor: '#009933',
                },
              }}
            />
          }
          label={
            <Typography
              sx={{
                fontFamily: 'Rubik, sans-serif',
                fontSize: '13px',
                color: '#262626',
              }}
            >
              Apply this pipeline to all requirements under the same role
            </Typography>
          }
        />
      </Box>

      {/* Action Buttons */}
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
        <Button
          variant="outlined"
          onClick={onCancel}
          sx={{
            fontFamily: 'Rubik, sans-serif',
            fontSize: '13px',
            textTransform: 'none',
            borderColor: '#e5e7eb',
            color: '#666',
            '&:hover': {
              borderColor: '#d1d5db',
              backgroundColor: '#f9fafb',
            },
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={onSave}
          sx={{
            fontFamily: 'Rubik, sans-serif',
            fontSize: '13px',
            textTransform: 'none',
            backgroundColor: '#009933',
            '&:hover': {
              backgroundColor: '#007a2b',
            },
          }}
        >
          Save Pipeline
        </Button>
      </Box>
    </Box>
  );
};

export default PipelineConfigControls;
