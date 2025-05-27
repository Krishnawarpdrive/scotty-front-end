
import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Divider
} from '@mui/material';
import { Save, VideoCall } from '@mui/icons-material';
import { Candidate } from '../../types/CandidateTypes';

interface TechnicalInterviewFormProps {
  candidate: Candidate;
}

export const TechnicalInterviewForm: React.FC<TechnicalInterviewFormProps> = ({
  candidate
}) => {
  const [formData, setFormData] = useState({
    interviewType: 'one-on-one',
    mode: 'virtual',
    dateTime: '',
    meetingLink: '',
    interviewers: ['John Smith', 'Sarah Wilson'],
    technicalSkills: ['Network Administration', 'Cisco', 'Linux', 'TCP/IP'],
    assessmentAreas: ['Technical Knowledge', 'Problem Solving', 'Communication'],
    notes: '',
    outcome: 'pending'
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
        Technical Interview Configuration
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
              <MenuItem value="one-on-one">One-on-One</MenuItem>
              <MenuItem value="panel">Panel Interview</MenuItem>
              <MenuItem value="group">Group Interview</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Mode</InputLabel>
            <Select
              value={formData.mode}
              onChange={(e) => handleFieldChange('mode', e.target.value)}
              label="Mode"
            >
              <MenuItem value="virtual">Virtual</MenuItem>
              <MenuItem value="in-person">In-Person</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <TextField
          label="Date & Time"
          type="datetime-local"
          value={formData.dateTime}
          onChange={(e) => handleFieldChange('dateTime', e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          label="Meeting Link (for virtual interviews)"
          value={formData.meetingLink}
          onChange={(e) => handleFieldChange('meetingLink', e.target.value)}
          fullWidth
          placeholder="https://zoom.us/j/..."
        />
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Interviewers */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" sx={{ mb: 2, fontFamily: 'Rubik, sans-serif', fontWeight: 600 }}>
          Interviewers
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {formData.interviewers.map((interviewer) => (
            <Chip 
              key={interviewer}
              label={interviewer} 
              variant="outlined"
              sx={{ fontFamily: 'Rubik, sans-serif' }}
            />
          ))}
          <Chip 
            label="+ Add Interviewer" 
            variant="outlined" 
            color="primary"
            sx={{ fontFamily: 'Rubik, sans-serif' }}
          />
        </Box>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Technical Skills Assessment */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" sx={{ mb: 2, fontFamily: 'Rubik, sans-serif', fontWeight: 600 }}>
          Technical Skills to Assess
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {formData.technicalSkills.map((skill) => (
            <Chip 
              key={skill}
              label={skill} 
              sx={{ 
                bgcolor: '#e8f5e8', 
                color: '#2e7d32',
                fontFamily: 'Rubik, sans-serif'
              }}
            />
          ))}
        </Box>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Assessment Areas */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" sx={{ mb: 2, fontFamily: 'Rubik, sans-serif', fontWeight: 600 }}>
          Assessment Areas
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {formData.assessmentAreas.map((area) => (
            <Chip 
              key={area}
              label={area} 
              variant="outlined"
              sx={{ fontFamily: 'Rubik, sans-serif' }}
            />
          ))}
        </Box>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Outcome & Notes */}
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
            <MenuItem value="on-hold">On Hold</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Interview Notes"
          value={formData.notes}
          onChange={(e) => handleFieldChange('notes', e.target.value)}
          fullWidth
          multiline
          rows={4}
          placeholder="Add notes about the technical interview..."
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
          Schedule Interview
        </Button>
      </Box>
    </Box>
  );
};
