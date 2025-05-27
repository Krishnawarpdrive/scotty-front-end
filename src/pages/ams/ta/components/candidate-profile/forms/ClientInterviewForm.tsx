
import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  FormControlLabel, 
  Switch,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Divider,
  Chip
} from '@mui/material';
import { VideoCall, Save, Person } from '@mui/icons-material';
import { Candidate } from '../../types/CandidateTypes';

interface ClientInterviewFormProps {
  candidate: Candidate;
}

export const ClientInterviewForm: React.FC<ClientInterviewFormProps> = ({
  candidate
}) => {
  const [formData, setFormData] = useState({
    interviewScheduled: false,
    interviewType: 'video',
    outcome: 'pending',
    clientFeedback: '',
    culturalFit: 'pending',
    technicalFit: 'pending',
    interviewNotes: '',
    duration: '45',
    clientInterviewerName: '',
    followUpRequired: false
  });

  const handleFieldChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Box sx={{ p: 3, fontFamily: 'Rubik, sans-serif' }}>
      <Typography variant="h6" sx={{ 
        mb: 3, 
        fontFamily: 'Rubik, sans-serif', 
        fontWeight: 600 
      }}>
        Client Interview Configuration
      </Typography>

      {/* Interview Setup */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" sx={{ mb: 2, fontFamily: 'Rubik, sans-serif', fontWeight: 600 }}>
          Interview Setup
        </Typography>
        
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 2 }}>
          <FormControl fullWidth>
            <InputLabel>Interview Type</InputLabel>
            <Select
              value={formData.interviewType}
              onChange={(e) => handleFieldChange('interviewType', e.target.value)}
              label="Interview Type"
            >
              <MenuItem value="video">Video Call</MenuItem>
              <MenuItem value="in-person">In Person</MenuItem>
              <MenuItem value="phone">Phone</MenuItem>
            </Select>
          </FormControl>
          
          <TextField
            label="Duration (minutes)"
            value={formData.duration}
            onChange={(e) => handleFieldChange('duration', e.target.value)}
            type="number"
          />
        </Box>

        <TextField
          label="Client Interviewer Name"
          value={formData.clientInterviewerName}
          onChange={(e) => handleFieldChange('clientInterviewerName', e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />

        <FormControlLabel
          control={
            <Switch
              checked={formData.interviewScheduled}
              onChange={(e) => handleFieldChange('interviewScheduled', e.target.checked)}
            />
          }
          label="Interview Scheduled"
          sx={{ fontFamily: 'Rubik, sans-serif' }}
        />
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Assessment */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" sx={{ mb: 2, fontFamily: 'Rubik, sans-serif', fontWeight: 600 }}>
          Client Assessment
        </Typography>
        
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 2 }}>
          <FormControl fullWidth>
            <InputLabel>Cultural Fit</InputLabel>
            <Select
              value={formData.culturalFit}
              onChange={(e) => handleFieldChange('culturalFit', e.target.value)}
              label="Cultural Fit"
            >
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="excellent">Excellent</MenuItem>
              <MenuItem value="good">Good</MenuItem>
              <MenuItem value="average">Average</MenuItem>
              <MenuItem value="poor">Poor</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Technical Fit</InputLabel>
            <Select
              value={formData.technicalFit}
              onChange={(e) => handleFieldChange('technicalFit', e.target.value)}
              label="Technical Fit"
            >
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="excellent">Excellent</MenuItem>
              <MenuItem value="good">Good</MenuItem>
              <MenuItem value="average">Average</MenuItem>
              <MenuItem value="poor">Poor</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <TextField
          label="Client Feedback"
          value={formData.clientFeedback}
          onChange={(e) => handleFieldChange('clientFeedback', e.target.value)}
          fullWidth
          multiline
          rows={3}
          sx={{ mb: 2 }}
        />

        <FormControlLabel
          control={
            <Switch
              checked={formData.followUpRequired}
              onChange={(e) => handleFieldChange('followUpRequired', e.target.checked)}
            />
          }
          label="Follow-up Required"
          sx={{ fontFamily: 'Rubik, sans-serif' }}
        />
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Interview Outcome */}
      <Box sx={{ mb: 3 }}>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Interview Outcome</InputLabel>
          <Select
            value={formData.outcome}
            onChange={(e) => handleFieldChange('outcome', e.target.value)}
            label="Interview Outcome"
          >
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="pass">Pass</MenuItem>
            <MenuItem value="fail">Fail</MenuItem>
            <MenuItem value="strong-pass">Strong Pass</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Interview Notes"
          value={formData.interviewNotes}
          onChange={(e) => handleFieldChange('interviewNotes', e.target.value)}
          fullWidth
          multiline
          rows={4}
          placeholder="Client feedback, cultural fit assessment, next steps..."
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
          startIcon={<VideoCall />}
          sx={{ flex: 1 }}
        >
          Schedule Client Interview
        </Button>
      </Box>
    </Box>
  );
};
