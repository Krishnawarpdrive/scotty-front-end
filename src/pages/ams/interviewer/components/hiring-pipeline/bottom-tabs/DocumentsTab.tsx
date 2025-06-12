
import React from 'react';
import { Box } from '@mui/material';
import { Interview } from '../../../MyInterviewsPage';
import { DocumentsForm } from '../../forms/DocumentsForm';

interface DocumentsTabProps {
  interview: Interview;
}

export const DocumentsTab: React.FC<DocumentsTabProps> = ({
  interview
}) => {
  return (
    <Box sx={{ height: '100%' }}>
      <DocumentsForm interview={interview} />
    </Box>
  );
};
