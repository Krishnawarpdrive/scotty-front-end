
import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemIcon,
  Chip,
  Box,
  Button,
  LinearProgress
} from '@mui/material';
import { Description, CheckCircle, Warning, Error } from '@mui/icons-material';
import { supabase } from '@/integrations/supabase/client';

interface Document {
  id: string;
  document_type: string;
  document_name: string;
  status: string;
  uploaded_at?: string;
  verified_at?: string;
}

interface DocumentsStatusProps {
  candidateId: string;
}

export const DocumentsStatus: React.FC<DocumentsStatusProps> = ({ candidateId }) => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const { data, error } = await supabase
          .from('candidate_documents')
          .select('id, document_type, document_name, status, uploaded_at, verified_at')
          .eq('candidate_id', candidateId)
          .order('uploaded_at', { ascending: false })
          .limit(10);

        if (error) {
          console.error('Error fetching documents:', error);
          return;
        }

        // Transform data to handle null values
        const transformedData = (data || []).map(doc => ({
          ...doc,
          uploaded_at: doc.uploaded_at || undefined,
          verified_at: doc.verified_at || undefined
        }));

        setDocuments(transformedData);
      } catch (error) {
        console.error('Error in fetchDocuments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, [candidateId]);

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'verified': return <CheckCircle color="success" />;
      case 'rejected': return <Error color="error" />;
      case 'under_review': return <Warning color="warning" />;
      case 'uploaded': return <Description color="info" />;
      default: return <Description color="disabled" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'verified': return 'success';
      case 'rejected': return 'error';
      case 'under_review': return 'warning';
      case 'uploaded': return 'info';
      default: return 'default';
    }
  };

  const calculateProgress = () => {
    if (documents.length === 0) return 0;
    const verifiedCount = documents.filter(doc => doc.status === 'verified').length;
    return Math.round((verifiedCount / documents.length) * 100);
  };

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Documents Status
          </Typography>
          <Button size="small" variant="outlined">
            Upload
          </Button>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2">Verification Progress</Typography>
            <Typography variant="body2">{calculateProgress()}%</Typography>
          </Box>
          <LinearProgress variant="determinate" value={calculateProgress()} />
        </Box>

        {loading ? (
          <Typography>Loading documents...</Typography>
        ) : documents.length === 0 ? (
          <Typography color="text.secondary">No documents uploaded yet.</Typography>
        ) : (
          <List sx={{ p: 0 }}>
            {documents.map((document) => (
              <ListItem key={document.id} sx={{ px: 0 }}>
                <ListItemIcon>
                  {getStatusIcon(document.status)}
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {document.document_type.replace('_', ' ').toUpperCase()}
                      </Typography>
                      <Chip 
                        label={document.status} 
                        color={getStatusColor(document.status)}
                        size="small"
                      />
                    </Box>
                  }
                  secondary={
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        {document.document_name}
                      </Typography>
                      {document.uploaded_at && (
                        <Typography variant="caption" color="text.secondary">
                          Uploaded: {new Date(document.uploaded_at).toLocaleDateString()}
                        </Typography>
                      )}
                    </Box>
                  }
                />
              </ListItem>
            ))}
          </List>
        )}
      </CardContent>
    </Card>
  );
};
