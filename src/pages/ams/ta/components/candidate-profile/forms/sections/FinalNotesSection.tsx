
import React from 'react';
import { Box } from '@mui/material';
import { DesignSystemTextField } from '@/components/ui-mui/DesignSystemTextField';

interface FinalNotesData {
  finalNotes: string;
}

interface FinalNotesSectionProps {
  formData: FinalNotesData;
  onFieldChange: (field: string, value: any) => void;
}

export const FinalNotesSection: React.FC<FinalNotesSectionProps> = ({
  formData,
  onFieldChange
}) => {
  return (
    <Box sx={{ mb: 3 }}>
      <DesignSystemTextField
        label="Final Notes"
        value={formData.finalNotes}
        onChange={(e) => onFieldChange('finalNotes', e.target.value)}
        fullWidth
        multiline
        rows={4}
        placeholder="Final assessment, recommendations, next steps..."
      />
    </Box>
  );
};
