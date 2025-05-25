
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  Divider,
} from '@mui/material';

interface Stage {
  id: string;
  name: string;
  type: 'internal' | 'external';
  order: number;
  config?: any;
}

interface StageConfigModalProps {
  open: boolean;
  onClose: () => void;
  stage: Stage | null;
  onSave: (stageId: string, config: any) => void;
}

const getStageConfigFields = (stageName: string) => {
  const lowerName = stageName.toLowerCase();
  
  if (lowerName.includes('phone') || lowerName.includes('screening')) {
    return {
      duration: { label: 'Duration (minutes)', type: 'number', default: 30 },
      questions: { label: 'Key Questions', type: 'textarea', default: '' },
      criteria: { label: 'Evaluation Criteria', type: 'checkbox', options: [
        'Communication Skills',
        'Technical Knowledge',
        'Experience Relevance',
        'Cultural Fit'
      ]},
      passingScore: { label: 'Passing Score (%)', type: 'number', default: 70 }
    };
  }
  
  if (lowerName.includes('technical')) {
    return {
      duration: { label: 'Duration (minutes)', type: 'number', default: 60 },
      difficulty: { label: 'Difficulty Level', type: 'radio', options: ['Easy', 'Medium', 'Hard'] },
      topics: { label: 'Technical Topics', type: 'textarea', default: '' },
      codingRequired: { label: 'Coding Required', type: 'checkbox', options: ['Live Coding', 'Take Home Assignment'] }
    };
  }
  
  if (lowerName.includes('group')) {
    return {
      duration: { label: 'Duration (minutes)', type: 'number', default: 45 },
      maxParticipants: { label: 'Max Participants', type: 'number', default: 8 },
      scenario: { label: 'Discussion Scenario', type: 'textarea', default: '' },
      evaluation: { label: 'Evaluation Points', type: 'checkbox', options: [
        'Leadership',
        'Team Collaboration',
        'Problem Solving',
        'Communication'
      ]}
    };
  }
  
  // Default configuration for other stages
  return {
    duration: { label: 'Duration (minutes)', type: 'number', default: 30 },
    requirements: { label: 'Requirements', type: 'textarea', default: '' },
    criteria: { label: 'Evaluation Criteria', type: 'textarea', default: '' }
  };
};

const StageConfigModal: React.FC<StageConfigModalProps> = ({
  open,
  onClose,
  stage,
  onSave,
}) => {
  const [config, setConfig] = useState<any>({});

  useEffect(() => {
    if (stage) {
      setConfig(stage.config || {});
    }
  }, [stage]);

  if (!stage) return null;

  const configFields = getStageConfigFields(stage.name);

  const handleFieldChange = (fieldName: string, value: any) => {
    setConfig((prev: any) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const handleSave = () => {
    onSave(stage.id, config);
  };

  const renderField = (fieldName: string, field: any) => {
    switch (field.type) {
      case 'number':
        return (
          <TextField
            fullWidth
            type="number"
            label={field.label}
            value={config[fieldName] || field.default || ''}
            onChange={(e) => handleFieldChange(fieldName, parseInt(e.target.value) || 0)}
            size="small"
            sx={{ mb: 2 }}
          />
        );
      
      case 'textarea':
        return (
          <TextField
            fullWidth
            multiline
            rows={3}
            label={field.label}
            value={config[fieldName] || field.default || ''}
            onChange={(e) => handleFieldChange(fieldName, e.target.value)}
            size="small"
            sx={{ mb: 2 }}
          />
        );
      
      case 'radio':
        return (
          <FormControl component="fieldset" sx={{ mb: 2 }}>
            <FormLabel component="legend" sx={{ fontSize: '14px', mb: 1 }}>
              {field.label}
            </FormLabel>
            <RadioGroup
              value={config[fieldName] || ''}
              onChange={(e) => handleFieldChange(fieldName, e.target.value)}
            >
              {field.options.map((option: string) => (
                <FormControlLabel
                  key={option}
                  value={option}
                  control={<Radio size="small" />}
                  label={option}
                  sx={{ '& .MuiFormControlLabel-label': { fontSize: '13px' } }}
                />
              ))}
            </RadioGroup>
          </FormControl>
        );
      
      case 'checkbox':
        return (
          <FormControl component="fieldset" sx={{ mb: 2 }}>
            <FormLabel component="legend" sx={{ fontSize: '14px', mb: 1 }}>
              {field.label}
            </FormLabel>
            {field.options.map((option: string) => (
              <FormControlLabel
                key={option}
                control={
                  <Checkbox
                    size="small"
                    checked={config[fieldName]?.includes(option) || false}
                    onChange={(e) => {
                      const currentValues = config[fieldName] || [];
                      const newValues = e.target.checked
                        ? [...currentValues, option]
                        : currentValues.filter((v: string) => v !== option);
                      handleFieldChange(fieldName, newValues);
                    }}
                  />
                }
                label={option}
                sx={{ '& .MuiFormControlLabel-label': { fontSize: '13px' } }}
              />
            ))}
          </FormControl>
        );
      
      default:
        return (
          <TextField
            fullWidth
            label={field.label}
            value={config[fieldName] || field.default || ''}
            onChange={(e) => handleFieldChange(fieldName, e.target.value)}
            size="small"
            sx={{ mb: 2 }}
          />
        );
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: { fontFamily: 'Rubik, sans-serif' }
      }}
    >
      <DialogTitle>
        <Typography
          variant="h6"
          sx={{
            fontFamily: 'Rubik, sans-serif',
            fontSize: '16px',
            fontWeight: 500,
          }}
        >
          Configure {stage.name}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontFamily: 'Rubik, sans-serif',
            fontSize: '12px',
            color: '#666',
            mt: 0.5,
          }}
        >
          Set up the requirements and evaluation criteria for this stage
        </Typography>
      </DialogTitle>
      
      <DialogContent>
        <Box sx={{ mt: 1 }}>
          {Object.entries(configFields).map(([fieldName, field]) => (
            <Box key={fieldName}>
              {renderField(fieldName, field)}
              {fieldName !== Object.keys(configFields)[Object.keys(configFields).length - 1] && (
                <Divider sx={{ my: 2 }} />
              )}
            </Box>
          ))}
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 2, pt: 1 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            fontFamily: 'Rubik, sans-serif',
            fontSize: '13px',
            textTransform: 'none',
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          sx={{
            fontFamily: 'Rubik, sans-serif',
            fontSize: '13px',
            textTransform: 'none',
            backgroundColor: '#009933',
            '&:hover': { backgroundColor: '#007a2b' },
          }}
        >
          Save Configuration
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default StageConfigModal;
