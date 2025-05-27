
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
import { VerifiedUser, Save, Upload } from '@mui/icons-material';
import { Candidate } from '../../types/CandidateTypes';

interface BackgroundVerificationFormProps {
  candidate: Candidate;
}

export const BackgroundVerificationForm: React.FC<BackgroundVerificationFormProps> = ({
  candidate
}) => {
  const [formData, setFormData] = useState({
    identityVerification: 'pending',
    educationVerification: 'pending',
    employmentVerification: 'pending',
    criminalCheck: 'pending',
    referenceCheck: 'pending',
    verificationAgency: '',
    estimatedDays: '7',
    verificationNotes: '',
    documentsSubmitted: false,
    documentsRequired: ['Identity Proof', 'Education Certificates', 'Experience Letters'],
    verificationCost: '',
    priority: 'standard'
  });

  const handleFieldChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const verificationItems = [
    { key: 'identityVerification', label: 'Identity Verification' },
    { key: 'educationVerification', label: 'Education Verification' },
    { key: 'employmentVerification', label: 'Employment History' },
    { key: 'criminalCheck', label: 'Criminal Background Check' },
    { key: 'referenceCheck', label: 'Reference Check' }
  ];

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
        
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 2, mb: 2 }}>
          <TextField
            label="Verification Agency"
            value={formData.verificationAgency}
            onChange={(e) => handleFieldChange('verificationAgency', e.target.value)}
            placeholder="e.g., AuthBridge, First Advantage"
          />
          <TextField
            label="Estimated Days"
            value={formData.estimatedDays}
            onChange={(e) => handleFieldChange('estimatedDays', e.target.value)}
            type="number"
          />
          <FormControl fullWidth>
            <InputLabel>Priority</InputLabel>
            <Select
              value={formData.priority}
              onChange={(e) => handleFieldChange('priority', e.target.value)}
              label="Priority"
            >
              <MenuItem value="standard">Standard (7-10 days)</MenuItem>
              <MenuItem value="express">Express (3-5 days)</MenuItem>
              <MenuItem value="urgent">Urgent (1-2 days)</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <TextField
          label="Verification Cost"
          value={formData.verificationCost}
          onChange={(e) => handleFieldChange('verificationCost', e.target.value)}
          fullWidth
          placeholder="e.g., ₹2,500"
          sx={{ mb: 2 }}
        />
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Document Requirements */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" sx={{ mb: 2, fontFamily: 'Rubik, sans-serif', fontWeight: 600 }}>
          Document Requirements
        </Typography>
        
        <Box sx={{ mb: 2 }}>
          <Typography variant="caption" sx={{ mb: 1, display: 'block', fontFamily: 'Rubik, sans-serif' }}>
            Required Documents
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
            {formData.documentsRequired.map((doc, index) => (
              <Chip
                key={index}
                label={doc}
                variant="outlined"
                size="small"
              />
            ))}
          </Box>
        </Box>

        <FormControlLabel
          control={
            <Switch
              checked={formData.documentsSubmitted}
              onChange={(e) => handleFieldChange('documentsSubmitted', e.target.checked)}
            />
          }
          label="All Documents Submitted by Candidate"
          sx={{ fontFamily: 'Rubik, sans-serif', mb: 2 }}
        />

        <Button
          variant="outlined"
          startIcon={<Upload />}
          fullWidth
          sx={{ mb: 2, p: 2, borderStyle: 'dashed' }}
        >
          Upload Documents for Verification
        </Button>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Verification Status */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" sx={{ mb: 2, fontFamily: 'Rubik, sans-serif', fontWeight: 600 }}>
          Verification Status
        </Typography>
        
        {verificationItems.map((item) => (
          <Box key={item.key} sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Typography sx={{ flex: 1, fontFamily: 'Rubik, sans-serif', fontSize: '14px' }}>
              {item.label}
            </Typography>
            <FormControl sx={{ minWidth: 150 }}>
              <Select
                value={formData[item.key as keyof typeof formData]}
                onChange={(e) => handleFieldChange(item.key, e.target.value)}
                size="small"
              >
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="in-progress">In Progress</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
                <MenuItem value="failed">Failed</MenuItem>
              </Select>
            </FormControl>
            <Chip
              label={formData[item.key as keyof typeof formData] as string}
              color={getStatusColor(formData[item.key as keyof typeof formData] as string) as any}
              size="small"
            />
          </Box>
        ))}
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Verification Notes */}
      <Box sx={{ mb: 3 }}>
        <TextField
          label="Verification Notes"
          value={formData.verificationNotes}
          onChange={(e) => handleFieldChange('verificationNotes', e.target.value)}
          fullWidth
          multiline
          rows={4}
          placeholder="Any specific instructions, concerns, or findings during verification..."
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
          startIcon={<VerifiedUser />}
          sx={{ flex: 1 }}
        >
          Initiate Verification
        </Button>
      </Box>
    </Box>
  );
};
