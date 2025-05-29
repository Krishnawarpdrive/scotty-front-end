
import React from 'react';
import { Box, Typography, Paper, Button, Chip, LinearProgress } from '@mui/material';
import { Lightbulb, Check, Close } from '@mui/icons-material';
import { FormSuggestion } from '../AIAssistantService';

interface FormSuggestionsPanelProps {
  suggestions: FormSuggestion[];
  onApplySuggestion: (suggestion: FormSuggestion) => void;
  onDismissSuggestion: (suggestion: FormSuggestion) => void;
  isLoading: boolean;
}

export const FormSuggestionsPanel: React.FC<FormSuggestionsPanelProps> = ({
  suggestions,
  onApplySuggestion,
  onDismissSuggestion,
  isLoading
}) => {
  if (!isLoading && suggestions.length === 0) {
    return null;
  }

  return (
    <Paper sx={{ p: 3, mb: 3, backgroundColor: '#fff3e0' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <Lightbulb sx={{ color: '#ff9800', fontSize: 24 }} />
        <Typography variant="h6" fontWeight="bold">
          AI Form Suggestions
        </Typography>
      </Box>

      {isLoading && (
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            AI is analyzing form data and generating suggestions...
          </Typography>
          <LinearProgress />
        </Box>
      )}

      {suggestions.map((suggestion, index) => (
        <Box key={index} sx={{ 
          p: 2, 
          border: '1px solid #ffcc02', 
          borderRadius: 1, 
          mb: 2,
          backgroundColor: 'white'
        }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
            <Typography variant="subtitle2" fontWeight="bold">
              {suggestion.field.charAt(0).toUpperCase() + suggestion.field.slice(1)}
            </Typography>
            <Chip 
              label={`${Math.round(suggestion.confidence * 100)}% confidence`}
              size="small"
              color="warning"
              variant="outlined"
            />
          </Box>
          
          <Typography variant="body2" sx={{ mb: 1 }}>
            Suggested value: <strong>{suggestion.suggestedValue}</strong>
          </Typography>
          
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {suggestion.reasoning}
          </Typography>

          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              size="small"
              variant="contained"
              startIcon={<Check />}
              onClick={() => onApplySuggestion(suggestion)}
              sx={{ backgroundColor: '#4caf50' }}
            >
              Apply
            </Button>
            <Button
              size="small"
              variant="outlined"
              startIcon={<Close />}
              onClick={() => onDismissSuggestion(suggestion)}
            >
              Dismiss
            </Button>
          </Box>
        </Box>
      ))}
    </Paper>
  );
};
