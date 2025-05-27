
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
  Divider
} from '@mui/material';
import { Business, Save, Schedule } from '@mui/icons-material';
import { Candidate } from '../../types/CandidateTypes';

interface ClientInterviewFormProps {
  candidate: Candidate;
}

export const ClientInterviewForm: React.FC<ClientInterviewFormProps> = ({
  candidate
}) => {
  const [formData, setFormData] = useState({
    clientName: 'TechCorp Solutions',
    interviewerName: '',
    interviewDate: '',
    interviewTime: '',
    interviewMode: 'video',
    interviewScheduled: false,
    outcome: 'pending',
    clientFeedback: '',
    culturalFit: '',
    technicalFit: '',
    salaryDiscussion: false,
    agreedSalary: '',
    nextSteps: ''
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

      {/* Client Details */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" sx={{ mb: 2, fontFamily: 'Rubik, sans-serif', fontWeight: 600 }}>
          Client Information
        </Typography>
        
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 2 }}>
          <TextField
            label="Client Company"
            value={formData.clientName}
            onChange={(e) => handleFieldChange('clientName', e.target.value)}
            disabled
          />
          <TextField
            label="Client Interviewer"
            value={formData.interviewerName}
            onChange={(e) => handleFieldChange('interviewerName', e.target.value)}
            placeholder="Hiring Manager Name"
          />
        </Box>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Interview Scheduling */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" sx={{ mb: 2, fontFamily: 'Rubik, sans-serif', fontWeight: 600 }}>
          Interview Scheduling
        </Typography>
        
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 2, mb: 2 }}>
          <TextField
            label="Interview Date"
            type="date"
            value={formData.interviewDate}
            onChange={(e) => handleFieldChange('interviewDate', e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Interview Time"
            type="time"
            value={formData.interviewTime}
            onChange={(e) => handleFieldChange('interviewTime', e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
          <FormControl fullWidth>
            <InputLabel>Interview Mode</InputLabel>
            <Select
              value={formData.interviewMode}
              onChange={(e) => handleFieldChange('interviewMode', e.target.value)}
              label="Interview Mode"
            >
              <MenuItem value="video">Video Call</MenuItem>
              <MenuItem value="in-person">In Person</MenuItem>
              <MenuItem value="phone">Phone</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <FormControlLabel
          control={
            <Switch
              checked={formData.interviewScheduled}
              onChange={(e) => handleFieldChange('interviewScheduled', e.target.checked)}
            />
          }
          label="Interview Confirmed with Client"
          sx={{ fontFamily: 'Rubik, sans-serif' }}
        />
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Interview Assessment */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" sx={{ mb: 2, fontFamily: 'Rubik, sans-serif', fontWeight: 600 }}>
          Interview Assessment
        </Typography>
        
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 2 }}>
          <FormControl fullWidth>
            <InputLabel>Cultural Fit</InputLabel>
            <Select
              value={formData.culturalFit}
              onChange={(e) => handleFieldChange('culturalFit', e.target.value)}
              label="Cultural Fit"
            >
              <MenuItem value="">Not Assessed</MenuItem>
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
              <MenuItem value="">Not Assessed</MenuItem>
              <MenuItem value="excellent">Excellent</MenuItem>
              <MenuItem value="good">Good</MenuItem>
              <MenuItem value="average">Average</MenuItem>
              <MenuItem value="poor">Poor</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Interview Outcome</InputLabel>
          <Select
            value={formData.outcome}
            onChange={(e) => handleFieldChange('outcome', e.target.value)}
            label="Interview Outcome"
          >
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="selected">Selected</MenuItem>
            <MenuItem value="rejected">Rejected</MenuItem>
            <MenuItem value="on-hold">On Hold</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Client Feedback"
          value={formData.clientFeedback}
          onChange={(e) => handleFieldChange('clientFeedback', e.target.value)}
          fullWidth
          multiline
          rows={3}
          placeholder="Client's detailed feedback about the candidate..."
          sx={{ mb: 2 }}
        />
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Salary Discussion */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" sx={{ mb: 2, fontFamily: 'Rubik, sans-serif', fontWeight: 600 }}>
          Compensation Discussion
        </Typography>
        
        <FormControlLabel
          control={
            <Switch
              checked={formData.salaryDiscussion}
              onChange={(e) => handleFieldChange('salaryDiscussion', e.target.checked)}
            />
          }
          label="Salary Discussed"
          sx={{ fontFamily: 'Rubik, sans-serif', mb: 2 }}
        />

        {formData.salaryDiscussion && (
          <TextField
            label="Agreed Salary Range"
            value={formData.agreedSalary}
            onChange={(e) => handleFieldChange('agreedSalary', e.target.value)}
            fullWidth
            placeholder="e.g., 80,000 - 90,000"
            sx={{ mb: 2 }}
          />
        )}

        <TextField
          label="Next Steps"
          value={formData.nextSteps}
          onChange={(e) => handleFieldChange('nextSteps', e.target.value)}
          fullWidth
          multiline
          rows={2}
          placeholder="Follow-up actions, additional rounds, etc..."
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
          startIcon={<Schedule />}
          sx={{ flex: 1 }}
        >
          Schedule Follow-up
        </Button>
      </Box>
    </Box>
  );
};
