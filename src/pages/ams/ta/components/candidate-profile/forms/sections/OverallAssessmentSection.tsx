
import React from 'react';
import { Box, Typography, Rating, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { FormSection, FormGrid, FormInput } from '../shared/FormComponents';

interface OverallAssessmentData {
  overallNotes: string;
  strengths: string;
  concerns: string;
  recommendation: string;
  nextSteps: string;
  rating: number;
  overallRating: number;
  finalDecision: string;
}

interface OverallAssessmentSectionProps {
  formData: OverallAssessmentData;
  onFieldChange: (field: string, value: any) => void;
}

export const OverallAssessmentSection: React.FC<OverallAssessmentSectionProps> = ({
  formData,
  onFieldChange
}) => {
  return (
    <FormSection title="Overall Assessment" defaultExpanded>
      <FormGrid columns={1} gap={3}>
        <FormInput
          label="Overall Notes"
          value={formData.overallNotes || ''}
          onChange={(value) => onFieldChange('overallNotes', value)}
          placeholder="General observations and notes"
          multiline
          rows={4}
        />

        <FormInput
          label="Key Strengths"
          value={formData.strengths || ''}
          onChange={(value) => onFieldChange('strengths', value)}
          placeholder="Candidate's main strengths"
          multiline
          rows={3}
        />

        <FormInput
          label="Areas of Concern"
          value={formData.concerns || ''}
          onChange={(value) => onFieldChange('concerns', value)}
          placeholder="Any concerns or areas for improvement"
          multiline
          rows={3}
        />

        <FormInput
          label="Recommendation"
          value={formData.recommendation || ''}
          onChange={(value) => onFieldChange('recommendation', value)}
          placeholder="Your recommendation for this candidate"
          multiline
          rows={3}
        />

        <FormInput
          label="Next Steps"
          value={formData.nextSteps || ''}
          onChange={(value) => onFieldChange('nextSteps', value)}
          placeholder="Recommended next steps in the process"
          multiline
          rows={2}
        />

        <Box>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Overall Rating
          </Typography>
          <Rating
            value={formData.overallRating || 0}
            onChange={(_, value) => onFieldChange('overallRating', value || 0)}
            size="large"
            max={5}
          />
        </Box>

        <FormControl fullWidth size="small">
          <InputLabel>Final Decision</InputLabel>
          <Select
            value={formData.finalDecision || ''}
            onChange={(e) => onFieldChange('finalDecision', e.target.value)}
            label="Final Decision"
          >
            <MenuItem value="proceed">Proceed to Next Stage</MenuItem>
            <MenuItem value="hold">Put on Hold</MenuItem>
            <MenuItem value="reject">Reject</MenuItem>
            <MenuItem value="pending">Pending Review</MenuItem>
          </Select>
        </FormControl>
      </FormGrid>
    </FormSection>
  );
};
