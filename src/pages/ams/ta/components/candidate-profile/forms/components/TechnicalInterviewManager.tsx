
import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Button, 
  Grid,
  Chip,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Rating,
  Divider
} from '@mui/material';
import { 
  VideoCall, 
  Schedule, 
  Assessment, 
  Person,
  StarBorder,
  Star,
  Save
} from '@mui/icons-material';
import { Candidate } from '../../../types/CandidateTypes';

interface TechnicalInterviewManagerProps {
  candidate: Candidate;
}

export const TechnicalInterviewManager: React.FC<TechnicalInterviewManagerProps> = ({
  candidate
}) => {
  const [feedbackDialog, setFeedbackDialog] = useState(false);
  const [feedback, setFeedback] = useState({
    technical_score: 0,
    communication_score: 0,
    problem_solving_score: 0,
    overall_rating: 0,
    strengths: '',
    areas_for_improvement: '',
    recommendation: 'pending',
    detailed_feedback: ''
  });

  const handleSaveFeedback = () => {
    console.log('Saving feedback:', feedback);
    setFeedbackDialog(false);
    // Here you would typically save to the database
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ mb: 3, fontFamily: 'Rubik, sans-serif', fontWeight: 600 }}>
        Technical Interview Management
      </Typography>

      {/* Interview Status */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" sx={{ mb: 2 }}>Interview Status</Typography>
              <Chip label="Scheduled" color="warning" sx={{ mb: 2 }} />
              
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Interview Type:</strong> Technical Round
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Scheduled Date:</strong> Jan 25, 2024 at 3:00 PM
              </Typography>
              <Typography variant="body2">
                <strong>Interviewer:</strong> John Smith (Senior Engineer)
              </Typography>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', gap: 1, flexDirection: 'column' }}>
                <Button
                  variant="contained"
                  startIcon={<VideoCall />}
                  fullWidth
                  sx={{ mb: 1 }}
                >
                  Join Interview
                </Button>
                
                <Button
                  variant="outlined"
                  startIcon={<Schedule />}
                  fullWidth
                  sx={{ mb: 1 }}
                >
                  Reschedule
                </Button>
                
                <Button
                  variant="outlined"
                  startIcon={<Assessment />}
                  fullWidth
                  onClick={() => setFeedbackDialog(true)}
                >
                  Submit Feedback
                </Button>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Interview Template */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="subtitle2" sx={{ mb: 2 }}>Interview Template</Typography>
          
          <Alert severity="info" sx={{ mb: 2 }}>
            This interview is based on the "Senior Frontend Developer" template
          </Alert>
          
          <Typography variant="body2" sx={{ mb: 2 }}>
            <strong>Duration:</strong> 60 minutes
          </Typography>
          
          <Typography variant="body2" sx={{ mb: 2 }}>
            <strong>Focus Areas:</strong>
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
            <Chip label="React" size="small" />
            <Chip label="TypeScript" size="small" />
            <Chip label="System Design" size="small" />
            <Chip label="Problem Solving" size="small" />
          </Box>
          
          <Typography variant="body2" sx={{ mb: 1 }}>
            <strong>Key Questions:</strong>
          </Typography>
          <Typography variant="body2" component="div">
            <ul>
              <li>Explain React component lifecycle</li>
              <li>Design a scalable frontend architecture</li>
              <li>Code review: Optimize this React component</li>
              <li>Behavioral: Tell me about a challenging technical problem</li>
            </ul>
          </Typography>
        </CardContent>
      </Card>

      {/* Previous Interviews */}
      <Card>
        <CardContent>
          <Typography variant="subtitle2" sx={{ mb: 2 }}>Interview History</Typography>
          
          <Alert severity="info">
            No previous technical interviews found for this candidate.
          </Alert>
        </CardContent>
      </Card>

      {/* Feedback Dialog */}
      <Dialog open={feedbackDialog} onClose={() => setFeedbackDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Technical Interview Feedback</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            {/* Rating Scores */}
            <Typography variant="subtitle2" sx={{ mb: 2 }}>Performance Ratings</Typography>
            
            <Grid container spacing={3} sx={{ mb: 3 }}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" sx={{ mb: 1 }}>Technical Skills</Typography>
                <Rating
                  value={feedback.technical_score}
                  onChange={(_, value) => setFeedback(prev => ({ ...prev, technical_score: value || 0 }))}
                  max={5}
                  icon={<Star />}
                  emptyIcon={<StarBorder />}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" sx={{ mb: 1 }}>Communication</Typography>
                <Rating
                  value={feedback.communication_score}
                  onChange={(_, value) => setFeedback(prev => ({ ...prev, communication_score: value || 0 }))}
                  max={5}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" sx={{ mb: 1 }}>Problem Solving</Typography>
                <Rating
                  value={feedback.problem_solving_score}
                  onChange={(_, value) => setFeedback(prev => ({ ...prev, problem_solving_score: value || 0 }))}
                  max={5}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" sx={{ mb: 1 }}>Overall Rating</Typography>
                <Rating
                  value={feedback.overall_rating}
                  onChange={(_, value) => setFeedback(prev => ({ ...prev, overall_rating: value || 0 }))}
                  max={5}
                />
              </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />

            {/* Text Feedback */}
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Key Strengths"
                  value={feedback.strengths}
                  onChange={(e) => setFeedback(prev => ({ ...prev, strengths: e.target.value }))}
                  fullWidth
                  multiline
                  rows={2}
                  sx={{ mb: 2 }}
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  label="Areas for Improvement"
                  value={feedback.areas_for_improvement}
                  onChange={(e) => setFeedback(prev => ({ ...prev, areas_for_improvement: e.target.value }))}
                  fullWidth
                  multiline
                  rows={2}
                  sx={{ mb: 2 }}
                />
              </Grid>
              
              <Grid item xs={12}>
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Recommendation</InputLabel>
                  <Select
                    value={feedback.recommendation}
                    onChange={(e) => setFeedback(prev => ({ ...prev, recommendation: e.target.value }))}
                    label="Recommendation"
                  >
                    <MenuItem value="strongly_recommend">Strongly Recommend</MenuItem>
                    <MenuItem value="recommend">Recommend</MenuItem>
                    <MenuItem value="neutral">Neutral</MenuItem>
                    <MenuItem value="not_recommend">Do Not Recommend</MenuItem>
                    <MenuItem value="strongly_not_recommend">Strongly Do Not Recommend</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  label="Detailed Feedback"
                  value={feedback.detailed_feedback}
                  onChange={(e) => setFeedback(prev => ({ ...prev, detailed_feedback: e.target.value }))}
                  fullWidth
                  multiline
                  rows={4}
                  placeholder="Provide detailed feedback about the candidate's performance, specific examples, and any additional observations..."
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setFeedbackDialog(false)}>Cancel</Button>
          <Button 
            onClick={handleSaveFeedback}
            variant="contained"
            startIcon={<Save />}
          >
            Save Feedback
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
