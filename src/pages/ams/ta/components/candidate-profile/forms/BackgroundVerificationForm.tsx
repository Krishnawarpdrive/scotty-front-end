
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
  LinearProgress
} from '@mui/material';
import { Save, Upload, Verified } from '@mui/icons-material';
import { Candidate } from '../../types/CandidateTypes';

interface BackgroundVerificationFormProps {
  candidate: Candidate;
}

export const BackgroundVerificationForm: React.FC<BackgroundVerificationFormProps> = ({
  candidate
}) => {
  const [formData, setFormData] = useState({
    panId: '',
    idNumber: '',
    documentsUploaded: {
      resume: true,
      id: false,
      offerLetter: false
    },
    verificationPartner: 'First Advantage',
    verificationStatus: 'pending',
    slaDate: '',
    remarks: ''
  });

  const handleFieldChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleDocumentToggle = (docType: string) => {
    setFormData(prev => ({
      ...prev,
      documentsUploaded: {
        ...prev.documentsUploaded,
        [docType]: !prev.documentsUploaded[docType]
      }
    }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return '#009933';
      case 'in-progress': return '#f59e0b';
      case 'failed': return '#dc2626';
      default: return '#6b7280';
    }
  };

  return (
    <Box sx={{ p: 3, fontFamily: 'Rubik, sans-serif' }}>
      <Typography variant="h6" sx={{ 
        mb: 3, 
        fontFamily: 'Rubik, sans-serif', 
        fontWeight: 600 
      }}>
        Background Verification
      </Typography>

      {/* Verification Status */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" sx={{ mb: 2, fontFamily: 'Rubik, sans-serif', fontWeight: 600 }}>
          Verification Status
        </Typography>
        
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Verification Status</InputLabel>
          <Select
            value={formData.verificationStatus}
            onChange={(e) => handleFieldChange('verificationStatus', e.target.value)}
            label="Verification Status"
          >
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="in-progress">In Progress</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
            <MenuItem value="failed">Failed</MenuItem>
          </Select>
        </FormControl>

        <LinearProgress 
          variant="determinate" 
          value={formData.verificationStatus === 'completed' ? 100 : formData.verificationStatus === 'in-progress' ? 60 : 0}
          sx={{ 
            height: 8, 
            borderRadius: 4,
            bgcolor: '#f3f4f6',
            '& .MuiLinearProgress-bar': {
              bgcolor: getStatusColor(formData.verificationStatus)
            }
          }}
        />
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Identity Verification */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" sx={{ mb: 2, fontFamily: 'Rubik, sans-serif', fontWeight: 600 }}>
          Identity Verification
        </Typography>
        
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
          <TextField
            label="PAN ID"
            value={formData.panId}
            onChange={(e) => handleFieldChange('panId', e.target.value)}
            placeholder="ABCDE1234F"
          />
          <TextField
            label="ID Number"
            value={formData.idNumber}
            onChange={(e) => handleFieldChange('idNumber', e.target.value)}
            placeholder="Aadhaar/Passport Number"
          />
        </Box>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Document Upload */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" sx={{ mb: 2, fontFamily: 'Rubik, sans-serif', fontWeight: 600 }}>
          Document Upload Status
        </Typography>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <FormControlLabel
            control={
              <Switch
                checked={formData.documentsUploaded.resume}
                onChange={() => handleDocumentToggle('resume')}
              />
            }
            label="Resume"
            sx={{ fontFamily: 'Rubik, sans-serif' }}
          />
          <FormControlLabel
            control={
              <Switch
                checked={formData.documentsUploaded.id}
                onChange={() => handleDocumentToggle('id')}
              />
            }
            label="ID Proof"
            sx={{ fontFamily: 'Rubik, sans-serif' }}
          />
          <FormControlLabel
            control={
              <Switch
                checked={formData.documentsUploaded.offerLetter}
                onChange={() => handleDocumentToggle('offerLetter')}
              />
            }
            label="Previous Offer Letter"
            sx={{ fontFamily: 'Rubik, sans-serif' }}
          />
        </Box>

        <Button
          variant="outlined"
          startIcon={<Upload />}
          fullWidth
          sx={{ mt: 2, p: 2, borderStyle: 'dashed' }}
        >
          Upload Additional Documents
        </Button>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Verification Partner */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" sx={{ mb: 2, fontFamily: 'Rubik, sans-serif', fontWeight: 600 }}>
          Verification Details
        </Typography>
        
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Verification Partner</InputLabel>
          <Select
            value={formData.verificationPartner}
            onChange={(e) => handleFieldChange('verificationPartner', e.target.value)}
            label="Verification Partner"
          >
            <MenuItem value="First Advantage">First Advantage</MenuItem>
            <MenuItem value="HireRight">HireRight</MenuItem>
            <MenuItem value="Sterling">Sterling</MenuItem>
            <MenuItem value="Internal">Internal Team</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="SLA Date"
          type="date"
          value={formData.slaDate}
          onChange={(e) => handleFieldChange('slaDate', e.target.value)}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Remarks */}
      <Box sx={{ mb: 3 }}>
        <TextField
          label="Verification Remarks"
          value={formData.remarks}
          onChange={(e) => handleFieldChange('remarks', e.target.value)}
          fullWidth
          multiline
          rows={4}
          placeholder="Add any remarks about the background verification..."
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
          startIcon={<Verified />}
          sx={{ flex: 1 }}
        >
          Request Verification
        </Button>
      </Box>
    </Box>
  );
};
