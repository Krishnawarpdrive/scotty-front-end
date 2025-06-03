
import React from 'react';
import { Card, CardContent, Typography, Box, Button } from '@mui/material';
import { CloudUpload, Description } from '@mui/icons-material';

interface CandidateDocumentsTableProps {
  candidateId: string;
}

export const CandidateDocumentsTable: React.FC<CandidateDocumentsTableProps> = ({ candidateId }) => {
  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Document Status
          </Typography>
          <Button size="small" variant="outlined" startIcon={<CloudUpload />}>
            Upload Documents
          </Button>
        </Box>
        
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography color="text.secondary">
            No documents uploaded yet
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
