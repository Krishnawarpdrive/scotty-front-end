
import React from 'react';
import { Box, Typography, Chip, LinearProgress, Paper, Divider } from '@mui/material';
import { CheckCircle, Cancel, Psychology, TrendingUp } from '@mui/icons-material';
import { SkillGapAnalysis as SkillGapAnalysisType } from '../AIAssistantService';

interface SkillGapAnalysisProps {
  analysis: SkillGapAnalysisType | null;
  isLoading?: boolean;
}

export const SkillGapAnalysis: React.FC<SkillGapAnalysisProps> = ({
  analysis,
  isLoading = false
}) => {
  if (isLoading) {
    return (
      <Paper sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          Analyzing skill alignment...
        </Typography>
        <LinearProgress sx={{ mt: 2 }} />
      </Paper>
    );
  }

  if (!analysis) {
    return (
      <Paper sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          Complete candidate skills to see gap analysis
        </Typography>
      </Paper>
    );
  }

  const getMatchColor = (percentage: number) => {
    if (percentage >= 80) return '#4caf50';
    if (percentage >= 60) return '#ff9800';
    return '#f44336';
  };

  return (
    <Paper sx={{ p: 3, backgroundColor: '#fafafa' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <Psychology sx={{ color: '#1976d2', fontSize: 24 }} />
        <Typography variant="h6" fontWeight="bold">
          Skill Gap Analysis
        </Typography>
      </Box>

      {/* Overall Match Score */}
      <Box sx={{ mb: 3, textAlign: 'center' }}>
        <Typography variant="h3" fontWeight="bold" sx={{ color: getMatchColor(analysis.overallMatch) }}>
          {analysis.overallMatch}%
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Overall Skill Match
        </Typography>
        <LinearProgress
          variant="determinate"
          value={analysis.overallMatch}
          sx={{
            mt: 1,
            height: 8,
            borderRadius: 4,
            backgroundColor: '#e0e0e0',
            '& .MuiLinearProgress-bar': {
              backgroundColor: getMatchColor(analysis.overallMatch),
              borderRadius: 4
            }
          }}
        />
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Matching Skills */}
      {analysis.matchingSkills.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <CheckCircle sx={{ color: '#4caf50', fontSize: 20 }} />
            <Typography variant="subtitle2" fontWeight="bold">
              Matching Skills ({analysis.matchingSkills.length})
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {analysis.matchingSkills.map((skill, index) => (
              <Chip
                key={index}
                label={skill}
                size="small"
                color="success"
                variant="outlined"
                icon={<CheckCircle />}
              />
            ))}
          </Box>
        </Box>
      )}

      {/* Missing Skills */}
      {analysis.missingSkills.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <Cancel sx={{ color: '#f44336', fontSize: 20 }} />
            <Typography variant="subtitle2" fontWeight="bold">
              Skills to Explore ({analysis.missingSkills.length})
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {analysis.missingSkills.map((skill, index) => (
              <Chip
                key={index}
                label={skill}
                size="small"
                color="error"
                variant="outlined"
                icon={<Cancel />}
              />
            ))}
          </Box>
        </Box>
      )}

      {/* Strength Areas */}
      {analysis.strengthAreas.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <TrendingUp sx={{ color: '#1976d2', fontSize: 20 }} />
            <Typography variant="subtitle2" fontWeight="bold">
              Key Strengths
            </Typography>
          </Box>
          <Box sx={{ backgroundColor: '#e3f2fd', p: 2, borderRadius: 2 }}>
            {analysis.strengthAreas.map((strength, index) => (
              <Typography key={index} variant="body2" sx={{ mb: 0.5 }}>
                • {strength}
              </Typography>
            ))}
          </Box>
        </Box>
      )}

      {/* Recommended Questions */}
      {analysis.recommendedQuestions.length > 0 && (
        <Box>
          <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 2 }}>
            Recommended Interview Questions
          </Typography>
          <Box sx={{ backgroundColor: '#fff3e0', p: 2, borderRadius: 2 }}>
            {analysis.recommendedQuestions.map((question, index) => (
              <Typography key={index} variant="body2" sx={{ mb: 1 }}>
                {index + 1}. {question}
              </Typography>
            ))}
          </Box>
        </Box>
      )}
    </Paper>
  );
};
