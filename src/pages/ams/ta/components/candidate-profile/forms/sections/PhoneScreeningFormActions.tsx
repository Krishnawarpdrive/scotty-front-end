
import React from 'react';
import { Box, Alert } from '@mui/material';
import { DesignSystemButton } from '@/components/ui-mui/DesignSystemButton';
import { Save, Send, FileText, ArrowLeft, ArrowRight } from 'lucide-react';

interface PhoneScreeningFormActionsProps {
  onSave?: () => void;
  onSubmit?: () => void;
  onGenerateReport?: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
  isSubmitting?: boolean;
  hasChanges?: boolean;
}

export const PhoneScreeningFormActions: React.FC<PhoneScreeningFormActionsProps> = ({
  onSave,
  onSubmit,
  onGenerateReport,
  onPrevious,
  onNext,
  isSubmitting = false,
  hasChanges = false
}) => {
  return (
    <Box sx={{ 
      position: 'sticky',
      bottom: 0,
      bgcolor: 'white',
      borderTop: '1px solid #e5e7eb',
      p: 3,
      zIndex: 100
    }}>
      {hasChanges && (
        <Alert severity="info" sx={{ mb: 2, fontFamily: 'Rubik, sans-serif' }}>
          You have unsaved changes. Don't forget to save your progress.
        </Alert>
      )}

      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 2,
        flexWrap: 'wrap'
      }}>
        <Box sx={{ display: 'flex', gap: 1 }}>
          {onPrevious && (
            <DesignSystemButton
              variant="outlined"
              onClick={onPrevious}
              startIcon={<ArrowLeft className="h-4 w-4" />}
            >
              Previous Stage
            </DesignSystemButton>
          )}
        </Box>

        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          {onGenerateReport && (
            <DesignSystemButton
              variant="outlined"
              onClick={onGenerateReport}
              startIcon={<FileText className="h-4 w-4" />}
            >
              Generate Report
            </DesignSystemButton>
          )}

          {onSave && (
            <DesignSystemButton
              variant="outlined"
              onClick={onSave}
              startIcon={<Save className="h-4 w-4" />}
              disabled={isSubmitting}
            >
              Save Draft
            </DesignSystemButton>
          )}

          {onSubmit && (
            <DesignSystemButton
              variant="contained"
              onClick={onSubmit}
              startIcon={<Send className="h-4 w-4" />}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Assessment'}
            </DesignSystemButton>
          )}

          {onNext && (
            <DesignSystemButton
              variant="contained"
              onClick={onNext}
              endIcon={<ArrowRight className="h-4 w-4" />}
            >
              Next Stage
            </DesignSystemButton>
          )}
        </Box>
      </Box>
    </Box>
  );
};
