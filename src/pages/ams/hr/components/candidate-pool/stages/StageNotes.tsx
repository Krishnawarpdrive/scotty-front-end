
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, MessageSquare, AlertTriangle, Star, Eye, EyeOff } from 'lucide-react';
import { CandidateStageData, UserRole, CandidateNote } from '../types/CandidateStageTypes';

interface StageNotesProps {
  candidate: any;
  candidateStageData: CandidateStageData;
  userRole: UserRole;
  stageId: string;
  tabId: string;
}

export const StageNotes: React.FC<StageNotesProps> = ({
  candidate,
  candidateStageData,
  userRole,
  stageId
}) => {
  const [newNote, setNewNote] = useState('');
  const [noteType, setNoteType] = useState<'general' | 'feedback' | 'concern' | 'highlight'>('general');
  const [isPrivate, setIsPrivate] = useState(false);

  // Mock notes data
  const [notes, setNotes] = useState<CandidateNote[]>([
    {
      id: '1',
      stageId: 'phone-screening',
      content: 'Candidate showed strong interest in the role and has relevant experience with React and TypeScript.',
      type: 'feedback',
      createdBy: 'Sarah Chen (HR)',
      createdAt: '2024-01-16T10:30:00Z',
      isPrivate: false
    },
    {
      id: '2',
      stageId: 'phone-screening',
      content: 'Salary expectations are slightly above our budget range. May need negotiation.',
      type: 'concern',
      createdBy: 'Mike Rodriguez (TA)',
      createdAt: '2024-01-16T11:15:00Z',
      isPrivate: true
    },
    {
      id: '3',
      content: 'Excellent communication skills and cultural fit. Strong recommendation to proceed.',
      type: 'highlight',
      createdBy: 'Emily Watson (Hiring Manager)',
      createdAt: '2024-01-16T14:20:00Z',
      isPrivate: false
    }
  ]);

  const handleAddNote = () => {
    if (!newNote.trim()) return;

    const note: CandidateNote = {
      id: Date.now().toString(),
      stageId: stageId,
      content: newNote,
      type: noteType,
      createdBy: 'Current User', // Replace with actual user
      createdAt: new Date().toISOString(),
      isPrivate: isPrivate
    };

    setNotes([note, ...notes]);
    setNewNote('');
    setNoteType('general');
    setIsPrivate(false);
  };

  const getNoteIcon = (type: string) => {
    switch (type) {
      case 'feedback': return <MessageSquare className="h-4 w-4" />;
      case 'concern': return <AlertTriangle className="h-4 w-4" />;
      case 'highlight': return <Star className="h-4 w-4" />;
      default: return <MessageSquare className="h-4 w-4" />;
    }
  };

  const getNoteColor = (type: string) => {
    switch (type) {
      case 'feedback': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'concern': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'highlight': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const filteredNotes = notes.filter(note => 
    !note.isPrivate || userRole === 'hr' || userRole === 'admin'
  );

  const stageNotes = filteredNotes.filter(note => note.stageId === stageId);
  const generalNotes = filteredNotes.filter(note => !note.stageId);

  return (
    <div className="space-y-6">
      {/* Add New Note */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Add Note</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Note Type</label>
              <Select value={noteType} onValueChange={(value: any) => setNoteType(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General Note</SelectItem>
                  <SelectItem value="feedback">Feedback</SelectItem>
                  <SelectItem value="concern">Concern</SelectItem>
                  <SelectItem value="highlight">Highlight</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2 pt-6">
              <input
                type="checkbox"
                id="private-note"
                checked={isPrivate}
                onChange={(e) => setIsPrivate(e.target.checked)}
                className="h-4 w-4 text-blue-600 rounded border-gray-300"
              />
              <label htmlFor="private-note" className="text-sm font-medium flex items-center">
                <EyeOff className="h-4 w-4 mr-1" />
                Private Note
              </label>
            </div>
          </div>
          
          <Textarea
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Add your note here..."
            rows={3}
          />
          
          <div className="flex justify-end">
            <Button onClick={handleAddNote} disabled={!newNote.trim()}>
              <Plus className="h-4 w-4 mr-2" />
              Add Note
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stage-Specific Notes */}
      {stageNotes.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Stage Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stageNotes.map((note) => (
                <div key={note.id} className="p-4 border rounded-lg bg-gray-50">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Badge className={getNoteColor(note.type)} variant="outline">
                        {getNoteIcon(note.type)}
                        <span className="ml-1">{note.type.charAt(0).toUpperCase() + note.type.slice(1)}</span>
                      </Badge>
                      {note.isPrivate && (
                        <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                          <EyeOff className="h-3 w-3 mr-1" />
                          Private
                        </Badge>
                      )}
                    </div>
                    <span className="text-xs text-gray-500">
                      {new Date(note.createdAt).toLocaleDateString()} at {new Date(note.createdAt).toLocaleTimeString()}
                    </span>
                  </div>
                  
                  <p className="text-gray-700 mb-3">{note.content}</p>
                  
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="text-xs">
                        {note.createdBy.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-gray-600">{note.createdBy}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* General Notes */}
      {generalNotes.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">General Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {generalNotes.map((note) => (
                <div key={note.id} className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Badge className={getNoteColor(note.type)} variant="outline">
                        {getNoteIcon(note.type)}
                        <span className="ml-1">{note.type.charAt(0).toUpperCase() + note.type.slice(1)}</span>
                      </Badge>
                      {note.isPrivate && (
                        <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                          <EyeOff className="h-3 w-3 mr-1" />
                          Private
                        </Badge>
                      )}
                    </div>
                    <span className="text-xs text-gray-500">
                      {new Date(note.createdAt).toLocaleDateString()} at {new Date(note.createdAt).toLocaleTimeString()}
                    </span>
                  </div>
                  
                  <p className="text-gray-700 mb-3">{note.content}</p>
                  
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="text-xs">
                        {note.createdBy.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-gray-600">{note.createdBy}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {stageNotes.length === 0 && generalNotes.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No notes added yet</p>
            <p className="text-sm text-gray-400">Add notes to track important information about this candidate</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
