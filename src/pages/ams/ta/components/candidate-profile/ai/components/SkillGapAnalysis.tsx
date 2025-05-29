
import React from 'react';
import { Box, Typography, Paper, LinearProgress, Chip, List, ListItem, ListItemText } from '@mui/material';
import { Assessment, CheckCircle, Cancel, Help } from '@mui/icons-material';
import { SkillGapAnalysis as SkillGapAnalysisType } from '../AIAssistantService';

interface SkillGapAnalysisProps {
  analysis: SkillGapAnalysisType | null;
  isLoading: boolean;
}

export const SkillGapAnalysis: React.FC<SkillGapAnalysisProps> = ({
  analysis,
  isLoading
}) => {
  if (!isLoading && !analysis) {
    return (
      <Paper sx={{ p: 3, backgroundColor: '#f5f5f5' }}>
        <Typography variant="body2" color="text.secondary" textAlign="center">
          No skill gap analysis available. Please ensure candidate has skills listed and role requirements are defined.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper sx={{ p: 3, backgroundColor: '#e8f5e8' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <Assessment sx={{ color: '#4caf50', fontSize: 24 }} />
        <Typography variant="h6" fontWeight="bold">
          Skill Gap Analysis
        </Typography>
      </Box>

      {isLoading && (
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            AI is analyzing skill alignment with role requirements...
          </Typography>
          <LinearProgress />
        </Box>
      )}

      {analysis && (
        <Box>
          {/* Overall Match Score */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Overall Skill Match: {analysis.overallMatch}%
            </Typography>
            <LinearProgress 
              variant="determinate" 
              value={analysis.overallMatch} 
              sx={{ height: 8, borderRadius: 4 }}
              color={analysis.overallMatch >= 80 ? 'success' : analysis.overallMatch >= 60 ? 'warning' : 'error'}
            />
          </Box>

          {/* Matching Skills */}
          {analysis.matchingSkills.length > 0 && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                <CheckCircle sx={{ color: '#4caf50', fontSize: 18 }} />
                Matching Skills ({analysis.matchingSkills.length})
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {analysis.matchingSkills.map((skill, index) => (
                  <Chip 
                    key={index}
                    label={skill}
                    color="success"
                    size="small"
                    variant="outlined"
                  />
                ))}
              </Box>
            </Box>
          )}

          {/* Missing Skills */}
          {analysis.missingSkills.length > 0 && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                <Cancel sx={{ color: '#f44336', fontSize: 18 }} />
                Missing Skills ({analysis.missingSkills.length})
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {analysis.missingSkills.map((skill, index) => (
                  <Chip 
                    key={index}
                    label={skill}
                    color="error"
                    size="small"
                    variant="outlined"
                  />
                ))}
              </Box>
            </Box>
          )}

          {/* Recommended Questions */}
          {analysis.recommendedQuestions.length > 0 && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                <Help sx={{ color: '#2196f3', fontSize: 18 }} />
                Recommended Interview Questions
              </Typography>
              <List dense>
                {analysis.recommendedQuestions.slice(0, 3).map((question, index) => (
                  <ListItem key={index} sx={{ py: 0.5 }}>
                    <ListItemText 
                      primary={question}
                      primaryTypographyProps={{ variant: 'body2' }}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          )}
        </Box>
      )}
    </Paper>
  );
};
