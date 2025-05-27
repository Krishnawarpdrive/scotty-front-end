
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
import { Security, Save, Upload } from '@mui/icons-material';
import { Candidate } from '../../types/CandidateTypes';

interface BackgroundVerificationFormProps {
  candidate: Candidate;
}

export const BackgroundVerificationForm: React.FC<BackgroundVerificationFormProps> = ({
  candidate
}) => {
  const [formData, setFormData] = useState({
    verificationInitiated: false,
    employmentVerification: 'pending',
    educationVerification: 'pending',
    criminalBackgroundCheck: 'pending',
    referenceChecks: 'pending',
    documentsUploaded: false,
    verificationAgency: '',
    expectedCompletionDate: '',
    notes: '',
    outcome: 'pending'
  });

  const handleFieldChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'success';
      case 'in-progress': return 'warning';
      case 'failed': return 'error';
      default: return 'default';
    }
  };

  return (
    <Box sx={{ p: 3, fontFamily: 'Rubik, sans-serif' }}>
      <Typography variant="h6" sx={{ 
        mb: 3, 
        fontFamily: 'Rubik, sans-serif', 
        fontWeight: 600 
      }}>
        Background Verification Configuration
      </Typography>

      {/* Verification Setup */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" sx={{ mb: 2, fontFamily: 'Rubik, sans-serif', fontWeight: 600 }}>
          Verification Setup
        </Typography>
        
        <TextField
          label="Verification Agency"
          value={formData.verificationAgency}
          onChange={(e) => handleFieldChange('verificationAgency', e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />

        <TextField
          label="Expected Completion Date"
          value={formData.expectedCompletionDate}
          onChange={(e) => handleFieldChange('expectedCompletionDate', e.target.value)}
          fullWidth
          type="date"
          InputLabelProps={{ shrink: true }}
          sx={{ mb: 2 }}
        />

        <FormControlLabel
          control={
            <Switch
              checked={formData.verificationInitiated}
              onChange={(e) => handleFieldChange('verificationInitiated', e.target.checked)}
            />
          }
          label="Verification Initiated"
          sx={{ fontFamily: 'Rubik, sans-serif' }}
        />
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Verification Status */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" sx={{ mb: 2, fontFamily: 'Rubik, sans-serif', fontWeight: 600 }}>
          Verification Status
        </Typography>
        
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 2 }}>
          <FormControl fullWidth>
            <InputLabel>Employment Verification</InputLabel>
            <Select
              value={formData.employmentVerification}
              onChange={(e) => handleFieldChange('employmentVerification', e.target.value)}
              label="Employment Verification"
            >
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="in-progress">In Progress</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
              <MenuItem value="failed">Failed</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Education Verification</InputLabel>
            <Select
              value={formData.educationVerification}
              onChange={(e) => handleFieldChange('educationVerification', e.target.value)}
              label="Education Verification"
            >
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="in-progress">In Progress</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
              <MenuItem value="failed">Failed</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 2 }}>
          <FormControl fullWidth>
            <InputLabel>Criminal Background Check</InputLabel>
            <Select
              value={formData.criminalBackgroundCheck}
              onChange={(e) => handleFieldChange('criminalBackgroundCheck', e.target.value)}
              label="Criminal Background Check"
            >
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="in-progress">In Progress</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
              <MenuItem value="failed">Failed</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Reference Checks</InputLabel>
            <Select
              value={formData.referenceChecks}
              onChange={(e) => handleFieldChange('referenceChecks', e.target.value)}
              label="Reference Checks"
            >
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="in-progress">In Progress</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
              <MenuItem value="failed">Failed</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <FormControlLabel
          control={
            <Switch
              checked={formData.documentsUploaded}
              onChange={(e) => handleFieldChange('documentsUploaded', e.target.checked)}
            />
          }
          label="All Documents Uploaded"
          sx={{ fontFamily: 'Rubik, sans-serif' }}
        />
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Overall Outcome */}
      <Box sx={{ mb: 3 }}>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Overall Outcome</InputLabel>
          <Select
            value={formData.outcome}
            onChange={(e) => handleFieldChange('outcome', e.target.value)}
            label="Overall Outcome"
          >
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="cleared">Cleared</MenuItem>
            <MenuItem value="failed">Failed</MenuItem>
            <MenuItem value="conditional">Conditional Approval</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Verification Notes"
          value={formData.notes}
          onChange={(e) => handleFieldChange('notes', e.target.value)}
          fullWidth
          multiline
          rows={4}
          placeholder="Document status, verification findings, additional notes..."
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
          startIcon={<Security />}
          sx={{ flex: 1 }}
        >
          Initiate Verification
        </Button>
      </Box>
    </Box>
  );
};
