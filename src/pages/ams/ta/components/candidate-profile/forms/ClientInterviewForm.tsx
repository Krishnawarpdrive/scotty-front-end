
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
import { Save, Group } from '@mui/icons-material';
import { Candidate } from '../../types/CandidateTypes';

interface ClientInterviewFormProps {
  candidate: Candidate;
}

export const ClientInterviewForm: React.FC<ClientInterviewFormProps> = ({
  candidate
}) => {
  const [formData, setFormData] = useState({
    clientName: 'TechCorp Solutions',
    interviewerName: 'Michael Johnson',
    interviewerContact: 'michael.johnson@techcorp.com',
    roundType: 'Final Round',
    taCoordinator: 'Sarah Wilson',
    ndaSigned: false,
    interviewType: 'one-on-one',
    mode: 'virtual',
    dateTime: '',
    meetingLink: '',
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
        Client Interview Configuration
      </Typography>

      {/* Client Information */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" sx={{ mb: 2, fontFamily: 'Rubik, sans-serif', fontWeight: 600 }}>
          Client Information
        </Typography>
        
        <TextField
          label="Client Name"
          value={formData.clientName}
          onChange={(e) => handleFieldChange('clientName', e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />

        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 2 }}>
          <TextField
            label="Interviewer Name"
            value={formData.interviewerName}
            onChange={(e) => handleFieldChange('interviewerName', e.target.value)}
          />
          <TextField
            label="Interviewer Contact"
            value={formData.interviewerContact}
            onChange={(e) => handleFieldChange('interviewerContact', e.target.value)}
          />
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
          <TextField
            label="Round Type"
            value={formData.roundType}
            onChange={(e) => handleFieldChange('roundType', e.target.value)}
          />
          <TextField
            label="TA Coordinator"
            value={formData.taCoordinator}
            onChange={(e) => handleFieldChange('taCoordinator', e.target.value)}
          />
        </Box>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Legal & Compliance */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" sx={{ mb: 2, fontFamily: 'Rubik, sans-serif', fontWeight: 600 }}>
          Legal & Compliance
        </Typography>
        
        <FormControlLabel
          control={
            <Switch
              checked={formData.ndaSigned}
              onChange={(e) => handleFieldChange('ndaSigned', e.target.checked)}
            />
          }
          label="NDA Signed"
          sx={{ fontFamily: 'Rubik, sans-serif' }}
        />
      </Box>

      <Divider sx={{ my: 3 }} />

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
          label="Meeting Link"
          value={formData.meetingLink}
          onChange={(e) => handleFieldChange('meetingLink', e.target.value)}
          fullWidth
          placeholder="https://teams.microsoft.com/..."
        />
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
          label="Client Interview Notes"
          value={formData.notes}
          onChange={(e) => handleFieldChange('notes', e.target.value)}
          fullWidth
          multiline
          rows={4}
          placeholder="Add notes about the client interview..."
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
          startIcon={<Group />}
          sx={{ flex: 1 }}
        >
          Coordinate Interview
        </Button>
      </Box>
    </Box>
  );
};
