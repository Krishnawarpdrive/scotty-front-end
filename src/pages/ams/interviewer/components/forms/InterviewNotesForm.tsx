
import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  TextField, 
  Button,
  Chip
} from '@mui/material';
import { Save, Add } from '@mui/icons-material';
import { Interview } from '../../MyInterviewsPage';

interface InterviewNotesFormProps {
  interview: Interview;
}

export const InterviewNotesForm: React.FC<InterviewNotesFormProps> = ({
  interview
}) => {
  const [notes, setNotes] = useState<string>('');
  const [savedNotes, setSavedNotes] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>(['Technical Discussion', 'Communication Skills']);

  const handleSaveNote = () => {
    if (notes.trim()) {
      setSavedNotes([...savedNotes, notes]);
      setNotes('');
    }
  };

  return (
    <Box sx={{ p: 3, fontFamily: 'Rubik, sans-serif' }}>
      <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold', fontFamily: 'Rubik, sans-serif' }}>
        Interview Notes & Comments
      </Typography>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold' }}>
            Add New Note
          </Typography>
          <TextField
            multiline
            rows={4}
            fullWidth
            placeholder="Add your observations, questions asked, candidate responses, or any other relevant notes..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            {tags.map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                size="small"
                variant="outlined"
                clickable
              />
            ))}
          </Box>
          <Button
            variant="contained"
            startIcon={<Save />}
            onClick={handleSaveNote}
            disabled={!notes.trim()}
            sx={{ bgcolor: '#1976d2' }}
          >
            Save Note
          </Button>
        </CardContent>
      </Card>

      {savedNotes.length > 0 && (
        <Card>
          <CardContent>
            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold' }}>
              Saved Notes
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {savedNotes.map((note, index) => (
                <Box
                  key={index}
                  sx={{
                    bgcolor: '#f5f5f5',
                    p: 2,
                    borderRadius: 1,
                    borderLeft: '4px solid #1976d2'
                  }}
                >
                  <Typography variant="body2">{note}</Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                    Note {index + 1} - Just now
                  </Typography>
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};
