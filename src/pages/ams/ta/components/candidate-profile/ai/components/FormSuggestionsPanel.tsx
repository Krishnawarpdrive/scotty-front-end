
import React from 'react';
import { Box, Typography, Button, Paper, Chip, IconButton } from '@mui/material';
import { AutoFixHigh, Check, Close, Psychology } from '@mui/icons-material';
import { FormSuggestion } from '../AIAssistantService';

interface FormSuggestionsPanelProps {
  suggestions: FormSuggestion[];
  onApplySuggestion: (suggestion: FormSuggestion) => void;
  onDismissSuggestion: (suggestion: FormSuggestion) => void;
  isLoading?: boolean;
}

export const FormSuggestionsPanel: React.FC<FormSuggestionsPanelProps> = ({
  suggestions,
  onApplySuggestion,
  onDismissSuggestion,
  isLoading = false
}) => {
  if (isLoading) {
    return (
      <Paper sx={{ p: 2, mb: 2, backgroundColor: '#f0f7ff' }}>
        <Typography variant="body2" color="text.secondary">
          Generating AI suggestions...
        </Typography>
      </Paper>
    );
  }

  if (suggestions.length === 0) {
    return null;
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.9) return 'success';
    if (confidence >= 0.7) return 'warning';
    return 'default';
  };

  const getConfidenceLabel = (confidence: number) => {
    if (confidence >= 0.9) return 'High Confidence';
    if (confidence >= 0.7) return 'Medium Confidence';
    return 'Low Confidence';
  };

  return (
    <Paper sx={{ 
      p: 2, 
      mb: 2, 
      backgroundColor: '#f0f7ff',
      border: '1px solid #bbdefb'
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <Psychology sx={{ color: '#1976d2', fontSize: 20 }} />
        <Typography variant="subtitle2" fontWeight="bold" color="#1976d2">
          AI Form Suggestions
        </Typography>
        <Chip 
          label={`${suggestions.length} suggestions`} 
          size="small" 
          color="primary" 
          variant="outlined"
        />
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        {suggestions.map((suggestion, index) => (
          <Paper 
            key={index} 
            sx={{ 
              p: 2, 
              backgroundColor: 'white',
              border: '1px solid #e3f2fd'
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
              <Box sx={{ flex: 1 }}>
                <Typography variant="subtitle2" fontWeight="medium" sx={{ mb: 0.5 }}>
                  {suggestion.field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Suggested: <strong>{suggestion.suggestedValue}</strong>
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {suggestion.reasoning}
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', gap: 1, ml: 2 }}>
                <Chip
                  label={getConfidenceLabel(suggestion.confidence)}
                  size="small"
                  color={getConfidenceColor(suggestion.confidence)}
                  variant="outlined"
                />
              </Box>
            </Box>

            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
              <Button
                size="small"
                startIcon={<Check />}
                variant="contained"
                color="primary"
                onClick={() => onApplySuggestion(suggestion)}
                sx={{ minWidth: 100 }}
              >
                Apply
              </Button>
              <IconButton
                size="small"
                onClick={() => onDismissSuggestion(suggestion)}
                sx={{ color: 'text.secondary' }}
              >
                <Close />
              </IconButton>
            </Box>
          </Paper>
        ))}
      </Box>

      <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid #e3f2fd' }}>
        <Button
          size="small"
          startIcon={<AutoFixHigh />}
          variant="outlined"
          color="primary"
          onClick={() => suggestions.forEach(onApplySuggestion)}
          fullWidth
        >
          Apply All High Confidence Suggestions
        </Button>
      </Box>
    </Paper>
  );
};
