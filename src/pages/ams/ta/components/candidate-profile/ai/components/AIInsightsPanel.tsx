
import React from 'react';
import { Box, Typography, Chip, Alert, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { ExpandMore, Lightbulb, Warning, CheckCircle, HelpOutline } from '@mui/icons-material';
import { AIInsight } from '../AIAssistantService';

interface AIInsightsPanelProps {
  insights: AIInsight[];
  isLoading?: boolean;
}

export const AIInsightsPanel: React.FC<AIInsightsPanelProps> = ({
  insights,
  isLoading = false
}) => {
  if (isLoading) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Analyzing candidate profile...
        </Typography>
      </Box>
    );
  }

  if (insights.length === 0) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography variant="body2" color="text.secondary">
          No insights available yet. Complete more form fields to get AI recommendations.
        </Typography>
      </Box>
    );
  }

  const getInsightIcon = (type: AIInsight['type']) => {
    switch (type) {
      case 'strength':
        return <CheckCircle sx={{ color: '#4caf50', fontSize: 18 }} />;
      case 'concern':
        return <Warning sx={{ color: '#ff9800', fontSize: 18 }} />;
      case 'question':
        return <HelpOutline sx={{ color: '#2196f3', fontSize: 18 }} />;
      case 'recommendation':
        return <Lightbulb sx={{ color: '#9c27b0', fontSize: 18 }} />;
      default:
        return <Lightbulb sx={{ color: '#757575', fontSize: 18 }} />;
    }
  };

  const getInsightColor = (type: AIInsight['type']) => {
    switch (type) {
      case 'strength':
        return 'success';
      case 'concern':
        return 'warning';
      case 'question':
        return 'info';
      case 'recommendation':
        return 'secondary';
      default:
        return 'default';
    }
  };

  const groupedInsights = insights.reduce((acc, insight) => {
    if (!acc[insight.category]) {
      acc[insight.category] = [];
    }
    acc[insight.category].push(insight);
    return acc;
  }, {} as Record<string, AIInsight[]>);

  return (
    <Box sx={{ backgroundColor: '#f8f9fa', borderRadius: 2, overflow: 'hidden' }}>
      <Box sx={{ 
        p: 2, 
        backgroundColor: '#e3f2fd', 
        borderBottom: '1px solid #e0e0e0',
        display: 'flex',
        alignItems: 'center',
        gap: 1
      }}>
        <Lightbulb sx={{ color: '#1976d2', fontSize: 20 }} />
        <Typography variant="subtitle2" fontWeight="bold" color="#1976d2">
          AI Insights & Recommendations
        </Typography>
        <Chip 
          label={`${insights.length} insights`} 
          size="small" 
          color="primary" 
          variant="outlined"
        />
      </Box>

      <Box sx={{ maxHeight: 400, overflow: 'auto' }}>
        {Object.entries(groupedInsights).map(([category, categoryInsights]) => (
          <Accordion key={category} defaultExpanded sx={{ boxShadow: 'none' }}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography variant="subtitle2" textTransform="capitalize" fontWeight="medium">
                {category} ({categoryInsights.length})
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ pt: 0 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {categoryInsights.map((insight, index) => (
                  <Alert
                    key={index}
                    severity={getInsightColor(insight.type) as any}
                    icon={getInsightIcon(insight.type)}
                    sx={{ 
                      '& .MuiAlert-message': { 
                        width: '100%' 
                      },
                      fontSize: '0.875rem'
                    }}
                  >
                    <Box>
                      <Typography variant="subtitle2" fontWeight="medium" sx={{ mb: 0.5 }}>
                        {insight.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {insight.description}
                      </Typography>
                      <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
                        <Chip
                          label={insight.priority}
                          size="small"
                          color={insight.priority === 'high' ? 'error' : insight.priority === 'medium' ? 'warning' : 'default'}
                          variant="outlined"
                        />
                        <Chip
                          label={insight.type}
                          size="small"
                          variant="filled"
                          sx={{ textTransform: 'capitalize' }}
                        />
                      </Box>
                    </Box>
                  </Alert>
                ))}
              </Box>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Box>
  );
};
