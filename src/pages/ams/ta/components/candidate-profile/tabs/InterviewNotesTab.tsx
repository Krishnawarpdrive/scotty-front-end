
import React, { useState } from 'react';
import { Box, TextField, Button, Chip, Typography, Card, CardContent } from '@mui/material';
import { Add as AddIcon, PersonOutline } from '@mui/icons-material';

interface Stage {
  id: string;
  name: string;
  status: 'completed' | 'current' | 'pending';
  order: number;
}

interface InterviewNotesTabProps {
  candidate: any;
  stage: Stage;
}

// Mock notes data
const mockNotes = [
  {
    id: '1',
    content: 'Candidate showed strong technical knowledge in networking protocols. Needs improvement in CISCO configuration.',
    author: 'Sarah Johnson',
    timestamp: '2024-01-15 14:30',
    tags: ['Technical', 'Networking']
  },
  {
    id: '2',
    content: 'Good communication skills demonstrated during the phone screening. Ready for technical interview.',
    author: 'Mike Chen',
    timestamp: '2024-01-14 10:15',
    tags: ['Communication', 'Screening']
  },
  {
    id: '3',
    content: 'Follow up needed on previous work experience validation.',
    author: 'HR Team',
    timestamp: '2024-01-13 16:45',
    tags: ['Follow-up', 'Experience']
  }
];

export const InterviewNotesTab: React.FC<InterviewNotesTabProps> = ({
  candidate,
  stage
}) => {
  const [newNote, setNewNote] = useState('');
  const [notes] = useState(mockNotes);

  const handleAddNote = () => {
    if (newNote.trim()) {
      // In a real app, this would add the note to the database
      console.log('Adding note:', newNote);
      setNewNote('');
    }
  };

  return (
    <Box sx={{ p: 3, height: '100%', overflow: 'auto' }}>
      {/* Add New Note */}
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
          Add Interview Note
        </Typography>
        
        <TextField
          multiline
          rows={3}
          fullWidth
          placeholder={`Add a note for ${stage.name}...`}
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          sx={{
            mb: 2,
            '& .MuiOutlinedInput-root': {
              fontFamily: 'Rubik, sans-serif',
              fontSize: '13px'
            }
          }}
        />
        
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddNote}
          disabled={!newNote.trim()}
          sx={{
            backgroundColor: '#009933',
            '&:hover': { backgroundColor: '#00A341' },
            fontFamily: 'Rubik, sans-serif',
            textTransform: 'none'
          }}
        >
          Add Note
        </Button>
      </Box>

      {/* Notes List */}
      <Typography 
        variant="subtitle2" 
        sx={{ 
          fontFamily: 'Rubik, sans-serif',
          fontWeight: 600,
          mb: 2,
          color: '#262626'
        }}
      >
        Previous Notes ({notes.length})
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {notes.map((note) => (
          <Card key={note.id} sx={{ borderRadius: '8px', border: '1px solid #e0e0e0' }}>
            <CardContent sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                <PersonOutline sx={{ color: '#666', mt: 0.5 }} />
                <Box sx={{ flex: 1 }}>
                  <Typography
                    sx={{
                      fontFamily: 'Rubik, sans-serif',
                      fontSize: '13px',
                      color: '#262626',
                      mb: 1,
                      lineHeight: 1.4
                    }}
                  >
                    {note.content}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    {note.tags.map((tag) => (
                      <Chip
                        key={tag}
                        label={tag}
                        size="small"
                        sx={{
                          height: '20px',
                          fontSize: '10px',
                          backgroundColor: '#f5f5f5',
                          color: '#666'
                        }}
                      />
                    ))}
                  </Box>
                  
                  <Typography
                    sx={{
                      fontFamily: 'Rubik, sans-serif',
                      fontSize: '11px',
                      color: '#999'
                    }}
                  >
                    {note.author} • {note.timestamp}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};
