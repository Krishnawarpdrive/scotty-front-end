
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
  Autocomplete,
  Chip,
} from '@mui/material';

interface Stage {
  id: string;
  name: string;
  category: 'internal' | 'external' | 'partner' | 'client' | 'verification';
  order: number;
  config?: any;
}

interface StageConfigModalProps {
  open: boolean;
  onClose: () => void;
  stage: Stage | null;
  onSave: (stageId: string, config: any) => void;
}

// Mock data for interviewers
const mockInterviewers = [
  { id: '1', name: 'Sarah Johnson', email: 'sarah.johnson@company.com' },
  { id: '2', name: 'Mike Chen', email: 'mike.chen@company.com' },
  { id: '3', name: 'Emily Davis', email: 'emily.davis@company.com' },
  { id: '4', name: 'Alex Kumar', email: 'alex.kumar@company.com' },
  { id: '5', name: 'Lisa Wilson', email: 'lisa.wilson@company.com' },
];

const StageConfigModal: React.FC<StageConfigModalProps> = ({
  open,
  onClose,
  stage,
  onSave,
}) => {
  const [config, setConfig] = useState<any>({
    interviewFormat: 'one-to-one',
    interviewers: [],
    notes: '',
    maxCandidatesPerRound: 8,
    candidateInstructions: '',
  });

  useEffect(() => {
    if (stage) {
      setConfig({
        interviewFormat: stage.config?.interviewFormat || 'one-to-one',
        interviewers: stage.config?.interviewers || [],
        notes: stage.config?.notes || '',
        maxCandidatesPerRound: stage.config?.maxCandidatesPerRound || 8,
        candidateInstructions: stage.config?.candidateInstructions || '',
      });
    }
  }, [stage]);

  if (!stage) return null;

  const isGroupDiscussion = stage.name.toLowerCase().includes('group');

  const handleSave = () => {
    onSave(stage.id, config);
  };

  const handleInterviewersChange = (event: any, newValue: any[]) => {
    setConfig((prev: any) => ({
      ...prev,
      interviewers: newValue,
    }));
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: { 
          fontFamily: 'Rubik, sans-serif',
          borderRadius: '16px',
        }
      }}
    >
      <DialogTitle>
        <Typography
          variant="h6"
          sx={{
            fontFamily: 'Rubik, sans-serif',
            fontSize: '18px',
            fontWeight: 500,
            color: '#262626',
          }}
        >
          Configure {stage.name}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontFamily: 'Rubik, sans-serif',
            fontSize: '13px',
            color: '#6b7280',
            mt: 0.5,
          }}
        >
          Set up the interview format and assign interviewers
        </Typography>
      </DialogTitle>
      
      <DialogContent sx={{ pt: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          
          {/* Interview Format */}
          <FormControl component="fieldset">
            <FormLabel 
              component="legend" 
              sx={{ 
                fontFamily: 'Rubik, sans-serif',
                fontSize: '14px', 
                fontWeight: 500,
                color: '#262626',
                mb: 1,
              }}
            >
              Interview Format
            </FormLabel>
            <RadioGroup
              value={config.interviewFormat}
              onChange={(e) => setConfig((prev: any) => ({ ...prev, interviewFormat: e.target.value }))}
            >
              <FormControlLabel
                value="one-to-one"
                control={<Radio size="small" />}
                label="One-to-One"
                disabled={isGroupDiscussion}
                sx={{ '& .MuiFormControlLabel-label': { fontFamily: 'Rubik, sans-serif', fontSize: '13px' } }}
              />
              <FormControlLabel
                value="panel"
                control={<Radio size="small" />}
                label="Panel"
                disabled={isGroupDiscussion}
                sx={{ '& .MuiFormControlLabel-label': { fontFamily: 'Rubik, sans-serif', fontSize: '13px' } }}
              />
              <FormControlLabel
                value="group"
                control={<Radio size="small" />}
                label="Group"
                disabled={!isGroupDiscussion}
                sx={{ '& .MuiFormControlLabel-label': { fontFamily: 'Rubik, sans-serif', fontSize: '13px' } }}
              />
            </RadioGroup>
            {isGroupDiscussion && (
              <Typography
                sx={{
                  fontFamily: 'Rubik, sans-serif',
                  fontSize: '12px',
                  color: '#6b7280',
                  mt: 1,
                  fontStyle: 'italic',
                }}
              >
                Group format is automatically selected for Group Discussion stages
              </Typography>
            )}
          </FormControl>

          {/* Interviewers */}
          <FormControl>
            <FormLabel 
              sx={{ 
                fontFamily: 'Rubik, sans-serif',
                fontSize: '14px', 
                fontWeight: 500,
                color: '#262626',
                mb: 1,
              }}
            >
              Interviewers
            </FormLabel>
            <Autocomplete
              multiple
              options={mockInterviewers}
              getOptionLabel={(option) => `${option.name} (${option.email})`}
              value={config.interviewers}
              onChange={handleInterviewersChange}
              renderTags={(tagValue, getTagProps) =>
                tagValue.map((option, index) => (
                  <Chip
                    label={option.name}
                    {...getTagProps({ index })}
                    key={option.id}
                    size="small"
                    sx={{ fontFamily: 'Rubik, sans-serif', fontSize: '12px' }}
                  />
                ))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Select interviewers"
                  size="small"
                  sx={{
                    '& .MuiInputBase-input': {
                      fontFamily: 'Rubik, sans-serif',
                      fontSize: '13px',
                    },
                  }}
                />
              )}
            />
          </FormControl>

          {/* Group Discussion Specific Fields */}
          {isGroupDiscussion && (
            <TextField
              label="Max Candidates per Round"
              type="number"
              value={config.maxCandidatesPerRound}
              onChange={(e) => setConfig((prev: any) => ({ ...prev, maxCandidatesPerRound: parseInt(e.target.value) || 8 }))}
              size="small"
              inputProps={{ min: 1, max: 20 }}
              sx={{
                '& .MuiInputLabel-root': {
                  fontFamily: 'Rubik, sans-serif',
                  fontSize: '14px',
                },
                '& .MuiInputBase-input': {
                  fontFamily: 'Rubik, sans-serif',
                  fontSize: '13px',
                },
              }}
            />
          )}

          {/* Notes */}
          <TextField
            label="Notes (Optional)"
            multiline
            rows={3}
            value={config.notes}
            onChange={(e) => setConfig((prev: any) => ({ ...prev, notes: e.target.value }))}
            placeholder="Add any specific interviewer instructions or reminders..."
            size="small"
            sx={{
              '& .MuiInputLabel-root': {
                fontFamily: 'Rubik, sans-serif',
                fontSize: '14px',
              },
              '& .MuiInputBase-input': {
                fontFamily: 'Rubik, sans-serif',
                fontSize: '13px',
              },
            }}
          />

          {/* Group Discussion Candidate Instructions */}
          {isGroupDiscussion && (
            <TextField
              label="Candidate Instructions (Optional)"
              multiline
              rows={3}
              value={config.candidateInstructions}
              onChange={(e) => setConfig((prev: any) => ({ ...prev, candidateInstructions: e.target.value }))}
              placeholder="Instructions to be shared with candidates before the group discussion..."
              size="small"
              sx={{
                '& .MuiInputLabel-root': {
                  fontFamily: 'Rubik, sans-serif',
                  fontSize: '14px',
                },
                '& .MuiInputBase-input': {
                  fontFamily: 'Rubik, sans-serif',
                  fontSize: '13px',
                },
              }}
            />
          )}

        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 2 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            fontFamily: 'Rubik, sans-serif',
            fontSize: '13px',
            textTransform: 'none',
            borderColor: '#e5e7eb',
            color: '#666',
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
