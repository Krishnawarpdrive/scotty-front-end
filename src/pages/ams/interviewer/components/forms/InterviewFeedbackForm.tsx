
import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, TextField, Rating, Button, Chip } from '@mui/material';
import { Save, Send } from '@mui/icons-material';
import { Interview } from '../../MyInterviewsPage';

interface InterviewFeedbackFormProps {
  interview: Interview;
}

export const InterviewFeedbackForm: React.FC<InterviewFeedbackFormProps> = ({
  interview
}) => {
  const [feedback, setFeedback] = useState({
    overallRating: interview.rating || 0,
    technicalSkills: 0,
    communication: 0,
    problemSolving: 0,
    culturalFit: 0,
    recommendation: '',
    strengths: '',
    areasForImprovement: '',
    additionalComments: ''
  });

  const handleSave = () => {
    console.log('Saving feedback:', feedback);
    // Implement save logic
  };

  const handleSubmit = () => {
    console.log('Submitting feedback:', feedback);
    // Implement submit logic
  };

  return (
    <Box sx={{ p: 3, fontFamily: 'Rubik, sans-serif' }}>
      <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
        Interview Feedback
      </Typography>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold' }}>
            Rating Categories
          </Typography>
          
          <Box sx={{ display: 'grid', gap: 3 }}>
            <Box>
              <Typography variant="body2" sx={{ mb: 1 }}>Overall Rating</Typography>
              <Rating
                value={feedback.overallRating}
                onChange={(_, value) => setFeedback(prev => ({ ...prev, overallRating: value || 0 }))}
                size="large"
              />
            </Box>
            
            <Box>
              <Typography variant="body2" sx={{ mb: 1 }}>Technical Skills</Typography>
              <Rating
                value={feedback.technicalSkills}
                onChange={(_, value) => setFeedback(prev => ({ ...prev, technicalSkills: value || 0 }))}
              />
            </Box>
            
            <Box>
              <Typography variant="body2" sx={{ mb: 1 }}>Communication</Typography>
              <Rating
                value={feedback.communication}
                onChange={(_, value) => setFeedback(prev => ({ ...prev, communication: value || 0 }))}
              />
            </Box>
            
            <Box>
              <Typography variant="body2" sx={{ mb: 1 }}>Problem Solving</Typography>
              <Rating
                value={feedback.problemSolving}
                onChange={(_, value) => setFeedback(prev => ({ ...prev, problemSolving: value || 0 }))}
              />
            </Box>
            
            <Box>
              <Typography variant="body2" sx={{ mb: 1 }}>Cultural Fit</Typography>
              <Rating
                value={feedback.culturalFit}
                onChange={(_, value) => setFeedback(prev => ({ ...prev, culturalFit: value || 0 }))}
              />
            </Box>
          </Box>
        </CardContent>
      </Card>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold' }}>
            Detailed Feedback
          </Typography>
          
          <Box sx={{ display: 'grid', gap: 2 }}>
            <TextField
              label="Strengths"
              multiline
              rows={3}
              value={feedback.strengths}
              onChange={(e) => setFeedback(prev => ({ ...prev, strengths: e.target.value }))}
              fullWidth
            />
            
            <TextField
              label="Areas for Improvement"
              multiline
              rows={3}
              value={feedback.areasForImprovement}
              onChange={(e) => setFeedback(prev => ({ ...prev, areasForImprovement: e.target.value }))}
              fullWidth
            />
            
            <TextField
              label="Additional Comments"
              multiline
              rows={4}
              value={feedback.additionalComments}
              onChange={(e) => setFeedback(prev => ({ ...prev, additionalComments: e.target.value }))}
              fullWidth
            />
          </Box>
        </CardContent>
      </Card>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold' }}>
            Recommendation
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {['Strong Hire', 'Hire', 'No Hire', 'Strong No Hire'].map((rec) => (
              <Chip
                key={rec}
                label={rec}
                onClick={() => setFeedback(prev => ({ ...prev, recommendation: rec }))}
                color={feedback.recommendation === rec ? 'primary' : 'default'}
                variant={feedback.recommendation === rec ? 'filled' : 'outlined'}
              />
            ))}
          </Box>
        </CardContent>
      </Card>

      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button
          variant="outlined"
          startIcon={<Save />}
          onClick={handleSave}
        >
          Save Draft
        </Button>
        <Button
          variant="contained"
          startIcon={<Send />}
          onClick={handleSubmit}
        >
          Submit Feedback
        </Button>
      </Box>
    </Box>
  );
};
