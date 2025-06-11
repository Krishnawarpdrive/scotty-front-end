
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Clock, Plus, Edit2, Save, X } from 'lucide-react';
import { Interview } from '../../../MyInterviewsPage';

interface InterviewerNotesProps {
  interview: Interview;
}

interface Note {
  id: string;
  content: string;
  timestamp: string;
  type: 'interview' | 'preparation' | 'follow-up';
}

export const InterviewerNotes: React.FC<InterviewerNotesProps> = ({
  interview
}) => {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: '1',
      content: 'Candidate shows strong understanding of React fundamentals. Good explanation of component lifecycle.',
      timestamp: '2024-01-15 10:30 AM',
      type: 'interview'
    },
    {
      id: '2',
      content: 'Need to ask about experience with state management libraries in the next session.',
      timestamp: '2024-01-15 10:15 AM',
      type: 'preparation'
    }
  ]);
  
  const [newNote, setNewNote] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');

  const addNote = () => {
    if (newNote.trim()) {
      const note: Note = {
        id: Date.now().toString(),
        content: newNote.trim(),
        timestamp: new Date().toLocaleString(),
        type: 'interview'
      };
      setNotes(prev => [note, ...prev]);
      setNewNote('');
    }
  };

  const startEdit = (note: Note) => {
    setEditingId(note.id);
    setEditContent(note.content);
  };

  const saveEdit = () => {
    setNotes(prev => prev.map(note => 
      note.id === editingId 
        ? { ...note, content: editContent, timestamp: `${note.timestamp} (edited)` }
        : note
    ));
    setEditingId(null);
    setEditContent('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditContent('');
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'interview':
        return 'bg-blue-100 text-blue-800';
      case 'preparation':
        return 'bg-green-100 text-green-800';
      case 'follow-up':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Add New Note */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center">
            <Plus className="h-5 w-5 mr-2 text-blue-600" />
            Add Note
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Textarea
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Add your interview notes, observations, or follow-up items..."
            rows={3}
            className="resize-none"
          />
          <Button 
            onClick={addNote}
            disabled={!newNote.trim()}
            size="sm"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Note
          </Button>
        </CardContent>
      </Card>

      {/* Notes List */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Interview Notes</h3>
        
        {notes.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-gray-500">No notes yet. Add your first note above.</p>
            </CardContent>
          </Card>
        ) : (
          notes.map((note) => (
            <Card key={note.id} className="border-l-4 border-l-blue-500">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Badge className={getTypeColor(note.type)} variant="secondary">
                      {note.type}
                    </Badge>
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="h-3 w-3 mr-1" />
                      {note.timestamp}
                    </div>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => startEdit(note)}
                    className="h-6 w-6 p-0"
                  >
                    <Edit2 className="h-3 w-3" />
                  </Button>
                </div>
                
                {editingId === note.id ? (
                  <div className="space-y-2">
                    <Textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      rows={3}
                      className="resize-none"
                    />
                    <div className="flex space-x-2">
                      <Button size="sm" onClick={saveEdit}>
                        <Save className="h-3 w-3 mr-1" />
                        Save
                      </Button>
                      <Button size="sm" variant="outline" onClick={cancelEdit}>
                        <X className="h-3 w-3 mr-1" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {note.content}
                  </p>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
