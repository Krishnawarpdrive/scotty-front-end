
import React from 'react';
import { Box, Typography, Paper, Chip, LinearProgress, Alert } from '@mui/material';
import { Psychology, TrendingUp, Warning, Help, Lightbulb } from '@mui/icons-material';
import { AIInsight } from '../AIAssistantService';

interface AIInsightsPanelProps {
  insights: AIInsight[];
  isLoading: boolean;
}

export const AIInsightsPanel: React.FC<AIInsightsPanelProps> = ({
  insights,
  isLoading
}) => {
  const getInsightIcon = (type: AIInsight['type']) => {
    switch (type) {
      case 'strength':
        return <TrendingUp sx={{ color: '#4caf50' }} />;
      case 'concern':
        return <Warning sx={{ color: '#f44336' }} />;
      case 'question':
        return <Help sx={{ color: '#2196f3' }} />;
      case 'recommendation':
        return <Lightbulb sx={{ color: '#ff9800' }} />;
      default:
        return <Psychology sx={{ color: '#9c27b0' }} />;
    }
  };

  const getInsightColor = (type: AIInsight['type']) => {
    switch (type) {
      case 'strength':
        return 'success';
      case 'concern':
        return 'error';
      case 'question':
        return 'info';
      case 'recommendation':
        return 'warning';
      default:
        return 'default';
    }
  };

  if (!isLoading && insights.length === 0) {
    return null;
  }

  return (
    <Paper sx={{ p: 3, backgroundColor: '#f3e5f5' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <Psychology sx={{ color: '#9c27b0', fontSize: 24 }} />
        <Typography variant="h6" fontWeight="bold">
          AI Insights & Analysis
        </Typography>
      </Box>

      {isLoading && (
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            AI is analyzing candidate profile and generating insights...
          </Typography>
          <LinearProgress />
        </Box>
      )}

      {insights.map((insight, index) => (
        <Alert 
          key={index}
          severity={getInsightColor(insight.type) as any}
          icon={getInsightIcon(insight.type)}
          sx={{ mb: 2 }}
        >
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography variant="subtitle2" fontWeight="bold">
                {insight.title}
              </Typography>
              <Chip 
                label={insight.priority}
                size="small"
                color={insight.priority === 'high' ? 'error' : insight.priority === 'medium' ? 'warning' : 'default'}
                variant="outlined"
              />
            </Box>
            <Typography variant="body2">
              {insight.description}
            </Typography>
            <Chip 
              label={insight.category}
              size="small"
              variant="outlined"
              sx={{ mt: 1 }}
            />
          </Box>
        </Alert>
      ))}
    </Paper>
  );
};
