
import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Chip
} from '@mui/material';
import { 
  Description, 
  Download, 
  Visibility, 
  CheckCircle,
  Schedule,
  Error as ErrorIcon
} from '@mui/icons-material';
import { Interview } from '../../MyInterviewsPage';

interface DocumentsFormProps {
  interview: Interview;
}

interface DocumentItem {
  id: string;
  name: string;
  type: 'resume' | 'cover_letter' | 'portfolio' | 'certificate';
  status: 'verified' | 'pending' | 'rejected';
  uploadedAt: string;
  size: string;
}

export const DocumentsForm: React.FC<DocumentsFormProps> = ({
  interview
}) => {
  // Mock documents data
  const [documents] = useState<DocumentItem[]>([
    {
      id: '1',
      name: `${interview.candidateName}_Resume.pdf`,
      type: 'resume',
      status: 'verified',
      uploadedAt: '2024-01-15',
      size: '245 KB'
    },
    {
      id: '2',
      name: `${interview.candidateName}_Portfolio.pdf`,
      type: 'portfolio',
      status: 'pending',
      uploadedAt: '2024-01-14',
      size: '1.2 MB'
    }
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return <CheckCircle sx={{ color: '#2e7d32' }} />;
      case 'pending':
        return <Schedule sx={{ color: '#f57c00' }} />;
      case 'rejected':
        return <ErrorIcon sx={{ color: '#d32f2f' }} />;
      default:
        return <Description />;
    }
  };

  const getStatusChip = (status: string) => {
    const colors = {
      verified: { bgcolor: '#e8f5e8', color: '#2e7d32' },
      pending: { bgcolor: '#fff3e0', color: '#f57c00' },
      rejected: { bgcolor: '#ffebee', color: '#d32f2f' }
    };
    
    return (
      <Chip 
        label={status.charAt(0).toUpperCase() + status.slice(1)}
        size="small"
        sx={colors[status as keyof typeof colors]}
      />
    );
  };

  const getDocumentTypeLabel = (type: string) => {
    const labels = {
      resume: 'Resume',
      cover_letter: 'Cover Letter',
      portfolio: 'Portfolio',
      certificate: 'Certificate'
    };
    return labels[type as keyof typeof labels] || type;
  };

  return (
    <Box sx={{ p: 3, fontFamily: 'Rubik, sans-serif' }}>
      <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold', fontFamily: 'Rubik, sans-serif' }}>
        Candidate Documents
      </Typography>

      <Card>
        <CardContent>
          <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold' }}>
            Uploaded Documents
          </Typography>

          {documents.length > 0 ? (
            <List>
              {documents.map((doc, index) => (
                <ListItem
                  key={doc.id}
                  sx={{
                    border: '1px solid #e0e0e0',
                    borderRadius: 1,
                    mb: index < documents.length - 1 ? 2 : 0,
                    bgcolor: '#fafafa'
                  }}
                >
                  <ListItemIcon>
                    {getStatusIcon(doc.status)}
                  </ListItemIcon>
                  
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="subtitle2" fontWeight="bold">
                          {doc.name}
                        </Typography>
                        {getStatusChip(doc.status)}
                      </Box>
                    }
                    secondary={
                      <Box sx={{ mt: 1 }}>
                        <Typography variant="caption" color="text.secondary">
                          {getDocumentTypeLabel(doc.type)} • {doc.size} • Uploaded on {doc.uploadedAt}
                        </Typography>
                      </Box>
                    }
                  />
                  
                  <ListItemSecondaryAction>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <IconButton size="small" title="View Document">
                        <Visibility />
                      </IconButton>
                      <IconButton size="small" title="Download">
                        <Download />
                      </IconButton>
                    </Box>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          ) : (
            <Box sx={{ textAlign: 'center', py: 4, color: 'text.secondary' }}>
              <Description sx={{ fontSize: 48, mb: 2, opacity: 0.5 }} />
              <Typography variant="body2">
                No documents uploaded yet
              </Typography>
            </Box>
          )}

          <Box sx={{ mt: 3, pt: 2, borderTop: '1px solid #e0e0e0' }}>
            <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 'bold' }}>
              Document Summary
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Chip 
                label={`${documents.filter(d => d.status === 'verified').length} Verified`}
                size="small"
                sx={{ bgcolor: '#e8f5e8', color: '#2e7d32' }}
              />
              <Chip 
                label={`${documents.filter(d => d.status === 'pending').length} Pending`}
                size="small"
                sx={{ bgcolor: '#fff3e0', color: '#f57c00' }}
              />
              <Chip 
                label={`${documents.length} Total`}
                size="small"
                variant="outlined"
              />
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};
