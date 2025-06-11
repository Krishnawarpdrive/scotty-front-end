
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Plus,
  Save,
  Edit,
  Trash2,
  Clock
} from 'lucide-react';
import { Interview } from '../../../MyInterviewsPage';

interface Note {
  id: string;
  title: string;
  content: string;
  timestamp: string;
  isPrivate: boolean;
}

interface InterviewerNotesProps {
  interview: Interview;
}

export const InterviewerNotes: React.FC<InterviewerNotesProps> = ({
  interview
}) => {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: '1',
      title: 'Technical Skills Assessment',
      content: 'Strong knowledge in React and TypeScript. Good problem-solving approach.',
      timestamp: '2024-01-15 10:30 AM',
      isPrivate: false
    },
    {
      id: '2',
      title: 'Communication Skills',
      content: 'Excellent communication skills. Explained technical concepts clearly.',
      timestamp: '2024-01-15 10:45 AM',
      isPrivate: true
    }
  ]);

  const [newNote, setNewNote] = useState({ title: '', content: '', isPrivate: false });
  const [isAddingNote, setIsAddingNote] = useState(false);

  const handleAddNote = () => {
    if (newNote.title && newNote.content) {
      const note: Note = {
        id: Date.now().toString(),
        title: newNote.title,
        content: newNote.content,
        timestamp: new Date().toLocaleString(),
        isPrivate: newNote.isPrivate
      };
      setNotes([...notes, note]);
      setNewNote({ title: '', content: '', isPrivate: false });
      setIsAddingNote(false);
    }
  };

  const handleDeleteNote = (noteId: string) => {
    setNotes(notes.filter(note => note.id !== noteId));
  };

  return (
    <div className="space-y-6">
      {/* Add Note Button */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Interview Notes</h3>
        <Button
          onClick={() => setIsAddingNote(true)}
          className="flex items-center space-x-2"
          size="sm"
        >
          <Plus className="h-4 w-4" />
          <span>Add Note</span>
        </Button>
      </div>

      {/* Add Note Form */}
      {isAddingNote && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">New Note</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Note title..."
              value={newNote.title}
              onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
            />
            <Textarea
              placeholder="Write your note here..."
              value={newNote.content}
              onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
              className="min-h-[100px]"
            />
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={newNote.isPrivate}
                  onChange={(e) => setNewNote({ ...newNote, isPrivate: e.target.checked })}
                  className="rounded"
                />
                <span className="text-sm">Private note (only visible to you)</span>
              </label>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setIsAddingNote(false)}
                  size="sm"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAddNote}
                  size="sm"
                  className="flex items-center space-x-2"
                >
                  <Save className="h-4 w-4" />
                  <span>Save</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Notes List */}
      <div className="space-y-4">
        {notes.map((note) => (
          <Card key={note.id}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <CardTitle className="text-base">{note.title}</CardTitle>
                  {note.isPrivate && (
                    <Badge variant="secondary" className="text-xs">
                      Private
                    </Badge>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleDeleteNote(note.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-3">{note.content}</p>
              <div className="flex items-center text-xs text-gray-500">
                <Clock className="h-3 w-3 mr-1" />
                <span>{note.timestamp}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {notes.length === 0 && !isAddingNote && (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-gray-500 mb-4">No notes added yet</p>
            <Button
              onClick={() => setIsAddingNote(true)}
              variant="outline"
              className="flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Add Your First Note</span>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
