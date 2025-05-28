
import React, { useState } from 'react';
import { Box, Button, Typography, Card, CardContent, IconButton, Chip } from '@mui/material';
import { CloudUpload, GetApp, Delete, PictureAsPdf, Description } from '@mui/icons-material';

interface Stage {
  id: string;
  name: string;
  status: 'completed' | 'current' | 'pending';
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
    type: 'PDF',
    size: '2.4 MB',
    uploadedBy: 'Candidate',
    uploadedAt: '2024-01-15 09:30',
    category: 'Resume'
  },
  {
    id: '2',
    name: 'Technical_Assessment_Results.pdf',
    type: 'PDF',
    size: '1.8 MB',
    uploadedBy: 'Sarah Johnson',
    uploadedAt: '2024-01-15 15:45',
    category: 'Assessment'
  }
];

export const DocumentsTab: React.FC<DocumentsTabProps> = ({
  candidate,
  stage
}) => {
  const [documents] = useState(mockDocuments);

  const getFileIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'pdf':
        return <PictureAsPdf sx={{ color: '#f44336' }} />;
      default:
        return <Description sx={{ color: '#666' }} />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'resume':
        return { backgroundColor: '#e3f2fd', color: '#1976d2' };
      case 'assessment':
        return { backgroundColor: '#e8f5e8', color: '#009933' };
      default:
        return { backgroundColor: '#f5f5f5', color: '#666' };
    }
  };

  return (
    <Box sx={{ p: 3, height: '100%', overflow: 'auto' }}>
      {/* Upload Section */}
      <Box sx={{ mb: 3 }}>
        <Typography 
          variant="subtitle2" 
          sx={{ 
            fontFamily: 'Rubik, sans-serif',
            fontWeight: 600,
            mb: 2,
            color: '#262626'
          }}
        >
          Upload Documents
        </Typography>
        
        <Button
          variant="outlined"
          startIcon={<CloudUpload />}
          sx={{
            borderColor: '#009933',
            color: '#009933',
            '&:hover': { 
              borderColor: '#00A341',
              backgroundColor: 'rgba(0, 153, 51, 0.04)' 
            },
            fontFamily: 'Rubik, sans-serif',
            textTransform: 'none'
          }}
        >
          Upload Document
        </Button>
      </Box>

      {/* Documents List */}
      <Typography 
        variant="subtitle2" 
        sx={{ 
          fontFamily: 'Rubik, sans-serif',
          fontWeight: 600,
          mb: 2,
          color: '#262626'
        }}
      >
        Documents ({documents.length})
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {documents.map((doc) => (
          <Card key={doc.id} sx={{ borderRadius: '8px', border: '1px solid #e0e0e0' }}>
            <CardContent sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                {getFileIcon(doc.type)}
                
                <Box sx={{ flex: 1 }}>
                  <Typography
                    sx={{
                      fontFamily: 'Rubik, sans-serif',
                      fontSize: '13px',
                      fontWeight: 500,
                      color: '#262626',
                      mb: 0.5
                    }}
                  >
                    {doc.name}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Chip
                      label={doc.category}
                      size="small"
                      sx={{
                        height: '20px',
                        fontSize: '10px',
                        ...getCategoryColor(doc.category)
                      }}
                    />
                    <Typography
                      sx={{
                        fontFamily: 'Rubik, sans-serif',
                        fontSize: '11px',
                        color: '#999'
                      }}
                    >
                      {doc.size}
                    </Typography>
                  </Box>
                  
                  <Typography
                    sx={{
                      fontFamily: 'Rubik, sans-serif',
                      fontSize: '11px',
                      color: '#999'
                    }}
                  >
                    Uploaded by {doc.uploadedBy} • {doc.uploadedAt}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <IconButton size="small" sx={{ color: '#009933' }}>
                    <GetApp />
                  </IconButton>
                  <IconButton size="small" sx={{ color: '#f44336' }}>
                    <Delete />
                  </IconButton>
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};
