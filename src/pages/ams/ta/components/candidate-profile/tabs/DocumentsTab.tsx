
import React from 'react';
import { Box, Typography, List, ListItem, ListItemIcon, ListItemText, IconButton, Chip } from '@mui/material';
import { FileText, Download, Eye, Upload } from 'lucide-react';

interface Stage {
  id: string;
  name: string;
  status: 'completed' | 'active' | 'pending';
  order: number;
}

interface DocumentsTabProps {
  candidate: any;
  stage: Stage;
}

// Mock documents data
const mockDocuments = [
  {
    id: '1',
    name: 'Resume_AditiSharma.pdf',
    type: 'Resume',
    uploadDate: '2024-01-10',
    size: '2.4 MB',
    status: 'verified'
  },
  {
    id: '2',
    name: 'CoverLetter_AditiSharma.pdf',
    type: 'Cover Letter',
    uploadDate: '2024-01-10',
    size: '1.1 MB',
    status: 'pending'
  },
  {
    id: '3',
    name: 'Certificates_Networking.pdf',
    type: 'Certification',
    uploadDate: '2024-01-11',
    size: '3.2 MB',
    status: 'verified'
  },
  {
    id: '4',
    name: 'Experience_Letter.pdf',
    type: 'Experience Letter',
    uploadDate: '2024-01-12',
    size: '1.8 MB',
    status: 'under_review'
  }
];

export const DocumentsTab: React.FC<DocumentsTabProps> = ({
  candidate,
  stage
}) => {
  const getStatusChip = (status: string) => {
    const statusConfig = {
      verified: { color: '#10b981', bgcolor: '#ecfdf5', label: 'Verified' },
      pending: { color: '#f59e0b', bgcolor: '#fffbeb', label: 'Pending' },
      under_review: { color: '#3b82f6', bgcolor: '#eff6ff', label: 'Under Review' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    
    return (
      <Chip
        label={config.label}
        size="small"
        sx={{
          color: config.color,
          bgcolor: config.bgcolor,
          fontSize: '11px',
          height: '20px'
        }}
      />
    );
  };

  return (
    <Box sx={{ p: 3, height: '100%', overflow: 'auto' }}>
      <Typography 
        variant="h6" 
        sx={{ 
          fontFamily: 'Rubik, sans-serif',
          fontWeight: 600,
          mb: 1,
          color: '#111827'
        }}
      >
        Documents - {stage.name}
      </Typography>
      
      <Typography 
        variant="body2" 
        sx={{ 
          fontFamily: 'Rubik, sans-serif',
          color: '#6b7280',
          mb: 3
        }}
      >
        Manage candidate documents for this stage
      </Typography>

      <List>
        {mockDocuments.map((doc) => (
          <ListItem
            key={doc.id}
            sx={{
              bgcolor: '#f9fafb',
              borderRadius: '8px',
              mb: 1,
              border: '1px solid #e5e7eb'
            }}
          >
            <ListItemIcon>
              <FileText className="h-5 w-5 text-gray-600" />
            </ListItemIcon>
            <ListItemText
              primary={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography
                    sx={{
                      fontFamily: 'Rubik, sans-serif',
                      fontSize: '14px',
                      fontWeight: 500,
                      color: '#111827'
                    }}
                  >
                    {doc.name}
                  </Typography>
                  {getStatusChip(doc.status)}
                </Box>
              }
              secondary={
                <Typography
                  sx={{
                    fontFamily: 'Rubik, sans-serif',
                    fontSize: '12px',
                    color: '#6b7280'
                  }}
                >
                  {doc.type} • {doc.size} • Uploaded {doc.uploadDate}
                </Typography>
              }
            />
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton size="small" sx={{ color: '#6b7280' }}>
                <Eye className="h-4 w-4" />
              </IconButton>
              <IconButton size="small" sx={{ color: '#6b7280' }}>
                <Download className="h-4 w-4" />
              </IconButton>
            </Box>
          </ListItem>
        ))}
      </List>

      <Box sx={{ mt: 3, p: 2, bgcolor: '#f3f4f6', borderRadius: '8px', textAlign: 'center' }}>
        <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
        <Typography
          sx={{
            fontFamily: 'Rubik, sans-serif',
            fontSize: '13px',
            color: '#6b7280',
            mb: 1
          }}
        >
          Upload additional documents for {stage.name}
        </Typography>
        <Typography
          sx={{
            fontFamily: 'Rubik, sans-serif',
            fontSize: '11px',
            color: '#9ca3af'
          }}
        >
          Drag and drop files here or click to browse
        </Typography>
      </Box>
    </Box>
  );
};
