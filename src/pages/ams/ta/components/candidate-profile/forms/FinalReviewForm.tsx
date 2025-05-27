
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
  Rating,
  Card,
  CardContent
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
    overallDecision: 'pending',
    overallRating: 4,
    technicalRating: 4,
    culturalRating: 4,
    communicationRating: 4,
    finalRemarks: '',
    salaryNegotiation: false,
    finalSalary: '',
    joiningDate: '',
    offerLetterSent: false,
    reviewerName: 'HR Team',
    clientApproval: false,
    nextSteps: ''
  });

  const handleFieldChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const stageSummary = [
    { stage: 'Phone Screening', status: 'Completed', score: '4.2/5' },
    { stage: 'Technical Interview', status: 'Completed', score: '4.0/5' },
    { stage: 'Client Interview', status: 'Completed', score: '4.5/5' },
    { stage: 'Background Verification', status: 'Completed', score: 'Verified' }
  ];

  return (
    <Box sx={{ p: 3, fontFamily: 'Rubik, sans-serif' }}>
      <Typography variant="h6" sx={{ 
        mb: 3, 
        fontFamily: 'Rubik, sans-serif', 
        fontWeight: 600 
      }}>
        Final Review & Decision
      </Typography>

      {/* Stage Summary */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" sx={{ mb: 2, fontFamily: 'Rubik, sans-serif', fontWeight: 600 }}>
          Interview Journey Summary
        </Typography>
        
        <Card sx={{ mb: 3 }}>
          <CardContent>
            {stageSummary.map((stage, index) => (
              <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography sx={{ fontFamily: 'Rubik, sans-serif', fontSize: '14px' }}>
                  {stage.stage}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Typography sx={{ fontFamily: 'Rubik, sans-serif', fontSize: '12px', color: '#666' }}>
                    {stage.score}
                  </Typography>
                  <Typography sx={{ 
                    fontFamily: 'Rubik, sans-serif', 
                    fontSize: '12px', 
                    color: stage.status === 'Completed' ? '#009933' : '#666',
                    fontWeight: 500
                  }}>
                    {stage.status}
                  </Typography>
                </Box>
              </Box>
            ))}
          </CardContent>
        </Card>
      </Box>

      {/* Overall Assessment */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" sx={{ mb: 2, fontFamily: 'Rubik, sans-serif', fontWeight: 600 }}>
          Overall Assessment
        </Typography>
        
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3, mb: 3 }}>
          <Box>
            <Typography sx={{ mb: 1, fontFamily: 'Rubik, sans-serif', fontSize: '14px' }}>
              Technical Skills
            </Typography>
            <Rating
              value={formData.technicalRating}
              onChange={(_, value) => handleFieldChange('technicalRating', value)}
              size="large"
            />
          </Box>
          
          <Box>
            <Typography sx={{ mb: 1, fontFamily: 'Rubik, sans-serif', fontSize: '14px' }}>
              Cultural Fit
            </Typography>
            <Rating
              value={formData.culturalRating}
              onChange={(_, value) => handleFieldChange('culturalRating', value)}
              size="large"
            />
          </Box>
          
          <Box>
            <Typography sx={{ mb: 1, fontFamily: 'Rubik, sans-serif', fontSize: '14px' }}>
              Communication
            </Typography>
            <Rating
              value={formData.communicationRating}
              onChange={(_, value) => handleFieldChange('communicationRating', value)}
              size="large"
            />
          </Box>
          
          <Box>
            <Typography sx={{ mb: 1, fontFamily: 'Rubik, sans-serif', fontSize: '14px' }}>
              Overall Rating
            </Typography>
            <Rating
              value={formData.overallRating}
              onChange={(_, value) => handleFieldChange('overallRating', value)}
              size="large"
            />
          </Box>
        </Box>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Final Decision */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" sx={{ mb: 2, fontFamily: 'Rubik, sans-serif', fontWeight: 600 }}>
          Final Decision
        </Typography>
        
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Overall Decision</InputLabel>
          <Select
            value={formData.overallDecision}
            onChange={(e) => handleFieldChange('overallDecision', e.target.value)}
            label="Overall Decision"
          >
            <MenuItem value="pending">Pending Review</MenuItem>
            <MenuItem value="hire">Hire</MenuItem>
            <MenuItem value="reject">Reject</MenuItem>
            <MenuItem value="hold">Put on Hold</MenuItem>
            <MenuItem value="reconsider">Needs Reconsideration</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Final Remarks"
          value={formData.finalRemarks}
          onChange={(e) => handleFieldChange('finalRemarks', e.target.value)}
          fullWidth
          multiline
          rows={4}
          placeholder="Summary of candidate's performance, strengths, areas of concern, and recommendation..."
          sx={{ mb: 2 }}
        />
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Offer Details */}
      {formData.overallDecision === 'hire' && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" sx={{ mb: 2, fontFamily: 'Rubik, sans-serif', fontWeight: 600 }}>
            Offer Details
          </Typography>
          
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 2 }}>
            <TextField
              label="Final Salary Package"
              value={formData.finalSalary}
              onChange={(e) => handleFieldChange('finalSalary', e.target.value)}
              placeholder="e.g., ₹85,000 per month"
            />
            <TextField
              label="Expected Joining Date"
              type="date"
              value={formData.joiningDate}
              onChange={(e) => handleFieldChange('joiningDate', e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Box>

          <FormControlLabel
            control={
              <Switch
                checked={formData.clientApproval}
                onChange={(e) => handleFieldChange('clientApproval', e.target.checked)}
              />
            }
            label="Client Approval Received"
            sx={{ fontFamily: 'Rubik, sans-serif', mb: 1 }}
          />

          <FormControlLabel
            control={
              <Switch
                checked={formData.offerLetterSent}
                onChange={(e) => handleFieldChange('offerLetterSent', e.target.checked)}
              />
            }
            label="Offer Letter Sent"
            sx={{ fontFamily: 'Rubik, sans-serif' }}
          />
        </Box>
      )}

      {/* Next Steps */}
      <Box sx={{ mb: 3 }}>
        <TextField
          label="Next Steps"
          value={formData.nextSteps}
          onChange={(e) => handleFieldChange('nextSteps', e.target.value)}
          fullWidth
          multiline
          rows={2}
          placeholder="Follow-up actions, documentation required, etc..."
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
        {formData.overallDecision === 'hire' && (
          <Button
            variant="contained"
            startIcon={<Send />}
            sx={{ 
              bgcolor: '#2196f3', 
              '&:hover': { bgcolor: '#1976d2' },
              flex: 1
            }}
          >
            Send Offer Letter
          </Button>
        )}
      </Box>
    </Box>
  );
};
