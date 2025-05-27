
import React from 'react';
import { Box, Typography } from '@mui/material';
import { DesignSystemTextField } from '@/components/ui-mui/DesignSystemTextField';
import { DesignSystemSelect } from '@/components/ui-mui/DesignSystemSelect';

interface PhoneScreeningOutcomeData {
  outcome: string;
  notes: string;
  recordingUrl: string;
}

interface PhoneScreeningOutcomeProps {
  formData: PhoneScreeningOutcomeData;
  onFieldChange: (field: string, value: any) => void;
}

const outcomeOptions = [
  { value: 'pending', label: 'Pending' },
  { value: 'pass', label: 'Pass' },
  { value: 'fail', label: 'Fail' }
];

export const PhoneScreeningOutcome: React.FC<PhoneScreeningOutcomeProps> = ({
  formData,
  onFieldChange
}) => {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6" sx={{ 
        mb: 2, 
        fontFamily: 'Rubik, sans-serif', 
        fontWeight: 600,
        fontSize: '14px',
        color: '#374151'
      }}>
        Call Outcome
      </Typography>

      <Box sx={{ mb: 2 }}>
        <DesignSystemSelect
          label="Outcome"
          value={formData.outcome}
          onChange={(value) => onFieldChange('outcome', value)}
          options={outcomeOptions}
          fullWidth
        />
      </Box>

      <DesignSystemTextField
        label="Recording URL (Optional)"
        value={formData.recordingUrl}
        onChange={(e) => onFieldChange('recordingUrl', e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
      />

      <DesignSystemTextField
        label="Notes"
        value={formData.notes}
        onChange={(e) => onFieldChange('notes', e.target.value)}
        fullWidth
        multiline
        rows={4}
        placeholder="Add notes about the phone screening..."
      />
    </Box>
  );
};
