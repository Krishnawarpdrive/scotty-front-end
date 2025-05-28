
import React from 'react';
import { Box, Typography, Grid, Alert } from '@mui/material';
import { DesignSystemTextField } from '@/components/ui-mui/DesignSystemTextField';
import { DesignSystemSelect } from '@/components/ui-mui/DesignSystemSelect';
import { AlertTriangle, CheckCircle, Clock } from 'lucide-react';

interface RemarksSectionProps {
  formData: {
    overallNotes: string;
    strengths: string;
    concerns: string;
    recommendation: string;
    nextSteps: string;
    rating: string;
  };
  onFieldChange: (field: string, value: any) => void;
}

const ratingOptions = [
  { value: 'excellent', label: 'Excellent - Strongly Recommend' },
  { value: 'good', label: 'Good - Recommend' },
  { value: 'average', label: 'Average - Consider' },
  { value: 'below-average', label: 'Below Average - Not Recommended' }
];

export const RemarksSection: React.FC<RemarksSectionProps> = ({
  formData,
  onFieldChange
}) => {
  const getRatingIcon = (rating: string) => {
    switch (rating) {
      case 'excellent':
      case 'good':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'average':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'below-average':
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default:
        return null;
    }
  };

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'excellent':
      case 'good':
        return 'success';
      case 'average':
        return 'warning';
      case 'below-average':
        return 'error';
      default:
        return 'info';
    }
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="subtitle1" sx={{ 
        mb: 2, 
        fontFamily: 'Rubik, sans-serif', 
        fontWeight: 600,
        fontSize: '14px',
        color: '#111827'
      }}>
        Interviewer Remarks & Assessment
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <DesignSystemSelect
            fullWidth
            label="Overall Rating"
            value={formData.rating}
            onChange={(value) => onFieldChange('rating', value)}
            options={ratingOptions}
          />
          {formData.rating && (
            <Alert 
              severity={getRatingColor(formData.rating) as any}
              icon={getRatingIcon(formData.rating)}
              sx={{ mt: 1, fontFamily: 'Rubik, sans-serif' }}
            >
              {ratingOptions.find(option => option.value === formData.rating)?.label}
            </Alert>
          )}
        </Grid>

        <Grid item xs={12} md={6}>
          <DesignSystemTextField
            fullWidth
            label="Key Strengths"
            value={formData.strengths}
            onChange={(e) => onFieldChange('strengths', e.target.value)}
            multiline
            rows={4}
            placeholder="Highlight the candidate's key strengths and positive attributes..."
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <DesignSystemTextField
            fullWidth
            label="Areas of Concern"
            value={formData.concerns}
            onChange={(e) => onFieldChange('concerns', e.target.value)}
            multiline
            rows={4}
            placeholder="Note any concerns or areas that need attention..."
          />
        </Grid>

        <Grid item xs={12}>
          <DesignSystemTextField
            fullWidth
            label="Overall Notes & Comments"
            value={formData.overallNotes}
            onChange={(e) => onFieldChange('overallNotes', e.target.value)}
            multiline
            rows={4}
            placeholder="Detailed notes from the phone screening session..."
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <DesignSystemTextField
            fullWidth
            label="Recommendation"
            value={formData.recommendation}
            onChange={(e) => onFieldChange('recommendation', e.target.value)}
            multiline
            rows={3}
            placeholder="Your recommendation for this candidate's progression..."
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <DesignSystemTextField
            fullWidth
            label="Next Steps"
            value={formData.nextSteps}
            onChange={(e) => onFieldChange('nextSteps', e.target.value)}
            multiline
            rows={3}
            placeholder="Outline the next steps in the hiring process..."
          />
        </Grid>
      </Grid>
    </Box>
  );
};
