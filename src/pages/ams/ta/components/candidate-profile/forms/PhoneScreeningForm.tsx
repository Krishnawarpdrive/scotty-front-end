
import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  FormControlLabel, 
  Switch,
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Divider
} from '@mui/material';
import { Upload, Phone, Save } from '@mui/icons-material';
import { Candidate } from '../../types/CandidateTypes';

interface PhoneScreeningFormProps {
  candidate: Candidate;
}

export const PhoneScreeningForm: React.FC<PhoneScreeningFormProps> = ({
  candidate
}) => {
  const [formData, setFormData] = useState({
    callScheduled: false,
    phoneNumber: '+91 98765 43210',
    outcome: 'pending',
    notes: '',
    experienceYears: '5',
    currentLocation: 'Mumbai',
    availabilityWeeks: '2',
    recordingUrl: '',
    questionsAsked: ['Tell me about your network administration experience', 'What are your salary expectations?']
  });

  const handleFieldChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addQuestion = () => {
    setFormData(prev => ({
      ...prev,
      questionsAsked: [...prev.questionsAsked, '']
    }));
  };

  const updateQuestion = (index: number, value: string) => {
    const questions = [...formData.questionsAsked];
    questions[index] = value;
    setFormData(prev => ({ ...prev, questionsAsked: questions }));
  };

  const removeQuestion = (index: number) => {
    const questions = formData.questionsAsked.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, questionsAsked: questions }));
  };

  return (
    <Box sx={{ p: 3, fontFamily: 'Rubik, sans-serif' }}>
      <Typography variant="h6" sx={{ 
        mb: 3, 
        fontFamily: 'Rubik, sans-serif', 
        fontWeight: 600 
      }}>
        Phone Screening Configuration
      </Typography>

      {/* Call Scheduling */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" sx={{ mb: 2, fontFamily: 'Rubik, sans-serif', fontWeight: 600 }}>
          Call Scheduling
        </Typography>
        
        <TextField
          label="Phone Number"
          value={formData.phoneNumber}
          onChange={(e) => handleFieldChange('phoneNumber', e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />

        <FormControlLabel
          control={
            <Switch
              checked={formData.callScheduled}
              onChange={(e) => handleFieldChange('callScheduled', e.target.checked)}
            />
          }
          label="Call Scheduled"
          sx={{ fontFamily: 'Rubik, sans-serif' }}
        />
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Candidate Information */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" sx={{ mb: 2, fontFamily: 'Rubik, sans-serif', fontWeight: 600 }}>
          Candidate Information
        </Typography>
        
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 2 }}>
          <TextField
            label="Years of Experience"
            value={formData.experienceYears}
            onChange={(e) => handleFieldChange('experienceYears', e.target.value)}
          />
          <TextField
            label="Current Location"
            value={formData.currentLocation}
            onChange={(e) => handleFieldChange('currentLocation', e.target.value)}
          />
        </Box>

        <TextField
          label="Availability (in weeks)"
          value={formData.availabilityWeeks}
          onChange={(e) => handleFieldChange('availabilityWeeks', e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Questions Asked */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" sx={{ mb: 2, fontFamily: 'Rubik, sans-serif', fontWeight: 600 }}>
          Questions Asked
        </Typography>
        
        {formData.questionsAsked.map((question, index) => (
          <Box key={index} sx={{ display: 'flex', gap: 1, mb: 1 }}>
            <TextField
              value={question}
              onChange={(e) => updateQuestion(index, e.target.value)}
              placeholder={`Question ${index + 1}`}
              fullWidth
              size="small"
            />
            <Button
              variant="outlined"
              size="small"
              onClick={() => removeQuestion(index)}
              color="error"
            >
              Remove
            </Button>
          </Box>
        ))}
        
        <Button
          variant="outlined"
          onClick={addQuestion}
          sx={{ mt: 1 }}
        >
          Add Question
        </Button>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Resume Upload */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" sx={{ mb: 2, fontFamily: 'Rubik, sans-serif', fontWeight: 600 }}>
          Resume Upload
        </Typography>
        
        <Button
          variant="outlined"
          startIcon={<Upload />}
          fullWidth
          sx={{ mb: 2, p: 2, borderStyle: 'dashed' }}
        >
          Upload Resume (PDF, DOC, DOCX)
        </Button>
        
        <Typography variant="caption" color="text.secondary" sx={{ fontFamily: 'Rubik, sans-serif' }}>
          Maximum file size: 10MB
        </Typography>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Call Outcome */}
      <Box sx={{ mb: 3 }}>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Call Outcome</InputLabel>
          <Select
            value={formData.outcome}
            onChange={(e) => handleFieldChange('outcome', e.target.value)}
            label="Call Outcome"
          >
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="pass">Pass</MenuItem>
            <MenuItem value="fail">Fail</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Recording URL (Optional)"
          value={formData.recordingUrl}
          onChange={(e) => handleFieldChange('recordingUrl', e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />

        <TextField
          label="Notes"
          value={formData.notes}
          onChange={(e) => handleFieldChange('notes', e.target.value)}
          fullWidth
          multiline
          rows={4}
          placeholder="Add notes about the phone screening..."
        />
      </Box>

      {/* Action Buttons */}
      <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
        <Button
          variant="contained"
          startIcon={<Save />}
          sx={{ 
            bgcolor: '#009933', 
            '&:hover': { bgcolor: '#00a341' },
            flex: 1
          }}
        >
          Save Progress
        </Button>
        <Button
          variant="outlined"
          startIcon={<Phone />}
          sx={{ flex: 1 }}
        >
          Schedule Call
        </Button>
      </Box>
    </Box>
  );
};
