import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Plus, 
  Save, 
  Clock, 
  User,
  MessageSquare,
  Edit,
  Trash2
} from 'lucide-react';
import { Interview } from '../../MyInterviewsPage';

interface InterviewerNotesProps {
  interview: Interview;
}

interface Note {
  id: string;
  content: string;
  timestamp: string;
  author: string;
  type: 'interview' | 'general' | 'follow-up';
}

export const InterviewerNotes: React.FC<InterviewerNotesProps> = ({
  interview
}) => {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: '1',
      content: 'Candidate showed strong technical knowledge in React and Node.js. Provided clear explanations for complex problems.',
      timestamp: '2024-01-15 10:30 AM',
      author: 'John Smith',
      type: 'interview'
    },
    {
      id: '2',
      content: 'Need to follow up on availability for start date - candidate mentioned potential notice period.',
      timestamp: '2024-01-15 10:45 AM',
      author: 'John Smith',
      type: 'follow-up'
    }
  ]);

  const [newNote, setNewNote] = useState('');
  const [noteType, setNoteType] = useState<'interview' | 'general' | 'follow-up'>('interview');
  const [isEditing, setIsEditing] = useState<string | null>(null);

  const addNote = () => {
    if (!newNote.trim()) return;

    const note: Note = {
      id: Date.now().toString(),
      content: newNote,
      timestamp: new Date().toLocaleString(),
      author: 'Current User', // In real app, get from auth context
      type: noteType
    };

    setNotes(prev => [note, ...prev]);
    setNewNote('');
  };

  const deleteNote = (id: string) => {
    setNotes(prev => prev.filter(note => note.id !== id));
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'interview':
        return 'bg-blue-100 text-blue-800';
      case 'follow-up':
        return 'bg-yellow-100 text-yellow-800';
      case 'general':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'interview':
        return <MessageSquare className="h-3 w-3" />;
      case 'follow-up':
        return <Clock className="h-3 w-3" />;
      case 'general':
        return <User className="h-3 w-3" />;
      default:
        return <MessageSquare className="h-3 w-3" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Add New Note */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Add Note</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="note-type">Note Type</Label>
            <div className="flex space-x-2">
              {(['interview', 'general', 'follow-up'] as const).map((type) => (
                <Button
                  key={type}
                  variant={noteType === type ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setNoteType(type)}
                  className="capitalize"
                >
                  {getTypeIcon(type)}
                  <span className="ml-1">{type.replace('-', ' ')}</span>
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="new-note">Note Content</Label>
            <Textarea
              id="new-note"
              placeholder="Enter your note here..."
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              rows={3}
            />
          </div>

          <Button onClick={addNote} disabled={!newNote.trim()}>
            <Plus className="h-4 w-4 mr-2" />
            Add Note
          </Button>
        </CardContent>
      </Card>

      {/* Notes List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Interview Notes</CardTitle>
        </CardHeader>
        <CardContent>
          {notes.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No notes yet. Add your first note above.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {notes.map((note, index) => (
                <div key={note.id}>
                  <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-2">
                        <Badge className={getTypeColor(note.type)} variant="secondary">
                          {getTypeIcon(note.type)}
                          <span className="ml-1 capitalize">{note.type.replace('-', ' ')}</span>
                        </Badge>
                        <span className="text-xs text-gray-500">{note.timestamp}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Button variant="ghost" size="sm" onClick={() => setIsEditing(note.id)}>
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => deleteNote(note.id)}>
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    {isEditing === note.id ? (
                      <div className="space-y-2">
                        <Textarea
                          value={note.content}
                          onChange={(e) => {
                            setNotes(prev => prev.map(n => 
                              n.id === note.id ? { ...n, content: e.target.value } : n
                            ));
                          }}
                          rows={3}
                        />
                        <div className="flex space-x-2">
                          <Button size="sm" onClick={() => setIsEditing(null)}>
                            <Save className="h-3 w-3 mr-1" />
                            Save
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => setIsEditing(null)}>
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-gray-700 leading-relaxed">{note.content}</p>
                    )}

                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <User className="h-3 w-3" />
                      <span>{note.author}</span>
                    </div>
                  </div>
                  {index < notes.length - 1 && <Separator className="my-4" />}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
