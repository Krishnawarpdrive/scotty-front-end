
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
import { Code, Save, VideoCall, Calendar } from '@mui/icons-material';
import { Candidate } from '../../types/CandidateTypes';
import { InterviewSchedulingDrawer } from '../../interview-scheduling/InterviewSchedulingDrawer';
import { InterviewSchedule } from '../../interview-scheduling/InterviewSchedulingService';

interface EnhancedTechnicalInterviewFormProps {
  candidate: Candidate;
}

export const EnhancedTechnicalInterviewForm: React.FC<EnhancedTechnicalInterviewFormProps> = ({
  candidate
}) => {
  const [formData, setFormData] = useState({
    interviewScheduled: false,
    interviewType: 'video',
    outcome: 'pending',
    technicalSkills: ['React', 'Node.js', 'JavaScript'],
    codingChallengeCompleted: false,
    codingScore: '',
    interviewNotes: '',
    duration: '60',
    interviewerName: ''
  });

  const [schedulingDrawerOpen, setSchedulingDrawerOpen] = useState(false);
  const [scheduledInterviews, setScheduledInterviews] = useState<InterviewSchedule[]>([]);

  const handleFieldChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addSkill = (skill: string) => {
    if (skill && !formData.technicalSkills.includes(skill)) {
      setFormData(prev => ({
        ...prev,
        technicalSkills: [...prev.technicalSkills, skill]
      }));
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      technicalSkills: prev.technicalSkills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleScheduleInterview = () => {
    setSchedulingDrawerOpen(true);
  };

  const handleScheduleComplete = (schedule: InterviewSchedule) => {
    setScheduledInterviews(prev => [...prev, schedule]);
    setFormData(prev => ({ ...prev, interviewScheduled: true }));
  };

  return (
    <Box sx={{ p: 3, fontFamily: 'Rubik, sans-serif' }}>
      <Typography variant="h6" sx={{ 
        mb: 3, 
        fontFamily: 'Rubik, sans-serif', 
        fontWeight: 600 
      }}>
        Technical Interview Configuration
      </Typography>

      {/* Scheduled Interviews Section */}
      {scheduledInterviews.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" sx={{ mb: 2, fontFamily: 'Rubik, sans-serif', fontWeight: 600 }}>
            Scheduled Interviews
          </Typography>
          {scheduledInterviews.map((interview, index) => (
            <Box key={interview.id} sx={{ 
              p: 2, 
              border: '1px solid #e5e7eb', 
              borderRadius: 1, 
              mb: 1,
              backgroundColor: '#f9fafb'
            }}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {interview.interview_type} Interview
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {new Date(interview.scheduled_date).toLocaleString()} • {interview.duration_minutes} min
              </Typography>
              {interview.meeting_link && (
                <Typography variant="caption" sx={{ display: 'block', color: 'primary.main' }}>
                  Meeting: {interview.meeting_link}
                </Typography>
              )}
            </Box>
          ))}
        </Box>
      )}

      {/* Interview Scheduling */}
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
              <MenuItem value="video">Video Call</MenuItem>
              <MenuItem value="in-person">In Person</MenuItem>
              <MenuItem value="phone">Phone</MenuItem>
            </Select>
          </FormControl>
          
          <TextField
            label="Duration (minutes)"
            value={formData.duration}
            onChange={(e) => handleFieldChange('duration', e.target.value)}
            type="number"
          />
        </Box>

        <TextField
          label="Interviewer Name"
          value={formData.interviewerName}
          onChange={(e) => handleFieldChange('interviewerName', e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />

        <FormControlLabel
          control={
            <Switch
              checked={formData.interviewScheduled}
              onChange={(e) => handleFieldChange('interviewScheduled', e.target.checked)}
            />
          }
          label="Interview Scheduled"
          sx={{ fontFamily: 'Rubik, sans-serif' }}
        />
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Technical Skills Assessment */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" sx={{ mb: 2, fontFamily: 'Rubik, sans-serif', fontWeight: 600 }}>
          Technical Skills Assessment
        </Typography>
        
        <Box sx={{ mb: 2 }}>
          <Typography variant="caption" sx={{ mb: 1, display: 'block', fontFamily: 'Rubik, sans-serif' }}>
            Skills to Evaluate
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
            {formData.technicalSkills.map((skill, index) => (
              <Chip
                key={index}
                label={skill}
                onDelete={() => removeSkill(skill)}
                color="primary"
                variant="outlined"
                size="small"
              />
            ))}
          </Box>
        </Box>

        <FormControlLabel
          control={
            <Switch
              checked={formData.codingChallengeCompleted}
              onChange={(e) => handleFieldChange('codingChallengeCompleted', e.target.checked)}
            />
          }
          label="Coding Challenge Completed"
          sx={{ fontFamily: 'Rubik, sans-serif', mb: 2 }}
        />

        {formData.codingChallengeCompleted && (
          <TextField
            label="Coding Challenge Score (%)"
            value={formData.codingScore}
            onChange={(e) => handleFieldChange('codingScore', e.target.value)}
            type="number"
            fullWidth
            sx={{ mb: 2 }}
          />
        )}
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Interview Outcome */}
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
            <MenuItem value="strong-pass">Strong Pass</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Interview Notes"
          value={formData.interviewNotes}
          onChange={(e) => handleFieldChange('interviewNotes', e.target.value)}
          fullWidth
          multiline
          rows={4}
          placeholder="Technical competency, problem-solving approach, communication..."
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
          startIcon={<Calendar />}
          onClick={handleScheduleInterview}
          sx={{ flex: 1 }}
        >
          Schedule Interview
        </Button>
      </Box>

      {/* Interview Scheduling Drawer */}
      <InterviewSchedulingDrawer
        open={schedulingDrawerOpen}
        onClose={() => setSchedulingDrawerOpen(false)}
        candidateId={candidate.id.toString()}
        candidateName={candidate.name}
        onScheduleComplete={handleScheduleComplete}
      />
    </Box>
  );
};
