
import React, { useState, useRef } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Card, 
  CardContent, 
  LinearProgress,
  Chip,
  IconButton,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { 
  CloudUpload, 
  Delete, 
  Visibility, 
  Check, 
  Close, 
  Warning,
  FileUpload,
  Description
} from '@mui/icons-material';
import { supabase } from '@/integrations/supabase/client';
import { Candidate } from '../../../types/CandidateTypes';

interface DocumentUploadManagerProps {
  candidate: Candidate;
  onDocumentUploaded?: (document: any) => void;
}

const DOCUMENT_TYPES = [
  { value: 'resume', label: 'Resume/CV', required: true },
  { value: 'id_proof', label: 'ID Proof', required: true },
  { value: 'address_proof', label: 'Address Proof', required: false },
  { value: 'education_certificate', label: 'Education Certificate', required: false },
  { value: 'experience_letter', label: 'Experience Letter', required: false },
  { value: 'offer_letter', label: 'Offer Letter', required: false },
  { value: 'salary_slip', label: 'Salary Slip', required: false },
  { value: 'other', label: 'Other Documents', required: false }
] as const;

type DocumentType = typeof DOCUMENT_TYPES[number]['value'];

export const DocumentUploadManager: React.FC<DocumentUploadManagerProps> = ({
  candidate,
  onDocumentUploaded
}) => {
  const [documents, setDocuments] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedDocumentType, setSelectedDocumentType] = useState<DocumentType | ''>('');
  const [previewDialog, setPreviewDialog] = useState<{ open: boolean; document: any }>({
    open: false,
    document: null
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    fetchCandidateDocuments();
  }, [candidate.id]);

  const fetchCandidateDocuments = async () => {
    try {
      const { data, error } = await supabase
        .from('candidate_documents')
        .select('*')
        .eq('candidate_id', candidate.id.toString())
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDocuments(data || []);
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };

  const handleFileSelect = (documentType: DocumentType) => {
    setSelectedDocumentType(documentType);
    fileInputRef.current?.click();
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !selectedDocumentType) return;

    setUploading(true);
    setUploadProgress(0);

    try {
      // Upload file to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${candidate.id}/${selectedDocumentType}_${Date.now()}.${fileExt}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('candidate-documents')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('candidate-documents')
        .getPublicUrl(fileName);

      // Save document metadata to database
      const { data: documentData, error: dbError } = await supabase
        .from('candidate_documents')
        .insert({
          candidate_id: candidate.id.toString(),
          document_type: selectedDocumentType,
          document_name: file.name,
          file_url: urlData.publicUrl,
          file_size: file.size,
          mime_type: file.type,
          status: 'uploaded',
          uploaded_at: new Date().toISOString()
        })
        .select()
        .single();

      if (dbError) throw dbError;

      setDocuments(prev => [documentData, ...prev]);
      onDocumentUploaded?.(documentData);
      
      // Reset form
      setSelectedDocumentType('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Error uploading document:', error);
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleDeleteDocument = async (documentId: string) => {
    try {
      const { error } = await supabase
        .from('candidate_documents')
        .delete()
        .eq('id', documentId);

      if (error) throw error;

      setDocuments(prev => prev.filter(doc => doc.id !== documentId));
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'success';
      case 'rejected': return 'error';
      case 'under_review': return 'warning';
      case 'uploaded': return 'info';
      default: return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified': return <Check />;
      case 'rejected': return <Close />;
      case 'under_review': return <Warning />;
      default: return <Description />;
    }
  };

  const getRequiredDocuments = () => {
    return DOCUMENT_TYPES.filter(type => type.required);
  };

  const getUploadedDocumentTypes = () => {
    return documents.map(doc => doc.document_type);
  };

  const getMissingRequiredDocuments = () => {
    const uploadedTypes = getUploadedDocumentTypes();
    return getRequiredDocuments().filter(doc => !uploadedTypes.includes(doc.value));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ mb: 3, fontFamily: 'Rubik, sans-serif', fontWeight: 600 }}>
        Document Upload & Verification
      </Typography>

      {/* Missing Required Documents Alert */}
      {getMissingRequiredDocuments().length > 0 && (
        <Alert severity="warning" sx={{ mb: 3 }}>
          Missing required documents: {getMissingRequiredDocuments().map(doc => doc.label).join(', ')}
        </Alert>
      )}

      {/* Upload Section */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="subtitle2" sx={{ mb: 2, fontFamily: 'Rubik, sans-serif' }}>
            Upload New Document
          </Typography>
          
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
            {DOCUMENT_TYPES.map((docType) => {
              const isUploaded = getUploadedDocumentTypes().includes(docType.value);
              return (
                <Box key={docType.value} sx={{ flex: '1 1 250px', minWidth: 200 }}>
                  <Button
                    variant={isUploaded ? "outlined" : "contained"}
                    fullWidth
                    startIcon={<FileUpload />}
                    onClick={() => handleFileSelect(docType.value)}
                    disabled={uploading}
                    color={docType.required ? "primary" : "secondary"}
                    sx={{ 
                      minHeight: '48px',
                      position: 'relative'
                    }}
                  >
                    {docType.label}
                    {docType.required && (
                      <Typography component="span" sx={{ color: 'red', ml: 1 }}>*</Typography>
                    )}
                    {isUploaded && (
                      <Check sx={{ position: 'absolute', right: 8, color: 'green' }} />
                    )}
                  </Button>
                </Box>
              );
            })}
          </Box>

          {uploading && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Uploading... {Math.round(uploadProgress)}%
              </Typography>
              <LinearProgress variant="determinate" value={uploadProgress} />
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Documents List */}
      <Typography variant="subtitle2" sx={{ mb: 2, fontFamily: 'Rubik, sans-serif' }}>
        Uploaded Documents ({documents.length})
      </Typography>

      {documents.length === 0 ? (
        <Alert severity="info">No documents uploaded yet.</Alert>
      ) : (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          {documents.map((document) => (
            <Box key={document.id} sx={{ flex: '1 1 300px', minWidth: 250 }}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      {DOCUMENT_TYPES.find(t => t.value === document.document_type)?.label || document.document_type}
                    </Typography>
                    <Chip
                      icon={getStatusIcon(document.status)}
                      label={document.status}
                      color={getStatusColor(document.status)}
                      size="small"
                    />
                  </Box>

                  <Typography variant="body2" sx={{ mb: 1, color: 'text.secondary' }}>
                    {document.document_name}
                  </Typography>

                  <Typography variant="caption" sx={{ display: 'block', mb: 2, color: 'text.secondary' }}>
                    Uploaded: {new Date(document.uploaded_at).toLocaleDateString()}
                  </Typography>

                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton
                      size="small"
                      onClick={() => setPreviewDialog({ open: true, document })}
                    >
                      <Visibility />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleDeleteDocument(document.id)}
                    >
                      <Delete />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      )}

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        style={{ display: 'none' }}
        onChange={handleFileUpload}
        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
      />

      {/* Preview Dialog */}
      <Dialog
        open={previewDialog.open}
        onClose={() => setPreviewDialog({ open: false, document: null })}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Document Preview - {previewDialog.document?.document_name}
        </DialogTitle>
        <DialogContent>
          {previewDialog.document?.file_url && (
            <Box sx={{ textAlign: 'center' }}>
              {previewDialog.document.mime_type?.startsWith('image/') ? (
                <img
                  src={previewDialog.document.file_url}
                  alt={previewDialog.document.document_name}
                  style={{ maxWidth: '100%', maxHeight: '500px' }}
                />
              ) : (
                <iframe
                  src={previewDialog.document.file_url}
                  width="100%"
                  height="500px"
                  title="Document Preview"
                />
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPreviewDialog({ open: false, document: null })}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
