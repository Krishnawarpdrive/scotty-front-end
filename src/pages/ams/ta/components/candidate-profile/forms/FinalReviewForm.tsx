
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
  Divider,
  Card,
  CardContent
} from '@mui/material';
import { Save, CheckCircle, Cancel } from '@mui/icons-material';
import { Candidate } from '../../types/CandidateTypes';

interface FinalReviewFormProps {
  candidate: Candidate;
}

export const FinalReviewForm: React.FC<FinalReviewFormProps> = ({
  candidate
}) => {
  const [formData, setFormData] = useState({
    overallRating: '4',
    finalDecision: 'pending',
    salaryOffered: '',
    joiningDate: '',
    finalComments: '',
    hrApproval: 'pending',
    clientApproval: 'pending'
  });

  const stagesSummary = [
    { name: 'Phone Screening', status: 'completed', score: '8/10' },
    { name: 'Technical Interview', status: 'completed', score: '9/10' },
    { name: 'Client Interview', status: 'completed', score: '8/10' },
    { name: 'Background Verification', status: 'in-progress', score: 'Pending' }
  ];

  const handleFieldChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return '#009933';
      case 'in-progress': return '#f59e0b';
      case 'approved': return '#009933';
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
        Final Review & Decision
      </Typography>

      {/* Interview Summary */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" sx={{ mb: 2, fontFamily: 'Rubik, sans-serif', fontWeight: 600 }}>
          Interview Summary
        </Typography>
        
        <Card variant="outlined" sx={{ mb: 2 }}>
          <CardContent>
            {stagesSummary.map((stage) => (
              <Box key={stage.name} sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                py: 1,
                borderBottom: '1px solid #f0f0f0'
              }}>
                <Typography variant="body2" sx={{ fontFamily: 'Rubik, sans-serif' }}>
                  {stage.name}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Chip 
                    label={stage.status}
                    size="small"
                    sx={{ 
                      bgcolor: stage.status === 'completed' ? '#e8f5e8' : '#fff3cd',
                      color: getStatusColor(stage.status),
                      fontFamily: 'Rubik, sans-serif'
                    }}
                  />
                  <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'Rubik, sans-serif' }}>
                    {stage.score}
                  </Typography>
                </Box>
              </Box>
            ))}
          </CardContent>
        </Card>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Overall Assessment */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" sx={{ mb: 2, fontFamily: 'Rubik, sans-serif', fontWeight: 600 }}>
          Overall Assessment
        </Typography>
        
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Overall Rating</InputLabel>
          <Select
            value={formData.overallRating}
            onChange={(e) => handleFieldChange('overallRating', e.target.value)}
            label="Overall Rating"
          >
            <MenuItem value="5">5 - Excellent</MenuItem>
            <MenuItem value="4">4 - Good</MenuItem>
            <MenuItem value="3">3 - Average</MenuItem>
            <MenuItem value="2">2 - Below Average</MenuItem>
            <MenuItem value="1">1 - Poor</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Final Decision</InputLabel>
          <Select
            value={formData.finalDecision}
            onChange={(e) => handleFieldChange('finalDecision', e.target.value)}
            label="Final Decision"
          >
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="selected">Selected</MenuItem>
            <MenuItem value="rejected">Rejected</MenuItem>
            <MenuItem value="on-hold">On Hold</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Offer Details */}
      {formData.finalDecision === 'selected' && (
        <>
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" sx={{ mb: 2, fontFamily: 'Rubik, sans-serif', fontWeight: 600 }}>
              Offer Details
            </Typography>
            
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
              <TextField
                label="Salary Offered (₹)"
                value={formData.salaryOffered}
                onChange={(e) => handleFieldChange('salaryOffered', e.target.value)}
                placeholder="8,00,000"
              />
              <TextField
                label="Expected Joining Date"
                type="date"
                value={formData.joiningDate}
                onChange={(e) => handleFieldChange('joiningDate', e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Box>
          </Box>

          <Divider sx={{ my: 3 }} />
        </>
      )}

      {/* Approvals */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" sx={{ mb: 2, fontFamily: 'Rubik, sans-serif', fontWeight: 600 }}>
          Approvals Required
        </Typography>
        
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
          <FormControl fullWidth>
            <InputLabel>HR Approval</InputLabel>
            <Select
              value={formData.hrApproval}
              onChange={(e) => handleFieldChange('hrApproval', e.target.value)}
              label="HR Approval"
            >
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="approved">Approved</MenuItem>
              <MenuItem value="rejected">Rejected</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Client Approval</InputLabel>
            <Select
              value={formData.clientApproval}
              onChange={(e) => handleFieldChange('clientApproval', e.target.value)}
              label="Client Approval"
            >
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="approved">Approved</MenuItem>
              <MenuItem value="rejected">Rejected</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Final Comments */}
      <Box sx={{ mb: 3 }}>
        <TextField
          label="Final Comments"
          value={formData.finalComments}
          onChange={(e) => handleFieldChange('finalComments', e.target.value)}
          fullWidth
          multiline
          rows={4}
          placeholder="Add final comments about the candidate..."
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
        {formData.finalDecision === 'selected' && (
          <Button
            variant="contained"
            startIcon={<CheckCircle />}
            sx={{ 
              bgcolor: '#009933', 
              '&:hover': { bgcolor: '#00a341' },
              flex: 1
            }}
          >
            Send Offer
          </Button>
        )}
        {formData.finalDecision === 'rejected' && (
          <Button
            variant="outlined"
            startIcon={<Cancel />}
            color="error"
            sx={{ flex: 1 }}
          >
            Send Rejection
          </Button>
        )}
      </Box>
    </Box>
  );
};
