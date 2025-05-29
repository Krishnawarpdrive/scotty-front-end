
import React, { useState, useCallback } from 'react';
import { Box, Typography, Button, Paper, LinearProgress, Alert } from '@mui/material';
import { CloudUpload, Description, Psychology } from '@mui/icons-material';
import { useAIAssistant } from '../hooks/useAIAssistant';
import { Candidate } from '../../../types/CandidateTypes';

interface ResumeUploadPanelProps {
  candidate: Candidate;
  onResumeDataExtracted?: (data: any) => void;
}

export const ResumeUploadPanel: React.FC<ResumeUploadPanelProps> = ({
  candidate,
  onResumeDataExtracted
}) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [extractedText, setExtractedText] = useState<string>('');
  const [error, setError] = useState<string>('');

  const {
    parseResume,
    resumeData,
    isParsingResume
  } = useAIAssistant(candidate);

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setError('');
    setUploadedFile(file);

    // Simple text extraction (in real app, you'd use a proper PDF parser)
    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target?.result as string;
      setExtractedText(text);
      
      try {
        await parseResume(text);
        if (onResumeDataExtracted && resumeData) {
          onResumeDataExtracted(resumeData);
        }
      } catch (err) {
        setError('Failed to parse resume. Please try again.');
      }
    };
    reader.readAsText(file);
  }, [parseResume, resumeData, onResumeDataExtracted]);

  const handleDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
  }, []);

  const handleDrop = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      // Create a synthetic event object
      const syntheticEvent = {
        target: { files: [file] }
      } as unknown as React.ChangeEvent<HTMLInputElement>;
      handleFileUpload(syntheticEvent);
    }
  }, [handleFileUpload]);

  return (
    <Paper sx={{ p: 3, mb: 3, backgroundColor: '#f8f9fa' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <Psychology sx={{ color: '#1976d2', fontSize: 24 }} />
        <Typography variant="h6" fontWeight="bold">
          AI Resume Analysis
        </Typography>
      </Box>

      {!uploadedFile ? (
        <Box
          sx={{
            border: '2px dashed #ccc',
            borderRadius: 2,
            p: 4,
            textAlign: 'center',
            backgroundColor: 'white',
            cursor: 'pointer',
            transition: 'border-color 0.3s ease',
            '&:hover': {
              borderColor: '#1976d2'
            }
          }}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => document.getElementById('resume-upload')?.click()}
        >
          <CloudUpload sx={{ fontSize: 48, color: '#ccc', mb: 2 }} />
          <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
            Upload Resume for AI Analysis
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Drag and drop a resume file here, or click to browse
          </Typography>
          <Button variant="outlined" startIcon={<CloudUpload />}>
            Choose File
          </Button>
          <input
            id="resume-upload"
            type="file"
            accept=".pdf,.doc,.docx,.txt"
            onChange={handleFileUpload}
            style={{ display: 'none' }}
          />
        </Box>
      ) : (
        <Box>
          <Alert severity="info" sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Description />
              <Typography variant="body2">
                File uploaded: {uploadedFile.name}
              </Typography>
            </Box>
          </Alert>

          {isParsingResume && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                AI is analyzing the resume...
              </Typography>
              <LinearProgress />
            </Box>
          )}

          {resumeData && (
            <Alert severity="success" sx={{ mb: 2 }}>
              <Typography variant="body2">
                Resume analysis complete! AI has extracted {
                  Object.keys(resumeData.extractedData).filter(key => 
                    resumeData.extractedData[key as keyof typeof resumeData.extractedData]
                  ).length
                } data fields, {resumeData.extractedData.skills?.length || 0} technical skills, 
                and {resumeData.extractedData.projects?.length || 0} projects.
              </Typography>
            </Alert>
          )}

          <Button
            variant="outlined"
            startIcon={<CloudUpload />}
            onClick={() => {
              setUploadedFile(null);
              setExtractedText('');
              setError('');
            }}
          >
            Upload Different File
          </Button>
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
    </Paper>
  );
};
