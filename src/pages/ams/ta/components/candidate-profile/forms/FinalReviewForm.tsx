
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
  Chip,
  Rating
} from '@mui/material';
import { CheckCircle, Save, Send } from '@mui/icons-material';
import { Candidate } from '../../types/CandidateTypes';

interface FinalReviewFormProps {
  candidate: Candidate;
}

export const FinalReviewForm: React.FC<FinalReviewFormProps> = ({
  candidate
}) => {
  const [formData, setFormData] = useState({
    overallRating: 0,
    finalDecision: 'pending',
    salaryOffered: '',
    joiningDate: '',
    offerSent: false,
    offerAccepted: false,
    finalNotes: '',
    hrApproval: false,
    clientApproval: false,
    contractSigned: false
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
        Final Review & Decision
      </Typography>

      {/* Overall Assessment */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" sx={{ mb: 2, fontFamily: 'Rubik, sans-serif', fontWeight: 600 }}>
          Overall Assessment
        </Typography>
        
        <Box sx={{ mb: 2 }}>
          <Typography variant="caption" sx={{ mb: 1, display: 'block', fontFamily: 'Rubik, sans-serif' }}>
            Overall Rating
          </Typography>
          <Rating
            value={formData.overallRating}
            onChange={(event, newValue) => handleFieldChange('overallRating', newValue)}
            size="large"
          />
        </Box>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Final Decision</InputLabel>
          <Select
            value={formData.finalDecision}
            onChange={(e) => handleFieldChange('finalDecision', e.target.value)}
            label="Final Decision"
          >
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="selected">Selected</MenuItem>
            <MenuItem value="rejected">Rejected</MenuItem>
            <MenuItem value="hold">On Hold</MenuItem>
            <MenuItem value="waitlist">Waitlist</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Offer Details */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" sx={{ mb: 2, fontFamily: 'Rubik, sans-serif', fontWeight: 600 }}>
          Offer Details
        </Typography>
        
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 2 }}>
          <TextField
            label="Salary Offered"
            value={formData.salaryOffered}
            onChange={(e) => handleFieldChange('salaryOffered', e.target.value)}
            placeholder="e.g., 8,00,000 INR"
          />
          
          <TextField
            label="Expected Joining Date"
            value={formData.joiningDate}
            onChange={(e) => handleFieldChange('joiningDate', e.target.value)}
            type="date"
            InputLabelProps={{ shrink: true }}
          />
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}>
          <FormControlLabel
            control={
              <Switch
                checked={formData.offerSent}
                onChange={(e) => handleFieldChange('offerSent', e.target.checked)}
              />
            }
            label="Offer Letter Sent"
            sx={{ fontFamily: 'Rubik, sans-serif' }}
          />
          
          <FormControlLabel
            control={
              <Switch
                checked={formData.offerAccepted}
                onChange={(e) => handleFieldChange('offerAccepted', e.target.checked)}
              />
            }
            label="Offer Accepted"
            sx={{ fontFamily: 'Rubik, sans-serif' }}
          />
        </Box>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Approvals */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" sx={{ mb: 2, fontFamily: 'Rubik, sans-serif', fontWeight: 600 }}>
          Required Approvals
        </Typography>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}>
          <FormControlLabel
            control={
              <Switch
                checked={formData.hrApproval}
                onChange={(e) => handleFieldChange('hrApproval', e.target.checked)}
              />
            }
            label="HR Approval"
            sx={{ fontFamily: 'Rubik, sans-serif' }}
          />
          
          <FormControlLabel
            control={
              <Switch
                checked={formData.clientApproval}
                onChange={(e) => handleFieldChange('clientApproval', e.target.checked)}
              />
            }
            label="Client Approval"
            sx={{ fontFamily: 'Rubik, sans-serif' }}
          />
          
          <FormControlLabel
            control={
              <Switch
                checked={formData.contractSigned}
                onChange={(e) => handleFieldChange('contractSigned', e.target.checked)}
              />
            }
            label="Contract Signed"
            sx={{ fontFamily: 'Rubik, sans-serif' }}
          />
        </Box>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Final Notes */}
      <Box sx={{ mb: 3 }}>
        <TextField
          label="Final Notes"
          value={formData.finalNotes}
          onChange={(e) => handleFieldChange('finalNotes', e.target.value)}
          fullWidth
          multiline
          rows={4}
          placeholder="Final assessment, recommendations, next steps..."
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
          Save Review
        </Button>
        <Button
          variant="outlined"
          startIcon={<Send />}
          sx={{ flex: 1 }}
        >
          Send Offer Letter
        </Button>
      </Box>
    </Box>
  );
};
