
import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  TextField, 
  Button,
  Rating,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip
} from '@mui/material';
import { Star, Save } from '@mui/icons-material';
import { Interview } from '../../MyInterviewsPage';

interface InterviewFeedbackFormProps {
  interview: Interview;
}

export const InterviewFeedbackForm: React.FC<InterviewFeedbackFormProps> = ({
  interview
}) => {
  const [overallRating, setOverallRating] = useState<number>(interview.rating || 0);
  const [recommendation, setRecommendation] = useState<string>('proceed');
  const [feedback, setFeedback] = useState<string>(interview.feedback || '');
  const [technicalSkills, setTechnicalSkills] = useState<number>(0);
  const [communication, setCommunication] = useState<number>(0);
  const [problemSolving, setProblemSolving] = useState<number>(0);

  const handleSaveFeedback = () => {
    console.log('Saving feedback:', {
      overallRating,
      recommendation,
      feedback,
      technicalSkills,
      communication,
      problemSolving
    });
  };

  const getRecommendationColor = (rec: string) => {
    switch (rec) {
      case 'proceed':
        return { bgcolor: '#e8f5e8', color: '#2e7d32' };
      case 'hold':
        return { bgcolor: '#fff3e0', color: '#f57c00' };
      case 'reject':
        return { bgcolor: '#ffebee', color: '#d32f2f' };
      default:
        return { bgcolor: '#f5f5f5', color: '#666' };
    }
  };

  if (interview.status === 'completed' && interview.feedback) {
    return (
      <Box sx={{ p: 3, fontFamily: 'Rubik, sans-serif' }}>
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold', fontFamily: 'Rubik, sans-serif' }}>
          Interview Feedback (Submitted)
        </Typography>

        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <Typography variant="subtitle1" fontWeight="bold">Overall Rating:</Typography>
              <Rating value={interview.rating || 0} readOnly />
              <Typography variant="body2">({interview.rating}/5)</Typography>
            </Box>

            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold' }}>
              Feedback
            </Typography>
            <Box sx={{ bgcolor: '#f5f5f5', p: 2, borderRadius: 1 }}>
              <Typography variant="body2">{interview.feedback}</Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, fontFamily: 'Rubik, sans-serif' }}>
      <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold', fontFamily: 'Rubik, sans-serif' }}>
        Interview Feedback
      </Typography>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold' }}>
            Overall Assessment
          </Typography>
          
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Overall Rating
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Rating 
                value={overallRating} 
                onChange={(event, newValue) => setOverallRating(newValue || 0)}
                icon={<Star fontSize="inherit" />}
              />
              <Typography variant="body2">({overallRating}/5)</Typography>
            </Box>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Recommendation
            </Typography>
            <FormControl size="small" sx={{ minWidth: 200 }}>
              <Select
                value={recommendation}
                onChange={(e) => setRecommendation(e.target.value)}
              >
                <MenuItem value="proceed">Proceed to Next Round</MenuItem>
                <MenuItem value="hold">Hold for Review</MenuItem>
                <MenuItem value="reject">Do Not Proceed</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </CardContent>
      </Card>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold' }}>
            Skill Assessment
          </Typography>
          
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr', gap: 2 }}>
            <Box>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Technical Skills
              </Typography>
              <Rating 
                value={technicalSkills} 
                onChange={(event, newValue) => setTechnicalSkills(newValue || 0)}
              />
            </Box>
            
            <Box>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Communication
              </Typography>
              <Rating 
                value={communication} 
                onChange={(event, newValue) => setCommunication(newValue || 0)}
              />
            </Box>
            
            <Box>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Problem Solving
              </Typography>
              <Rating 
                value={problemSolving} 
                onChange={(event, newValue) => setProblemSolving(newValue || 0)}
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
          <TextField
            multiline
            rows={6}
            fullWidth
            placeholder="Provide detailed feedback about the candidate's performance, strengths, areas for improvement, and any other relevant observations..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            variant="outlined"
          />
        </CardContent>
      </Card>

      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button
          variant="contained"
          startIcon={<Save />}
          onClick={handleSaveFeedback}
          sx={{ bgcolor: '#1976d2' }}
        >
          Save Feedback
        </Button>
        <Button variant="outlined">
          Save as Draft
        </Button>
      </Box>
    </Box>
  );
};
