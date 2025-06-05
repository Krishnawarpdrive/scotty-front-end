
import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, TextField, Button, Chip } from '@mui/material';
import { Save, Add } from '@mui/icons-material';
import { Interview } from '../../MyInterviewsPage';

interface InterviewNotesFormProps {
  interview: Interview;
}

interface Note {
  id: string;
  timestamp: string;
  content: string;
  tag?: string;
}

export const InterviewNotesForm: React.FC<InterviewNotesFormProps> = ({
  interview
}) => {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: '1',
      timestamp: new Date().toISOString(),
      content: 'Candidate showed strong understanding of React concepts',
      tag: 'Technical'
    }
  ]);
  const [newNote, setNewNote] = useState('');
  const [selectedTag, setSelectedTag] = useState('');

  const tags = ['Technical', 'Behavioral', 'Communication', 'Problem Solving', 'Cultural Fit', 'Follow-up'];

  const handleAddNote = () => {
    if (newNote.trim()) {
      const note: Note = {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        content: newNote,
        tag: selectedTag
      };
      setNotes(prev => [note, ...prev]);
      setNewNote('');
      setSelectedTag('');
    }
  };

  const handleSave = () => {
    console.log('Saving notes:', notes);
    // Implement save logic
  };

  return (
    <Box sx={{ p: 3, fontFamily: 'Rubik, sans-serif' }}>
      <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
        Interview Notes & Comments
      </Typography>

      {/* Add New Note */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold' }}>
            Add New Note
          </Typography>
          
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" sx={{ mb: 1 }}>Tag (Optional)</Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
              {tags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  onClick={() => setSelectedTag(tag === selectedTag ? '' : tag)}
                  color={selectedTag === tag ? 'primary' : 'default'}
                  variant={selectedTag === tag ? 'filled' : 'outlined'}
                  size="small"
                />
              ))}
            </Box>
          </Box>
          
          <TextField
            label="Add a note..."
            multiline
            rows={3}
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />
          
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleAddNote}
            disabled={!newNote.trim()}
          >
            Add Note
          </Button>
        </CardContent>
      </Card>

      {/* Notes List */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'bold' }}>
            Notes Timeline
          </Typography>
          
          {notes.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              No notes added yet
            </Typography>
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {notes.map((note) => (
                <Box
                  key={note.id}
                  sx={{
                    p: 2,
                    border: '1px solid #e0e0e0',
                    borderRadius: 1,
                    bgcolor: '#f9f9f9'
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="caption" color="text.secondary">
                      {new Date(note.timestamp).toLocaleString()}
                    </Typography>
                    {note.tag && (
                      <Chip label={note.tag} size="small" color="primary" variant="outlined" />
                    )}
                  </Box>
                  <Typography variant="body2">{note.content}</Typography>
                </Box>
              ))}
            </Box>
          )}
        </CardContent>
      </Card>

      <Button
        variant="outlined"
        startIcon={<Save />}
        onClick={handleSave}
      >
        Save All Notes
      </Button>
    </Box>
  );
};
